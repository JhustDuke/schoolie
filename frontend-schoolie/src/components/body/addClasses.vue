<template>
	<section id="classModal">
		<div
			class="pt-2 px-4 text-center pb-2 grey lighten-1 mx-auto w-50 opacity-75">
			<div class="red-text black fw-bold text-uppercase p-2">
				hello, you seem to be new add classes below and choose a session to get
				started!
			</div>
			<!-- Sessions Select -->
			<div class="pb-5">
				<label
					for="sessionSelect"
					class="form-label fw-bold text-uppercase red-text text-darken-4">
					select session
				</label>
				<select
					id="sessionSelect"
					v-model="selectedSession"
					class="form-select w-50 mx-auto">
					<option
						v-for="session in sessions"
						:key="session"
						:value="session">
						{{ session }}
					</option>
				</select>
			</div>

			<small
				class="mt-2 red-text text-darken-3 p-2 fw-bold text-capitalize d-block">
				double click to add a class
			</small>

			<!-- Preset Classes -->
			<div class="mt-3 d-flex justify-content-evenly">
				<div class="row mt-3 justify-content-center">
					<div
						v-for="cls in presetClasses"
						:key="cls"
						class="col-6 col-md-auto mb-2">
						<button
							class="btn btn-primary w-100 text-uppercase"
							@dblclick="chooseClass(cls)">
							{{ cls }}
						</button>
					</div>
				</div>
			</div>

			<!-- Custom Class -->
			<div class="mx-auto mt-3">
				<label
					for="addCustomClassInput"
					class="form-label text-left fw-bold text-uppercase red-text text-darken-4">
					add custom class
				</label>
				<input
					v-model="customClass"
					id="addCustomClassInput"
					type="text"
					class="form-control w-50 mx-auto" />
				<button
					class="btn btn-primary mt-2 text-uppercase w-50"
					@click="addCustomClass">
					add
				</button>
			</div>

			<hr class="my-4" />

			<!-- Selected Session + Chosen Classes -->
			<div>
				<span class="text-muted">selected class and session go here</span>
				<h3
					class="text-capitalize fw-bold"
					v-if="selectedSession">
					{{ selectedSession }}
				</h3>
				<h3
					class="text-capitalize fw-bold"
					v-else>
					session n/a
				</h3>

				<div
					v-if="sortedChosenClasses.length"
					class="d-flex flex-wrap gap-2 justify-content-center mt-2">
					<span
						v-for="cls in sortedChosenClasses"
						:key="cls"
						class="btn btn-sm green white-text text-uppercase px-3 py-2 dynamic"
						@dblclick="removeClass(cls)">
						{{ cls }}
					</span>
				</div>

				<p
					v-if="sortedChosenClasses.length"
					class="mt-2 text-muted red-text text-darken-4">
					double tap a class badge to remove it
				</p>
				<p
					v-else
					class="text-muted">
					No classes selected yet
				</p>
			</div>

			<!-- Submit -->
			<div class="mt-4">
				<button
					class="btn btn-success text-uppercase w-50"
					@click="submitClasses"
					:disabled="
						!selectedSession || !sortedChosenClasses.length || isSubmitting
					">
					<span v-if="!isSubmitting">Submit</span>
					<span v-else>Submitting...</span>
				</button>
			</div>

			<!-- Feedback -->
			<div
				v-if="feedbackMessage"
				class="mt-3">
				<p
					class="fw-bold"
					:class="feedbackSuccess ? 'text-success' : 'text-danger'">
					{{ feedbackMessage }}
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { classModel } from "@models/classModel";
	import { useSessionStore } from "../../store/sessionStore";
	import { storeToRefs } from "pinia";

	// --- STORE ---
	const store = useSessionStore();
	const { selectedSession, allSessions } = storeToRefs(store);

	const sessions = computed(function (): string[] {
		return allSessions.value || [];
	});

	// --- PRESET CLASSES ---
	const presetClasses = ref<string[]>([
		"creche",
		"nursery-1",
		"nursery-2",
		"nursery-3",
		"basic-1",
		"basic-2",
		"basic-3",
		"basic-4",
		"basic-5",
		"basic-6",
	]);

	// --- CLASS SELECTION ---
	const chosenClasses = ref<string[]>([]);

	function chooseClass(cls: string): void {
		const alreadyChosen = chosenClasses.value.includes(cls);
		if (!alreadyChosen) {
			chosenClasses.value.push(cls);
		}
	}

	const customClass = ref<string>("");

	function addCustomClass(): void {
		const val = customClass.value.trim();
		if (!val) return;

		const alreadyChosen = chosenClasses.value.includes(val);
		if (!alreadyChosen) {
			chosenClasses.value.push(val);
		}

		customClass.value = "";
	}

	function removeClass(cls: string): void {
		const updated = chosenClasses.value.filter(function (c) {
			return c !== cls;
		});
		chosenClasses.value = updated;
	}

	const sortedChosenClasses = computed(function (): string[] {
		const sorted = [...chosenClasses.value].sort();
		return sorted;
	});

	// --- SUBMISSION ---
	const isSubmitting = ref<boolean>(false);
	const feedbackMessage = ref<string>("");
	const feedbackSuccess = ref<boolean>(false);

	async function submitClasses(): Promise<void> {
		const canSubmit = selectedSession.value && sortedChosenClasses.value.length;

		if (!canSubmit) return;

		isSubmitting.value = true;
		feedbackMessage.value = "";

		try {
			const result = await classModel.addClasses(
				selectedSession.value,
				sortedChosenClasses.value
			);

			feedbackSuccess.value = result.success;
			feedbackMessage.value = `Successfully added `;
		} catch (err: any) {
			feedbackSuccess.value = false;
			feedbackMessage.value =
				err.message ||
				"couldnt complete registrations could be a network or duplicate error check console for more info.";
		} finally {
			isSubmitting.value = false;
		}
	}
</script>

<style scoped>
	.dynamic:hover {
		background: grey !important;
		color: white !important;
	}
</style>
