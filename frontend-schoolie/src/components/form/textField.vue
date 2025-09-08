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
	interface Props {
		id: string;
		label: string;
		type?: string;
		placeholder?: string;
	}

	defineProps<Props>();
	const emit = defineEmits<{
		(event: "update:modelValue", value: string): void;
	}>();

	function onInput(e: Event) {
		const elem = e.target as HTMLInputElement;
		// placeholder for later logic
		emit("update:modelValue", elem.value);
	}
</script>
