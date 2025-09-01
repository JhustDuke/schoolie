<script setup lang="ts">
	import { ref } from "vue";

	const showSettings = ref(false);
</script>

<template>
	<div class="d-flex align-items-center gap-3 isRelative">
		<select
			class="form-select"
			style="border-radius: 20px; width: auto">
			<option
				selected
				disabled
				value="chooseSession"
				>Choose session</option
			>
			<option value="addSession">Add Session</option>
		</select>

		<i
			class="fa fa-cog white-text fs-5"
			style="cursor: pointer"
			@click="showSettings = !showSettings"></i>

		<div
			v-if="showSettings"
			class="isAbsolute top-100 start-50 mt-2 p-3 bg-white rounded shadow"
			style="z-index: 1000">
			<h6 class="fw-bold mb-2">Settings</h6>
			<button class="btn btn-sm btn-outline-danger w-100 mb-2"
				>Delete Session</button
			>
			<button class="btn btn-sm btn-outline-primary w-100 mb-2"
				>Delete Class</button
			>
			<button class="btn btn-sm btn-outline-success w-100"
				>Other Setting</button
			>
		</div>
	</div>
</template>
