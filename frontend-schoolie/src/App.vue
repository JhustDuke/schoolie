<template>
	<div class="mx-auto grey lighten-3">
		<header>
			<NavBar />
		</header>

		<main class="">
			<Body />
		</main>

		<!-- Backdrop wrapper for modal -->
		<!-- <div
			v-if="modalVisible"
			class="modal-overlay">
			<AddClassModal
				:isVisible="modalVisible"
				:loadedSessions="[...allSessions]"
				@close="modalVisible = false" />
		</div> -->

		<footer class="yellow p-4"> footer content goes here </footer>
	</div>
</template>

<script setup lang="ts">
	import { provide, ref, readonly /* computed */ } from "vue";
	import Body from "./components/body/body.vue";
	import NavBar from "./components/header/navBar.vue";
	//import AddClassModal from "./components/body/addClassModal.vue";

	const allSessions = ref<Set<string>>(new Set());
	// const modalVisible = computed(function () {
	// 	if (allSessions.value.size === 0) {
	// 		return true;
	// 	}

	// 	return false;
	// });
	const updateSessions = function (sessionEntries: string[]) {
		const val = [...sessionEntries];
		val.forEach(function (entry: string) {
			if (!allSessions.value.has(entry)) {
				allSessions.value.add(entry);
			}
		});
	};

	provide("sessions", { allSessions: readonly(allSessions), updateSessions });
</script>

<style scoped>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-body {
		flex: 1;
	}

	/* Backdrop overlay to block interaction */
	.modal-overlay {
		position: fixed;
		inset: 0; /* top:0; right:0; bottom:0; left:0 */
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>
