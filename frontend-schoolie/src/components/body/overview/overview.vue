<template>
	<div class="p-3 rounded shadow">
		<!-- Horizontal Tab Headers -->
		<nav class="d-flex gap-3 mb-4 border-bottom pb-2">
			<AnchorLink
				v-for="(tab, index) in tabsHeaders"
				:key="index"
				:linkName="tab"
				:isActive="activeHeader === tab"
				customClass="text-uppercase fw-bold"
				@click="setHeader(tab)" />
		</nav>

		<!-- Content -->
		<main>
			<center v-if="!isLoaded">
				please wait
				<div v-html="useSpinner"></div>
			</center>

			<center v-else-if="hasError">
				<BrokenLink
					title="page not found"
					errorMessage="the page you're looking for is not found" />
			</center>

			<transition
				v-else
				name="fade-slide"
				mode="out-in">
				<component
					:is="currentTab"
					v-bind="classDetailsProps"></component>
			</transition>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from "vue";
	import AllSummary from "./summary/allSummary.vue";
	import ClassDetails from "./classDetails.vue";
	import AnchorLink from "@utils/anchorLink.vue";
	import BrokenLink from "@utils/brokenLink.vue";
	import { spinner } from "@utils/spinner";
	import { classModel } from "@models/classModel";
	import { useCache } from "@utils/cacheHelper";

	const useSpinner = spinner();

	const isLoaded = ref(false);
	const hasError = ref(false);

	const classDetailsData = ref<any>(null);
	const classDetailsProps = computed(function () {
		return classDetailsData.value || {};
	});

	const activeHeader = ref("overview");
	const currentTab = computed(() =>
		activeHeader.value === "overview" ? AllSummary : ClassDetails
	);

	const tabsHeaders = ref<string[]>([]);
	onMounted(async function () {
		try {
			tabsHeaders.value = await classModel.loadClasses("3000/3333");
			await fetchData("overview");
		} catch {
			hasError.value = true;
		}
	});

	watch(activeHeader, async function (newTab) {
		await fetchData(newTab);
	});

	async function fetchData(tab: string): Promise<void> {
		isLoaded.value = false;
		hasError.value = false;

		try {
			const cacheKey = "classData_" + tab;

			const data = await useCache(cacheKey, async function () {
				if (tab === "overview") {
					// Fetch overview (school-wide stats)
					const overviewData = await classModel.getSchoolStatsMock();

					// Add mock presents to make UI feel richer
					const presets = [
						{ name: "Aisha Bello", present: true },
						{ name: "John Doe", present: false },
						{ name: "Mary Johnson", present: true },
						{ name: "Ibrahim Yusuf", present: true },
					];

					return {
						label: "overview",
						totalBoys: overviewData.total_boys.toString(),
						totalGirls: overviewData.total_girls.toString(),
						totalClasses: overviewData.total_classes.toString(),
						presets,
					};
				}

				// Simulate class-level data
				const pupils = await classModel.getClassDataMock(tab);

				return {
					label: tab,
					totalBoys: "10",
					totalGirls: "12",
					pupils,
				};
			});

			// if “graded” throws or fails, display error component
			if (tab === "graded") throw new Error("Intentional mock error");

			classDetailsData.value = data;
		} catch {
			hasError.value = true;
		} finally {
			isLoaded.value = true;
		}
	}

	function setHeader(tab: string): void {
		activeHeader.value = tab;
	}
</script>

<style scoped>
	.nav-link.active,
	.active {
		background-color: #ccc !important;
		color: black !important;
	}
	.fade-slide-enter-active,
	.fade-slide-leave-active {
		transition: all 0.3s ease;
	}
	.fade-slide-enter-from,
	.fade-slide-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
	.fade-slide-enter-to,
	.fade-slide-leave-from {
		opacity: 1;
		transform: translateY(0);
	}
</style>
