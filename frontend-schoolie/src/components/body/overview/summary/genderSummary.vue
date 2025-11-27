<template>
	<div class="p-3 rounded white">
		<h5>Gender summary</h5>
		<div class="d-flex justify-content-center gap-4 mt-2">
			<div>
				<i class="fa fa-male blue-text fa-2x"></i>
				<div
					class="fw-bold"
					id="maleTotal"
					>{{ totalBoys }}</div
				>
			</div>
			<div>
				<i class="fa fa-female pink-text fa-2x"></i>
				<div
					class="fw-bold"
					id="femaleTotal"
					>{{ totalGirls }}</div
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// props could be added later if values become dynamic

	interface genderSummary {
		totalBoys?: string;
		totalGirls?: string;
	}
	const { totalBoys, totalGirls } = withDefaults(defineProps<genderSummary>(), {
		totalGirls: "N/a",
		totalBoys: "N/a",
	});
</script>
