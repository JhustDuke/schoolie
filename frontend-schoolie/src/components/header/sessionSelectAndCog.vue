<template>
	<!-- Flex container to align select and cog horizontally -->
	<div class="d-flex align-items-center gap-3">
		<!-- Rounded select dropdown with auto width -->
		<select
			class="form-select"
			style="border-radius: 20px; width: auto">
			<option
				selected
				disabled
				value="chooseSession"
				>Choose session</option
			>
			<option
				value="addSession"
				@click="isVisible = true"
				>Add Session</option
			>
		</select>

		<!-- Generic modal directly underneath the select position absolute to navbar -->
		<div
			class="mt-2 w-50 isAbsolute"
			style="top: 96%; left: 20%">
			<AddSessionModal
				:visible="isVisible"
				@error="showError"
				@success="showSuccess"
				@close="isVisible = false" />
		</div>

		<!-- Cog icon styled as clickable -->
		<i
			class="fa fa-cog white-text fs-5"
			style="cursor: pointer"></i>
	</div>
</template>

<script setup lang="ts">
	//import { sessionModel } from "../../model";
	import { ref } from "vue";
	import AddSessionModal from "./addSessionModal.vue";
	import { notifyToast } from "../utils/scripts";

	const isVisible = ref<boolean>(false);

	function showError(payload?: { msg: string; reason?: string }) {
		notifyToast({
			text: `msg:${payload?.msg}-reason:${payload?.reason} `,
			type: "error",
		});
	}

	function showSuccess(payload?: { msg: string }) {
		notifyToast({
			text: ` ${payload?.msg}`,
			type: "success",
		});
	}
</script>
