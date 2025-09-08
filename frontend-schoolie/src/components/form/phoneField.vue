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
	interface Props {
		id: string;
		label: string;
		placeholder?: string;
	}

	defineProps<Props>();
	const emit = defineEmits<{
		(event: "update:modelValue", data: string): void;
	}>();

	function onInput(e: Event) {
		const elem = e.target as HTMLInputElement;

		emit("update:modelValue", elem.value);
	}
</script>
