<template>
	<div class="p-2 border rounded text-md-start">
		<h5 class="fw-bolder text-uppercase">{{ grade }}</h5>
		<p class="text-capitalize fw-bold"
			>Total: <span class="red-text text-capitalize">{{ total }}</span>
		</p>
		<p class="text-capitalize fw-bold"
			>Boys: <span class="red-text text-capitalize">{{ boys }}</span></p
		>
		<p class="text-capitalize fw-bold"
			>Girls: <span class="red-text text-capitalize">{{ girls }}</span>
		</p>
	</div>
</template>

<script setup lang="ts">
	interface ClassSummaryPropsInterface {
		grade?: string;
		total?: string;
		boys?: string;
		girls?: string;
	}

	withDefaults(defineProps<ClassSummaryPropsInterface>(), {
		grade: "grade-x",
		total: "n/a",
		boys: "n/a",
		girls: "n/a",
	});
</script>
