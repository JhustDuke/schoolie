<template>
	<div class="position-relative">
		<i
			class="fa fa-cog white-text fs-5"
			style="cursor: pointer"
			@click="openModal">
		</i>

		<!-- MODAL -->
		<div
			v-if="isVisible"
			class="position-absolute bg-white p-3 rounded shadow"
			style="right: 0; top: 40px; width: 260px; z-index: 50">
			<h6 class="fw-bold mb-3">Manage Sessions</h6>

			<center
				v-html="spin"
				v-if="isLoading"></center>

			<div v-else>
				<p class="text-muted">double click to delete</p>
				<div
					v-for="session in sessions"
					:key="session"
					class="py-2 px-2 border-bottom del"
					style="cursor: pointer"
					@dblclick="onDoubleClick(session)">
					{{ session }}
				</div>
				<div
					v-if="sessions.length === 0"
					class="text-muted">
					No sessions available
				</div>
			</div>

			<button
				class="btn btn-secondary mt-3 w-100"
				@click="isVisible = false">
				Close
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, nextTick } from "vue";
	import { useSessionStore } from "../../store/sessionStore";
	import { spinner } from "../utils/spinner";

	const spin = spinner("red-text");
	const sessionStore = useSessionStore();

	const isVisible = ref(false);
	const isLoading = ref(false);
	const sessions = ref<string[]>([]);

	const emit = defineEmits<{
		(e: "delete-session", session: string): void;
	}>();

	const openModal = async function () {
		isVisible.value = true;
		isLoading.value = true;
		await nextTick();
		// simulate async load
		sessions.value = Array.from(sessionStore.allSessions);
		isLoading.value = false;
	};

	const onDoubleClick = function (session: string) {
		if (
			window.confirm(
				`Delete session "${session}"?\nThis action cannot be undone.`
			)
		) {
			emit("delete-session", session);
			isVisible.value = false;
		}
	};
</script>

<style scoped>
	.del:hover {
		color: white !important;
		background-color: red;
	}
</style>
