<template>
	<div class="layout mx-auto grey lighten-3">
		<section>
			<NavBar />
		</section>

		<main class="main-body">
			<Body />
		</main>

		<div>
			<AddClassModal />
		</div>
		<footer class="yellow p-4"> footer content goes here </footer>
	</div>
</template>

<script setup lang="ts">
	import Body from "./components/body/body.vue";
	//import Form from "./components/form/form.vue";
	import NavBar from "./components/header/navBar.vue";
	import AddClassModal from "./components/utils/addClassModal.vue";
</script>

<style scoped>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Body grows to take remaining space */
	.main-body {
		flex: 1;
	}
</style>
