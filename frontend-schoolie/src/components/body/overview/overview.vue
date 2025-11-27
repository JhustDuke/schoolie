<template>
	<div class="p-3 rounded shadow">
		<nav class="d-flex gap-3 mb-4 border-bottom pb-2">
			<AnchorLink
				v-for="(tab, index) in tabsHeaders"
				:key="index"
				:linkName="tab"
				:isActive="activeHeader === tab"
				customClass="text-uppercase fw-bold"
				@click="setHeader(tab)" />
		</nav>

		<main>
			<center v-if="!isLoaded">
				please wait
				<div v-html="useSpinner"></div>
			</center>

			<center v-else-if="hasError">
				<BrokenLink
					title="oops! something went wrong"
					:errorMessage="customErrorMsg" />
			</center>

			<transition
				v-else
				name="fade-slide"
				mode="out-in">
				<component
					:is="currentTab"
					v-bind="classDetailsProps" />
			</transition>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from "vue";
	import AllSummary from "./summary/allSummary.vue";
	import ClassDetails from "./classDetails.vue";
	import AnchorLink from "@utils/anchorLink.vue";
	import BrokenLink from "@utils/brokenLink.vue";
	import { spinner } from "@utils/spinner";
	import { useCache } from "@utils/cacheHelper";
	import { useSessionStore } from "../../../store/sessionStore";
	import { useClassesStore } from "../../../store/classesStore";
	import { useTabStore } from "../../../store/tabStore";
	import { classModel } from "../../../model";

	const useSpinner = spinner();
	const isLoaded = ref(false);
	const hasError = ref(false);
	const customErrorMsg = ref("can't find the requested resource");

	type classDetailsPropStructure = {
		totalBoys: string;
		totalGirls: string;
		pupils: {
			firstAndLastName: string;
			fatherPhone: string;
			passport: string | null;
		}[];
	};

	const classDetailsData = ref<classDetailsPropStructure>({
		totalBoys: "0",
		totalGirls: "0",
		pupils: [],
	});
	const classDetailsProps = computed(function () {
		return classDetailsData.value as classDetailsPropStructure;
	});

	const activeHeader = ref<string>("");
	const currentTab = computed(function () {
		return activeHeader.value === "overview" ? AllSummary : ClassDetails;
	});

	const tabsHeaders = ref<string[]>([]);
	const store = useSessionStore();
	const classesStore = useClassesStore();

	watch(
		function () {
			return store.selectedSession;
		},
		async function (newSession) {
			if (!newSession) return;

			try {
				isLoaded.value = false;
				hasError.value = false;

				tabsHeaders.value = await classModel.loadClasses(newSession);
				classesStore.setClasses(tabsHeaders.value);

				activeHeader.value = tabsHeaders.value[0] || "overview";
				await fetchData(activeHeader.value);
			} catch (err: any) {
				hasError.value = true;
				console.error(err.message);
			} finally {
				isLoaded.value = true;
			}
		},
		{ immediate: true }
	);

	watch(activeHeader, async function (newTab) {
		await fetchData(newTab);
	});

	const fetchData = async function (tab: string): Promise<void> {
		isLoaded.value = false;
		hasError.value = false;

		try {
			const sessionYear = store.selectedSession;
			if (!sessionYear) throw new Error("Session not selected");

			const cacheKey = "classData_" + tab;

			const data = await useCache(cacheKey, async function () {
				if (tab === "overview") return fetchOverview(sessionYear);
				return fetchClass(tab, sessionYear);
			});

			if (data) classDetailsData.value = data;
		} catch (err: any) {
			customErrorMsg.value = err.message;
			useTabStore().goto("add_classes");
			hasError.value = true;
		} finally {
			isLoaded.value = true;
		}
	};

	const fetchClass = async function (
		tab: string,
		sessionYear: string
	): Promise<classDetailsPropStructure> {
		try {
			const data = (await classModel.getClassData(sessionYear, tab)) || [];

			let totalBoys = "";
			let totalGirls = "";
			const pupilInfo = data.map(function (entry: any) {
				totalBoys = entry.totalBoys;
				totalGirls = entry.totalGirls;
				return {
					firstAndLastName: entry.firstname + " " + entry.surname,
					fatherPhone: entry.fatherContact,
					passport: entry.passport,
				};
			});

			return { pupils: pupilInfo, totalBoys, totalGirls };
		} catch (err: any) {
			customErrorMsg.value = err.message;
			hasError.value = true;
			return { pupils: [], totalBoys: "n/a", totalGirls: "n/a" };
		} finally {
			isLoaded.value = true;
		}
	};

	const fetchOverview = async function (
		sessionYear: string
	): Promise<classDetailsPropStructure> {
		const overviewData = await classModel.getSchoolStats(sessionYear);

		return {
			totalBoys: overviewData?.total_boys.toString() || "0",
			totalGirls: overviewData?.total_girls.toString() || "0",
			pupils: [],
		};
	};

	function setHeader(tab: string): void {
		activeHeader.value = tab;
	}
</script>

<style scoped>
	.fade-slide-enter-active,
	.fade-slide-leave-active {
		transition: all 0.3s ease;
	}
	.fade-slide-enter-from,
	.fade-slide-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
