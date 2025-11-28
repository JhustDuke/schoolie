<template>
	<div class="p-3 rounded white">
		<!-- GENDER SUMMARY (inline) -->
		<div class="p-3 rounded white text-center text-md-start">
			<h5 color="blue-text">Gender summary</h5>

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

		<!-- TOTAL STATS (inline) -->
		<div class="d-flex justify-content-around mt-3">
			<div class="p-3 rounded white text-center text-md-start">
				<h5 color="blue-text">Total Pupils</h5>
				<p class="fs-4 fw-bold red-text">{{ totalBoys + totalGirls }}</p>
			</div>

			<div class="p-3 rounded white text-center text-md-start">
				<h5 color="blue-text">Total Boys</h5>
				<p class="fs-4 fw-bold red-text">{{ totalBoys }}</p>
			</div>

			<div class="p-3 rounded white text-center text-md-start">
				<h5 color="blue-text">Total Girls</h5>
				<p class="fs-4 fw-bold red-text">{{ totalGirls }}</p>
			</div>
		</div>

		<!-- STUDENT CARDS -->
		<div class="mt-4">
			<h6 class="fw-bold mb-3">Pupils</h6>

			<div
				v-if="pupils.length > 0"
				class="d-flex flex-column flex-md-row flex-md-wrap justify-content-evenly">
				<StudentCard
					class="mx-2"
					v-for="(pupil, index) in pupils"
					:key="index"
					:name="String(pupil.firstAndLastName)"
					:parentPhone="String(pupil.fatherPhone)"
					:passport="pupil.passport || defaultImage" />
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
	import StudentCard from "../../utils/studentCard.vue";
	import defaultImage from "@assets/defaultImage.png";

	interface PupilsCardInterface {
		firstAndLastName: string | null;
		fatherPhone: string | null;
		passport?: string | null;
	}

	export interface ClassDetailsInterface {
		totalBoys: number;
		totalGirls: number;
		pupils: PupilsCardInterface[];
	}

	withDefaults(defineProps<ClassDetailsInterface>(), {
		totalBoys: 0,
		totalGirls: 0,
		pupils: () => [],
	});
</script>
