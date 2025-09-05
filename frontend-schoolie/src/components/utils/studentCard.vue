<template>
	<div
		class="card p-2"
		:style="{ width: cardWidth, minHeight }">
		<img
			:src="image"
			class="card-img-top w-100"
			alt="student info" />
		<div class="card-body p-2">
			<h6 class="card-title text-primary mb-1">{{ name }}</h6>
			<p class="card-text mb-1">Age: {{ age }}</p>
			<p class="card-text mb-1">Mother: {{ mother }}</p>
			<p class="card-text mb-1">Father: {{ father }}</p>
			<p class="card-text mb-2">Contact: {{ contact }}</p>
			<button
				class="btn btn-outline-secondary w-100 btn-sm"
				@click="emit('update')">
				{{ updateText }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from "vue";

	interface StudentCardInterface {
		image?: string;
		name?: string;
		age?: number | string;
		mother?: string;
		father?: string;
		contact?: string;
		cardWidth?: string;
		minHeight?: string;
		updateText?: string;
	}

	withDefaults(defineProps<StudentCardInterface>(), {
		image: "https://via.placeholder.com/150",
		name: "Unknown Student",
		age: "N/A",
		mother: "N/A",
		father: "N/A",
		contact: "N/A",
		cardWidth: "12rem",
		minHeight: "300px",
		updateText: "Update",
	});

	const emit = defineEmits<{ (e: "update"): void }>();
</script>
