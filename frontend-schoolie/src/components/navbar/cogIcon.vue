<template>
	<div>
		<i
			class="fa fa-cog white-text fs-5"
			style="cursor: pointer"
			@click="isVisible = true"></i>

		<div
			v-if="isVisible"
			class="modal-backdrop">
			<div class="modal-container bg-white p-4 rounded shadow-lg">
				<h6 class="fw-bold mb-3">Manage Sessions</h6>

				<!-- Multi-select list -->
				<div v-if="sessions.length">
					<div
						v-for="session in sessions"
						:key="session"
						class="form-check">
						<input
							class="form-check-input"
							type="checkbox"
							:id="session"
							:value="session"
							v-model="selectedSessions" />
						<label
							class="form-check-label"
							:for="session">
							{{ session }}
						</label>
					</div>
				</div>
				<p
					v-else
					class="text-muted"
					>No sessions available</p
				>

				<!-- Action button -->
				<button
					class="btn btn-danger mt-3 w-100"
					@click="confirmDelete">
					Delete Selected
				</button>

				<button
					class="btn btn-secondary mt-2 w-100"
					@click="isVisible = false">
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, inject } from "vue";

	const isVisible = ref<boolean>(false);
	const selectedSessions = ref<string[]>([]);

	const sessionStore = inject<{
		allSessions: Readonly<Set<string>>;
	}>("sessions");

	const sessions = Array.from(sessionStore?.allSessions || []);

	function confirmDelete(): void {
		if (!selectedSessions.value.length) {
			alert("Please select at least one session.");
			return;
		}

		alert(
			`Selected sessions: ${selectedSessions.value.join(
				", "
			)}\n\n⚠️ This action cannot be undone!`
		);
		isVisible.value = false;
	}
</script>

<style scoped>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	.modal-container {
		width: 320px;
	}
</style>
