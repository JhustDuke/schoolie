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
	interface Props {
		id: string;
		label: string;

		options?: string[];
		placeholder?: string;
	}
	defineProps<Props>();

	const emit = defineEmits<{
		(event: "update:modelValue", value: string): void;
	}>();

	function onChange(e: Event) {
		const elem = <HTMLSelectElement>e.target;

		emit("update:modelValue", elem.value);
	}
</script>
