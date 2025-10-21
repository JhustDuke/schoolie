<template>
	<div class="p-3 rounded white">
		<h5>Gender summary</h5>
		<div class="d-flex justify-content-center gap-4 mt-2">
			<div>
				<i class="fa fa-male blue-text fa-2x"></i>
				<div
					class="fw-bold"
					id="maleTotal"
					>{{ maleTotal }}</div
				>
			</div>
			<div>
				<i class="fa fa-female pink-text fa-2x"></i>
				<div
					class="fw-bold"
					id="femaleTotal"
					>{{ femaleTotal }}</div
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// props could be added later if values become dynamic

	interface genderSummary {
		maleTotal?: string;
		femaleTotal?: string;
	}
	withDefaults(defineProps<genderSummary>(), {
		maleTotal: "N/a",
		femaleTotal: "N/a",
	});
</script>
