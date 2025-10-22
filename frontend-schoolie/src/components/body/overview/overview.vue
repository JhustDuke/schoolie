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
			<!-- Spinner -->
			<center v-if="!isLoaded">
				please wait
				<div v-html="useSpinner"></div>
			</center>

			<!-- Error -->
			<center v-else-if="hasError">
				<BrokenLink
					title="page not found"
					errorMessage="the page you're looking for is not found" />
			</center>

			<!-- Dynamic Component -->
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
	import { ref, computed, watch, onMounted } from "vue";
	import AllSummary from "./summary/allSummary.vue";
	import ClassDetails from "./classDetails.vue";
	import AnchorLink from "@utils/anchorLink.vue";
	import BrokenLink from "@utils/brokenLink.vue";
	import { spinner } from "@utils/spinner";
	import { useCache } from "@utils/cacheHelper";

	const useSpinner = spinner();

	// states
	const isLoaded = ref<boolean>(false);
	const hasError = ref<boolean>(false);
	const activeHeader = ref<string>("overview");
	const classDetailsData = ref<any>(null);

	// mock tabs
	const tabsHeaders: string[] = ["overview", "grade1", "grade2", "graded"];

	const classDetailsProps = computed(function () {
		return classDetailsData.value || {};
	});

	const currentTab = computed(function () {
		return activeHeader.value === "overview" ? AllSummary : ClassDetails;
	});

	onMounted(function () {
		fetchData("overview");
	});

	watch(activeHeader, async function (newTab) {
		await fetchData(newTab);
	});

	function simulateFetch(tab: string): Promise<void> {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				tab === "graded" ? reject() : resolve();
			}, 1500);
		});
	}

	async function fetchData(tab: string): Promise<void> {
		isLoaded.value = false;
		hasError.value = false;

		try {
			//check is this data had been prefetched and cache b4 now
			const data = await useCache(tab, async function () {
				await simulateFetch(tab);
				return {
					totalBoys: Math.floor(Math.random() * 20).toString(),
					totalGirls: Math.floor(Math.random() * 20).toString(),
					pupils: [
						{ name: "Aisha Bello", className: tab, parentPhone: "08012345678" },
						{ name: "John Doe", className: tab, parentPhone: "08087654321" },
					],
				};
			});

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
