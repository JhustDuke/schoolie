<template>
	<div
		class="mx-auto grey lighten-3 isRelative black d-flex flex-column min-vh-100">
		<header><NavBar /></header>

		<main class="flex-grow-1">
			<Body />
		</main>

		<!-- Modal Backdrop -->
		<div
			v-if="mockVisible"
			class="isAbsolute w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-start"
			style="
				background: rgba(0, 0, 0, 0.5);
				pointer-events: auto;
				z-index: 1000;
				padding-top: 5vh;
			">
			<AddClassModal
				:isVisible="mockVisible"
				:loadedSessions="[...allSessions]"
				@close="mockVisible = !mockVisible" />
		</div>

		<footer class="yellow p-4">footer content goes here</footer>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, provide, readonly } from "vue";
	import Body from "@components/body/body.vue";
	import NavBar from "@components/navbar/navBar.vue";
	import AddClassModal from "@components/body/addClasses.vue";

	const allSessions = ref<Set<string>>(new Set());
	const updateSessions = function (sessionEntries: string[]) {
		const val = [...sessionEntries];
		val.forEach(function (entry: string) {
			if (!allSessions.value.has(entry)) {
				allSessions.value.add(entry);
			}
		});
	};

	const mockVisible = ref(true);
	const modalVisible = computed(function () {
		return allSessions.value.size === 0;
	});

	provide("sessions", { allSessions: readonly(allSessions), updateSessions });
</script>
