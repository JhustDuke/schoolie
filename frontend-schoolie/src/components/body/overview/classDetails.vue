<template>
	<div class="p-3 rounded white">
		<!-- GENDER SUMMARY -->
		<GenderSummary
			:maleTotal="totalBoys"
			:femaleTotal="totalGirls" />

		<!-- TOTAL STATS (example stat usage) -->
		<div class="d-flex justify-content-around mt-3">
			<StatCard
				title="Total Pupils"
				:value="pupils.length" />
			<StatCard
				title="Total Boys"
				:value="totalBoys" />
			<StatCard
				title="Total Girls"
				:value="totalGirls" />
		</div>

		<!-- STUDENT CARDS -->
		<div class="mt-4">
			<h6 class="fw-bold mb-3">Pupils</h6>
			<div
				v-if="pupils.length > 0"
				class="d-flex justify-content-start">
				<StudentCard
					class="mx-2"
					v-for="(pupil, index) in pupils"
					:key="index"
					:name="pupil.name"
					:className="pupil.className"
					:parentPhone="pupil.parentPhone"
					:image="pupil.image" />
			</div>
			<div
				v-else
				class="text-muted text-center"
				>No pupils found.</div
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	import GenderSummary from "./summary/genderSummary.vue";
	import StatCard from "./summary/statSummary.vue";
	import StudentCard from "@utils/studentCard.vue";

	import defaultImage from "@assets/defaultImage.png";

	interface PupilInterface {
		name: string;
		className: string;
		parentPhone: string;
		image?: string;
	}

	export interface ClassDetailsInterface {
		totalBoys: string;
		totalGirls: string;
		pupils: PupilInterface[];
	}

	withDefaults(defineProps<ClassDetailsInterface>(), {
		totalBoys: "N/A",
		totalGirls: "N/A",
		image: defaultImage,

		pupils: () => [],
	});
</script>

<style scoped>
	h6 {
		color: #333;
	}
</style>
