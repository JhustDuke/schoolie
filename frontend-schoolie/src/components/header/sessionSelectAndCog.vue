<template>
	<!-- Flex container to align select and cog horizontally -->
	<div class="d-flex align-items-center gap-3">
		<!-- Rounded select dropdown with auto width -->
		<select
			@change="getSingleSessionStats"
			class="form-select"
			style="border-radius: 20px">
			<option
				selected
				disabled
				value="chooseSession"
				>Choose session</option
			>
			<option
				v-if="!sessionData?.length"
				class="text-muted"
				disabled>
				no sessions available click addSession
			</option>
			<option
				v-for="year of sessionData"
				:value="year"
				>{{ year }}</option
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
	import { ref, onMounted } from "vue";
	import { sessionModel } from "../../model";
	import AddSessionModal from "./addSessionModal.vue";
	import { notifyToast } from "../utils/scripts";

	const isVisible = ref<boolean>(false);

	const sessionData = ref<string[] | null>([]);

	onMounted(async function () {
		await loadAllSessions();
	});

	async function getSingleSessionStats(e: Event) {
		const elemValue = (e.target as HTMLSelectElement)?.value;
		if (elemValue.toLowerCase().includes("sessions")) {
			console.log("noope");
			return;
		}
		try {
			await sessionModel.getSessionStats(elemValue);
			notifyToast({
				type: "success",
				text: "session stats fetch successfully",
			});
		} catch (err: any) {
			notifyToast({ type: "error", text: "could not fetch session stats" });
		}
	}

	async function loadAllSessions() {
		try {
			const data: string[] | null = await sessionModel.loadSessionYears();
			sessionData.value = [...(data || [])];
		} catch (err: any) {
			notifyToast({
				text: err.message,
				type: "error",
			});
		}
	}

	function showError(payload?: { reason: string }) {
		notifyToast({
			text: `reason:${payload?.reason} `,
			type: "error",
		});
	}

	async function showSuccess(payload?: { msg: string }) {
		notifyToast({
			text: ` ${payload?.msg}`,
			type: "success",
		});
		await loadAllSessions();
	}
</script>
