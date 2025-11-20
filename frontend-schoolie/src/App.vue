<template>
	<div
		class="mx-auto grey lighten-3 isRelative black d-flex flex-column min-vh-100">
		<header><NavBar /></header>

		<main class="flex-grow-1">
			<Body />
		</main>

		<!-- Modal Backdrop -->
		<div
			v-if="0"
			class="isAbsolute w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-start"
			style="
				background: rgba(0, 0, 0, 0.5);
				pointer-events: auto;
				z-index: 1000;
				padding-top: 5vh;
			">
			<AddClassModal
				:isVisible="store.showModal"
				:loadedSessions="[...store.allSessions]"
				@close="store.toggleModal" />
		</div>

		<footer class="yellow p-4">footer content goes here</footer>
	</div>
</template>

<script setup lang="ts">
	import Body from "@components/body/body.vue";
	import NavBar from "@components/navbar/navBar.vue";
	import AddClassModal from "@components/body/addClasses.vue";
	import { useSessionStore } from "./store/sessionStore";

	const store = useSessionStore();
</script>
