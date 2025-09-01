<script setup lang="ts">
	import Logo from "./logo.vue";
	import SearchAndTooltip from "./searchAndTooltip.vue";
	import SessionAndCog from "./sessionCog.vue";
</script>

<template>
	<nav class="navbar px-2 py-3 blue darken-3">
		<div class="container-fluid justify-content-between align-items-center">
			<Logo />
			<SearchAndTooltip />
			<SessionAndCog />
		</div>
	</nav>
</template>
