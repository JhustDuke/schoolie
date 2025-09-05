<template>
	<div class="mb-3">
		<label
			:for="id"
			class="form-label"
			>{{ label }}</label
		>
		<input
			type="text"
			class="form-control"
			:id="id"
			:placeholder="placeholder"
			@input="onInput" />
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";

	interface Props {
		id: string;
		label: string;
		placeholder?: string;
	}

	const props = defineProps<Props>();

	function onInput(e: Event) {
		const val = (e.target as HTMLInputElement).value;
		console.log(`Input for ${props.id}:`, val); // placeholder for later logic
	}
</script>
