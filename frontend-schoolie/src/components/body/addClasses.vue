<template>
	<section id="classModal">
		<div
			class="pt-2 px-4 text-center pb-2 grey lighten-1 mx-auto w-50 opacity-75">
			<!-- Close Button -->
			<span class="float-end hover close-btn mb-2">
				<i
					class="fa fa-window-close red-text"
					aria-hidden="true"
					@click="emit('close')"></i>
			</span>

			<!-- Sessions Select -->
			<div class="mb-3">
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
						v-for="cls in classes"
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

			<!-- Divider -->
			<hr class="my-4" />

			<!-- Selected Session + Chosen Classes -->
			<div>
				<span class="text-muted">selected class and session goe here</span>
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
					class="text-muted"
					>No classes selected yet</p
				>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";

	interface ModalPropsInterface {
		isVisible?: boolean;
		loadedSessions?: string[];
	}

	const props = defineProps<ModalPropsInterface>();

	const emit = defineEmits<{
		(event: "close"): void;
		(event: "select", payload: { className: string }): void;
	}>();

	const classes = ref<string[]>([
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

	const sessions = ref<string[]>(props.loadedSessions || []);
	const selectedSession = ref<string>("");

	const chosenClasses = ref<string[]>([]);
	const customClass = ref<string>("");

	function chooseClass(cls: string) {
		console.log("test");
		if (!chosenClasses.value.includes(cls)) {
			chosenClasses.value.push(cls);
		}
		emit("select", { className: cls });
	}

	function addCustomClass() {
		const val = customClass.value.trim();
		if (!val) return;
		if (!chosenClasses.value.includes(val)) {
			chosenClasses.value.push(val);
		}
		emit("select", { className: val });
		customClass.value = "";
	}

	function removeClass(cls: string) {
		chosenClasses.value = chosenClasses.value.filter((c) => c !== cls);
	}

	// Sorted alphabetically
	const sortedChosenClasses = computed(() => [...chosenClasses.value].sort());
</script>

<style scoped>
	.dynamic:hover {
		background: grey !important;
		color: white !important;
	}
</style>
