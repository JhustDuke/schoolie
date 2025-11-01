<template>
	<div class="d-flex align-items-center gap-3">
		<select
			@change="getSingleSessionStats"
			class="form-select"
			style="border-radius: 20px; max-width: 150px">
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

		<div
			class="mt-2 w-50 isAbsolute"
			style="top: 96%; left: 20%">
			<AddSessionModal
				:visible="isVisible"
				@error="showError"
				@success="showSuccess"
				@close="isVisible = false" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, inject } from "vue";
	import { sessionModel } from "../../model";
	import AddSessionModal from "./addSessionModal.vue";
	import { notifyToast } from "../utils/scripts";

	const isVisible = ref<boolean>(false);
	const sessionData = ref<string[] | null>([]);

	const sessionStore = inject<{
		allSessions: Readonly<Set<string>>;
		updateSessions: (sessions: string[]) => void;
	}>("sessions");

	onMounted(async function () {
		await loadAllSessions();
	});

	async function getSingleSessionStats(e: Event) {
		const elemValue = (e.target as HTMLSelectElement)?.value;
		if (elemValue.toLowerCase().includes("session")) return;

		try {
			await sessionModel.getSessionStats(elemValue);
			notifyToast({
				type: "success",
				text: "session stats fetch successfully",
			});
		} catch {
			notifyToast({ type: "error", text: "could not fetch session stats" });
		}
	}

	async function loadAllSessions() {
		try {
			const data: string[] | null = await sessionModel.loadSessionYears();
			sessionData.value = [...(data || [])];
			if (sessionData.value.length > 0)
				sessionStore?.updateSessions(sessionData.value);
		} catch (err: any) {
			notifyToast({ text: err.message, type: "error" });
		}
	}

	function showError(payload?: { reason: string }) {
		notifyToast({ text: `reason:${payload?.reason}`, type: "error" });
	}

	async function showSuccess(payload?: { msg: string }) {
		notifyToast({ text: `${payload?.msg}`, type: "success" });
		await loadAllSessions();
	}
</script>
