<template>
	<div class="row">
		<!-- Left Aside -->
		<aside class="col-md-2 d-none d-md-block py-4">
			<ul class="nav flex-column">
				<AnchorLink
					v-for="item in asideLinks"
					:key="item.name"
					:linkName="item.name"
					:isActive="activeTab === item.name"
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
						:key="activeTab" />
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

	const asideLinks: { name: string }[] = [
		{ name: "overview" },
		{ name: "add_classes" },
		{ name: "add_pupil" },
		{ name: "more" },
	];

	const activeTab = ref<string>("overview");

	const currentTabComponent = computed(function () {
		switch (activeTab.value) {
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
		activeTab.value = tab;
	}

	/**
	 * the major problem is the overview aside will trigger db fetches
	 * but
	 * it must have an overview which is hardcoded and gets everything from the db
	 * the classes must be db fetched
	 * clicking on the overview gets everything gotten from the db
	 * tabs gets everything based on that specified sessionyear
	 * ++++++++++++++++++++++++++++++TASK++++++++++++++++++++++++++++++
	 * CREATE AND ADD CLASSES TO THE DB
	 * -->LOAD A SESSION-YEAR
	 * -->CREATE A METHOD TO ADD CLASSES FROM THE UI
	 * -->CREATE A METHOD IN THE BACKEND TO RETURN ALL THE CLASS NAMES (to be used as tab-headers) TO THE UI
	 * -->simulate fetching based on the grade
	 * +++++PROBLEM+++++++
	 * HOW TO STRUC THE CLASSES
	 * +++SOLUTION++++
	 * -->OVERVIEW CARD foor all overview
	 * -->CLASSDETAIL CARD FOR ALL CLASS ISSUES
	 *
	 *
	 */
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
