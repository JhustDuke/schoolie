<template>
	<section
		v-show="visible"
		ref="modal"
		id="genericModal">
		<div class="pt-2 px-4 text-center pb-2 grey darken-3">
			<!-- Close Button -->
			<span class="float-end hover close-btn mb-2">
				<i
					class="fa fa-window-close red-text"
					aria-hidden="true"
					@click="emit('close')"></i>
			</span>

			<p class="form-text red-text fw-bold text-capitalize">
				Please register a session year <br />
				<span v-show="showHint">
					session year must be in format <br />
					YYYY/YYYY
				</span>
			</p>

			<input
				v-model="inputVal"
				@input="checkInput"
				type="text"
				class="form-control my-0"
				id="sessionModalInput" />
			<br />

			<button
				type="button"
				@click="sendToDatabase"
				class="btn btn-primary w-100"
				:disabled="btnDisabled"
				id="addSessionBtn"
				v-html="btnText"></button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { isValidYearFormat } from "../utils/scripts";
	import { sessionModel } from "../../model";
	import { ref } from "vue";

	interface ModalPropsInterface {
		visible?: boolean;
	}

	const showHint = ref(false);
	const btnDisabled = ref(true);
	const btnText = ref("Add Session");

	const emit = defineEmits<{
		(event: "close"): void;
		(event: "error", payload?: { msg: string; reason?: string }): void;
		(event: "success", payload?: { msg: string }): void;
	}>();

	defineProps<ModalPropsInterface>();

	const spinner =
		'<span class="spinner-border spinner-border-sm"></span> Adding...';

	const inputVal = ref<string>("");

	function checkInput(e: Event) {
		const elem = e.target as HTMLInputElement;
		const safeValue = isValidYearFormat(elem.value);

		if (!safeValue) {
			showHint.value = true;
			btnDisabled.value = true;
			return;
		}
		inputVal.value = elem.value;

		showHint.value = false;
		btnDisabled.value = false;
	}

	async function sendToDatabase() {
		btnText.value = spinner;
		btnDisabled.value = true;

		try {
			await sessionModel.addNewSessionYear(inputVal.value);
			console.log("success");
			emit("success", { msg: `session year ${inputVal.value} added` });
		} catch (err: any) {
			console.error(err.message);
			emit("error", {
				msg: `session year ${inputVal.value} not added`,
				reason: err.message,
			});
		} finally {
			btnText.value = "Add Session";
			btnDisabled.value = true;
			showHint.value = false;
			inputVal.value = "";
			emit("close");
		}
	}
</script>
