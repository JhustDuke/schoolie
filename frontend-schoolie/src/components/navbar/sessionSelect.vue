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
				v-if="!store.allSessions.length"
				class="text-muted"
				disabled>
				no sessions available — click Add Session
			</option>

			<option
				v-for="year in store.allSessions"
				:key="year"
				:value="year">
				{{ year }}
			</option>

			<option
				value="addSession"
				@click="isVisible = true">
				Add Session
			</option>
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
	import { onMounted, ref } from "vue";
	import AddSessionModal from "./addSessionModal.vue";
	import { sessionModel } from "../../model";
	import { notifyToast } from "../utils/scripts";
	import { useSessionStore } from "../../store/sessionStore";

	const isVisible = ref<boolean>(false);

	onMounted(async function () {
		await loadAllSessions();
	});

	const store = useSessionStore();

	async function getSingleSessionStats(e: Event): Promise<void> {
		const elem = e.target as HTMLSelectElement;
		const elemValue = elem.value;

		try {
			if (elemValue.toLowerCase().includes("session")) {
				store.setActiveSession(store.allSessions[0]);
			}

			store.setActiveSession(elem.value);
			await sessionModel.getSessionStats(elem.value);
			notifyToast({
				type: "success",
				text: "Session stats fetched successfully",
			});
		} catch {
			notifyToast({
				type: "error",
				text: "Could not fetch session stats",
			});
		}
	}

	async function loadAllSessions(): Promise<void> {
		try {
			const data: string[] | null = await sessionModel.loadSessionYears();
			store.setSessions(data || []);
			store.setActiveSession(store.allSessions[0]);
		} catch (err: any) {
			notifyToast({ text: err.message, type: "error" });
		}
	}

	function showError(payload?: { reason: string }): void {
		notifyToast({ text: `Reason: ${payload?.reason}`, type: "error" });
	}

	async function showSuccess(payload?: { msg: string }): Promise<void> {
		notifyToast({ text: payload?.msg || "Success", type: "success" });
		await loadAllSessions();
	}
</script>
