<template>
	<div class="row">
		<!-- Left Aside -->
		<aside class="col-md-2 d-none d-md-block py-4">
			<ul class="nav flex-column">
				<AnchorLink
					v-for="item in asideLinks"
					:key="item.name"
					:linkName="item.name"
					customClass="text-uppercase fw-bold"
					@click="setTab(item.name)" />
			</ul>
		</aside>

		<!-- Right Content -->
		<div class="col-md-10 ms-sm-auto px-md-4 py-4">
			<transition
				name="fade-slide"
				mode="out-in">
				<div :key="activeTab">
					<!-- Overview -->
					<section v-if="activeTab === 'overview'">
						<TabTitle
							:tabTitles="['Overview', 'Grade-2']"
							:targetElemIds="['#overview', '#grade2']" />

						<div class="tab-content">
							<TabContent
								id="overview"
								isActive
								show>
								<Overview />
							</TabContent>
							<TabContent id="grade2"> grade 2 tabContent </TabContent>
						</div>
					</section>

					<!-- Form -->
					<section v-else-if="activeTab === 'form'">
						<Form />
					</section>

					<!-- Fallback -->
					<section v-else>
						<BrokenLink
							:title="activeTab"
							errorMessage="this page seems to be unavailable at the moment" />
					</section>
				</div>
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
	import Overview from "./overview/overview.vue";
	import Form from "../form/form.vue";

	const activeTab = ref<string>("overview");

	const asideLinks: { name: string }[] = [
		{ name: "overview" },
		{ name: "timetable" },
		{ name: "about" },
		{ name: "more" },
		{ name: "form" },
	];

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
