<template>
	<div class="d-flex align-items-center position-relative">
		<!-- Desktop logo -->
		<span class="nav-link white-text fw-bold fs-5 d-none d-md-inline">
			SCHOoLLie
		</span>

		<!-- Mobile logo + caret -->
		<div class="d-flex d-md-none align-items-center gap-1">
			<span class="fw-medium fs-5 white-text">SCHOoLLie</span>
			<button
				class="btn p-0"
				type="button"
				@click="isVisible = !isVisible">
				<i class="fa fa-caret-down white-text fs-2"></i>
			</button>
		</div>

		<!-- Mobile dropdown -->
		<div
			v-if="isVisible"
			class="position-absolute bg-dark text-white rounded mt-2 p-2"
			style="z-index: 100; top: 20px; min-width: 150px">
			<div
				v-for="tabName in tabStore.allTabs"
				:key="tabName"
				class="py-1">
				<AnchorLink
					:linkName="tabName"
					href="#"
					@click.prevent="selectTab(tabName)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import AnchorLink from "../utils/anchorLink.vue";
	import { useTabStore } from "../../store/tabStore";

	const isVisible = ref(false);
	const tabStore = useTabStore();

	function selectTab(tabName: string) {
		tabStore.goto(tabName);
		isVisible.value = false; // close dropdown after selection
	}
</script>

<style scoped>
	/* Optional: make caret and dropdown look nicer */
</style>
