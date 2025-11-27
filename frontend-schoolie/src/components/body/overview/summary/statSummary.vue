<template>
	<div class="p-3 rounded white text-center text-md-start">
		<h5 color="blue-text ">{{ title }}</h5>
		<p class="fs-4 fw-bold red-text">{{ totalBoys }}</p>
	</div>
</template>

<script setup lang="ts">
	interface StatCardPropsInterface {
		title: string | null;
		[key: string]: string | null;
	}

	withDefaults(defineProps<StatCardPropsInterface>(), {
		title: "N/A",
		value: "N/A",
	});
</script>
