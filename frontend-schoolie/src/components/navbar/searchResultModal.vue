<template>
	<div v-if="visible">
		<div
			class="position-absolute bg-white p-3 rounded shadow"
			style="width: 70%; height: 100vh; z-index: 50; top: 50%; left: 18%">
			<div class="d-flex justify-content-between align-items-center mb-2">
				<h6 class="m-0">Search Results</h6>
				<i
					class="fa fa-times cursor-pointer"
					@click="onClose"></i>
			</div>

			<!-- ERROR -->
			<BrokenLink
				v-if="error"
				:title="error.title"
				:iconClass="error.iconClass"
				:errorMessage="error.errorMessage"
				:redirectTo="error.redirectTo"
				:wrapperClass="error.wrapperClass"
				:mainContainerClass="error.mainContainerClass"
				:width="error.width" />

			<!-- LOADING -->
			<div
				v-else-if="loading"
				class="text-center py-3">
				<div v-html="spin"></div>
			</div>

			<!-- EMPTY -->
			<div
				v-else-if="results.length === 0"
				class="text-center text-muted">
				No results
			</div>

			<!-- RESULTS -->
			<div v-else>
				<StudentCard
					v-for="(student, index) in results"
					:key="index"
					:name="student.firstname + ' ' + student.surname"
					:className="student.classSelect"
					:parentPhone="student.parentPhone || 'n/a'" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { spinner } from "@utils/spinner";
	import BrokenLink from "../utils/brokenLink.vue";
	import StudentCard from "../utils/studentCard.vue";

	const spin = spinner();

	defineProps<{
		results: Array<Record<string, any>>;
		visible: boolean;
		loading: boolean;
		error?: any | null;
	}>();

	const emit = defineEmits(["close"]);

	const onClose = function () {
		emit("close");
	};
</script>
