<template>
	<div class="mb-3">
		<label
			:for="id"
			class="form-label"
			>{{ label }}</label
		>
		<input
			type="tel"
			class="form-control"
			:id="id"
			:placeholder="placeholder"
			maxlength="11"
			pattern="\d{11}"
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
		console.log(`Phone input ${props.id}:`, val); // placeholder
	}
</script>
