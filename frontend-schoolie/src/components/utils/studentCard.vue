<template>
	<div class="p-1 border rounded mb-3 d-flex gap-3">
		<!-- Student Image -->

		<div
			><img
				:src="passport"
				alt="student image"
				class="rounded d-block"
				style="width: 80px; height: 100%; object-fit: cover"
		/></div>

		<!-- Student Info -->
		<div>
			<div class="fw-bold text-uppercase">{{ name }}</div>
			<div>Parent Phone: {{ parentPhone }}</div>

			<!-- Actions -->
			<div class="d-flex gap-3 mt-2">
				<span
					class="text-muted btn border"
					style="cursor: pointer"
					id="moreInfo"
					>More info</span
				>
				<span
					class="white-text btn red"
					style="cursor: pointer"
					id="updateBtn"
					>Update</span
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface StudentCardPropsInterface {
		name: string;
		parentPhone: string;
		passport?: string;
	}

	withDefaults(defineProps<StudentCardPropsInterface>(), {
		name: "n/a",
		className: "n/a",
		parentPhone: "n/a",
	});
</script>

<style scoped>
	#updateBtn:hover {
		background-color: grey !important;
	}
	#moreInfo:hover {
		background-color: grey !important;
		color: white !important;
	}
</style>
