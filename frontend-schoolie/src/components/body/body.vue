<template>
	<div class="row">
		<!-- Left Aside -->
		<aside class="col-md-2 d-none d-md-block py-4">
			<ul class="nav flex-column">
				<AnchorLink
					v-for="item in asideLinks"
					:key="item.name"
					:linkName="item.name"
					:id="item.id || ''"
					:isActive="tabStore.activeTab === item.name"
					customClass="text-uppercase fw-bold"
					@click="setTab(item.name)" />
			</ul>
		</aside>

		<!-- Right Content -->
		<div class="col-md-10 ms-sm-auto px-md-4 py-4">
			<transition
				name="fade-slide"
				mode="out-in">
				<KeepAlive>
					<component
						:is="currentTabComponent"
						:key="tabStore.activeTab" />
				</KeepAlive>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import AnchorLink from "@utils/anchorLink.vue";
	import BrokenLink from "@utils/brokenLink.vue";
	import Overview from "./overview/overview.vue";
	import Form from "@components/form/form.vue";
	import AddClass from "./addClasses.vue";
	import { useTabStore } from "../../store/tabStore";

	const asideLinks: { name: string; id?: string }[] = [
		{ name: "overview", id: "#overview" },
		{ name: "add_classes", id: "#addClasses" },
		{ name: "add_pupil", id: "#addPupil" },
		{ name: "more" },
	];

	const activeTab = ref<string>("overview");
	const tabStore = useTabStore();

	tabStore.setActiveTab(activeTab.value);
	tabStore.setAllTabs(
		asideLinks.map(function (tab: any) {
			return tab.name;
		})
	);

	const currentTabComponent = computed(function () {
		switch (tabStore.activeTab) {
			case "overview":
				return Overview;
			case "add_pupil":
				return Form;
			case "add_classes":
				return AddClass;
			default:
				return BrokenLink;
		}
	});

	function setTab(tab: string): void {
		tabStore.setActiveTab(tab);
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
