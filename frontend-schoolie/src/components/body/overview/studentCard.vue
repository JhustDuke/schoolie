<template>
	<div class="p-1 border rounded mb-3 d-flex gap-3">
		<!-- Student Image -->

		<div
			><img
				:src="image"
				alt="student image"
				class="rounded d-block"
				style="width: 80px; height: 100%; object-fit: cover"
		/></div>

		<!-- Student Info -->
		<div>
			<div class="fw-bold text-uppercase">{{ name }}</div>
			<div class="text-capitalize">Class: {{ className }}</div>
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
	import defaultImage from "../../../assets/defaultImage.png";
	interface StudentCardPropsInterface {
		name: string;
		className: string;
		parentPhone: string;
		image?: string;
	}

	withDefaults(defineProps<StudentCardPropsInterface>(), {
		name: "n/a",
		className: "n/a",
		parentPhone: "n/a",
		image: defaultImage,
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
