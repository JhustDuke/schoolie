<template>
	<div
		class="active tab-pane mt-4 p-3 rounded blue-grey lighten-5 shadow text-center text-md-start"
		id="overViewTabContents">
		<div class="row g-4 justify-content-center">
			<div class="col-md">
				<StatCard title="Total Classes" />
			</div>

			<div class="col-md">
				<GenderSummaryCard />
			</div>

			<div class="col-md">
				<StatCard title="Total Pupils" />
			</div>

			<!-- Recently Added Pupils -->
			<div class="col-12">
				<div class="p-3 rounded white">
					<h5>Recently Added Pupils</h5>
					<div
						class="d-flex flex-column flex-md-row justify-content-center justify-content-md-around align-items-center align-items-md-start p-3 flex-wrap text-center text-md-start">
						<StudentCard
							name="Aisha Bello"
							className="Grade 1"
							parentPhone="0802 456 7890" />
						<StudentCard
							name="John Doe"
							className="Grade 2"
							parentPhone="0812 123 4567" />
						<StudentCard
							name="Mary Ann"
							className="Grade 3"
							parentPhone="0803 987 6543" />
					</div>
				</div>
			</div>

			<!-- Class Summary -->
			<div class="col-12">
				<div class="p-3 rounded z-depth-1 white">
					<h5>Class Summary</h5>
					<div class="row g-3 justify-content-center">
						<div class="col-md-3">
							<ClassSummaryCard />
						</div>
						<div class="col-md-3">
							<ClassSummaryCard />
						</div>
						<div class="col-md-3">
							<ClassSummaryCard />
						</div>
					</div>
				</div>
			</div>

			<!-- Recently Updated -->
			<div class="col-md">
				<h5>Recently Updated</h5>
				<div class="d-flex justify-content-evenly p-3 rounded z-depth-1 white">
					<StudentCard
						name="Ali Musa"
						className="Grade 4"
						parentPhone="0902 222 3333" />
					<StudentCard
						name="Bisi Ade"
						className="Grade 2"
						parentPhone="0701 111 2222" />
					<StudentCard
						name="Chika Obi"
						className="Grade 5"
						parentPhone="0809 888 7777" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import StatCard from "./statSummary.vue";
	import GenderSummaryCard from "./genderSummary.vue";
	import ClassSummaryCard from "./classSummary.vue";
	import StudentCard from "../../../utils/studentCard.vue";

	const activeHeader = ref("overview");
	const activeContent = ref("overviewContent");
	const tabsHeaders: { name: string }[] = [
		{
			name: "overview",
		},
		{
			name: "grade1",
		},
	];
	const contents: { name: string }[] = [
		{ name: "overviewContents" },
		{ name: "grade1Contents" },
		{ name: "grade2Contents" },
	];
</script>
