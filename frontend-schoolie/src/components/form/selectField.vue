<template>
	<div class="mb-3">
		<label
			:for="id"
			class="form-label"
			>{{ label }}</label
		>
		<select
			:id="id"
			class="form-select"
			@change="onChange">
			<option
				disabled
				selected
				value=""
				>{{ placeholder ?? `Choose ${label}` }}</option
			>
			<option
				v-for="(option, idx) in options"
				:key="idx"
				:value="option"
				>{{ option }}</option
			>
		</select>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";

	interface Props {
		id: string;
		label: string;
		options: string[];
		placeholder?: string;
	}

	const props = defineProps<Props>();

	function onChange(e: Event) {
		const val = (e.target as HTMLSelectElement).value;
		console.log(`Select ${props.id}:`, val); // placeholder
	}
</script>
