<template>
	<nav class="navbar px-2 py-3 blue darken-3">
		<div
			class="container-fluid justify-content-between align-items-center isRelative">
			<Logo />
			<SearchAndTooltip />
			<SessionAndCog />
		</div>
	</nav>
</template>
<script setup lang="ts">
	import { sessionModel } from "../../model";
	import Logo from "./logo.vue";
	import SearchAndTooltip from "./searchAndTooltip.vue";
	import SessionAndCog from "./sessionSelectAndCog.vue";
</script>
