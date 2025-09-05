<template>
	<div class="row">
		<!-- Left Aside -->
		<aside class="col-md-2 d-none d-md-block py-4">
			<ul class="nav flex-column">
				<AnchorLink
					linkName="overview"
					customClass="text-uppercase fw-bold"
					@click="setTab('overview')" />
				<AnchorLink
					linkName="timetable"
					customClass="text-uppercase fw-bold"
					@click="setTab('timetable')" />
				<AnchorLink
					linkName="about"
					customClass="text-uppercase fw-bold"
					@click="setTab('about')" />
			</ul>
		</aside>

		<!-- Right Content -->
		<div class="col-md-10 ms-sm-auto px-md-4 py-4">
			<transition
				name="fade-slide"
				mode="out-in">
				<section v-if="activeTab === 'overview'">
					<!-- Correctly pass arrays, not strings -->
					<div
						class="d-md-flex justify-content-md-start d-sm-flex justify-content-sm-center mb-3">
						<TabTitle
							bsToggle="tab"
							:tabTitles="['Grade-1', 'Grade-2']"
							:targetElemIds="['#grade1', '#grade2']" />
					</div>

					<!-- class 'tab-content' is REQUIRED BY BOOTSTRAP-JS -->
					<div class="tab-content">
						<TabContent
							id="grade1"
							isActive
							show>
							grade 1 tabContent
						</TabContent>
						<TabContent id="grade2"> grade 2 tabContent </TabContent>
					</div>
				</section>

				<section v-else-if="activeTab === 'timetable'">
					<BrokenLink
						title="timeTable"
						errorMessage="this page seems to be unavailable at the moment" />
				</section>

				<section
					v-else-if="activeTab === 'about'"
					class="">
					<div>
						<BrokenLink
							title="About"
							errorMessage="this page seems to be unavailable at the moment" />
					</div>
				</section>

				<section v-else-if="activeTab === 'more'">
					<BrokenLink
						title="more"
						errorMessage="this page seems to be unavailable at the moment" />
				</section>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import AnchorLink from "../utils/anchorLink.vue";
	import TabTitle from "./tabTitle.vue";
	import TabContent from "./tabContent.vue";
	import BrokenLink from "../utils/brokenLink.vue";

	const activeTab = ref<string>("overview");

	function setTab(tab: string): void {
		activeTab.value = tab;
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
	.fade-slide-enter-to,
	.fade-slide-leave-from {
		opacity: 1;
		transform: translateY(0);
	}
</style>
