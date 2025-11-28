<template>
	<div class="d-flex align-items-center position-relative">
		<!-- Desktop logo -->
		<span class="nav-link white-text fw-bold fs-5 d-none d-md-inline">
			SCHOoLLie
		</span>

		<!-- Mobile logo + caret -->
		<div class="d-flex d-md-none align-items-center gap-1">
			<span class="fw-medium fs-5 white-text">SCHOoLLie </span>
			<button
				class="btn p-0"
				type="button"
				@click="isVisible = !isVisible">
				<i
					class="fa fa-caret-down white-text fs-2"
					id="dropdown"></i>
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
					:is-active="activeLink === tabName"
					@click.prevent="selectTab(tabName)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount, onMounted, ref } from "vue";
	import AnchorLink from "../utils/anchorLink.vue";
	import { useTabStore } from "../../store/tabStore";

	const isVisible = ref(false);
	const activeLink = ref("overview");
	const tabStore = useTabStore();

	onMounted(function () {
		document.addEventListener("click", toggleCaret);
	});
	onBeforeUnmount(function () {
		document.removeEventListener("click", toggleCaret);
	});
	const toggleCaret = function (e: Event) {
		const caret = document.getElementById("dropdown");
		if (!caret) return;
		//if the caret is open i clicked somewhere else
		if (e.target !== caret && isVisible.value === true) {
			isVisible.value = false;
			return;
		}
		//if the caret is not open n i clicked somewhere else still
		if (e.target !== caret && isVisible.value === false) {
			return;
		}
		//if i clicked the caret change the va
		if (e.target === caret) {
			isVisible.value = !!isVisible.value;

			return;
		}

		isVisible.value = true;
	};

	function selectTab(tabName: string) {
		activeLink.value = tabName;
		tabStore.goto(tabName);
		isVisible.value = false;
	}
</script>

<style scoped>
	/* Optional: make caret and dropdown look nicer */
</style>
