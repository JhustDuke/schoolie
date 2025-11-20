<template>
	<form
		class="container bg-light p-4 rounded shadow-sm"
		id="appForm">
		<!-- passport Section -->
		<div class="row mb-3">
			<div class="text-center">
				<WebCam
					ref="imageSrcRef"
					@image-captured="onImageReceived"
					@upload="onUploadReceived"
					v-model="formEntries.passport" />
			</div>
		</div>

		<!-- Name Fields -->
		<div class="row mb-3">
			<div class="col-md-3 mb-3">
				<TextField
					id="surname"
					label="Surname"
					placeholder="Enter Surname"
					v-model="formEntries.surname"
					@input="runValidation('name', 'surname', $event)" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="firstname"
					label="First Name"
					placeholder="Enter First Name"
					v-model="formEntries.firstname"
					@input="runValidation('name', 'firstname', $event)" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="middlename"
					label="Middle Name"
					placeholder="Enter Middle Name"
					v-model="formEntries.middlename"
					@input="runValidation('name', 'middlename', $event)" />
			</div>

			<!-- select field starts here -->
			<div class="col-md-3 mb-3">
				<SelectField
					id="classSelect"
					label="Class"
					:options="
						useClassesStore().allClasses.length
							? useClassesStore().allClasses
							: ['mockClass-1', 'mockClass-2']
					"
					v-model="formEntries.classSelect"
					@focusout="
						runValidation(
							'select',
							'classSelect',
							$event,
							domStaticValues.chooseClass
						)
					" />
			</div>
		</div>

		<!-- Gender, DOB, Religion -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<SelectField
					id="genderSelect"
					label="Gender"
					:options="['Male', 'Female']"
					v-model="formEntries.genderSelect"
					@focusout="
						runValidation(
							'select',
							'genderSelect',
							$event,
							domStaticValues.chooseGender
						)
					" />
			</div>
			<div class="col-md-4 mb-3">
				<TextField
					id="dobInput"
					label="Date of Birth"
					v-model="formEntries.dob"
					placeholder="YYYY-MM-DD"
					type="text"
					@focusout="runValidation('dob', 'dob', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="religionSelect"
					label="Religion"
					:options="['Christian', 'Muslim']"
					v-model="formEntries.religionSelect"
					@focusout="
						runValidation(
							'select',
							'religionSelect',
							$event,
							domStaticValues.chooseReligion
						)
					" />
			</div>
		</div>

		<!-- State, LGA, Blood Group -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<SelectField
					id="stateSelect"
					label="State"
					:options="stateSelectOptions"
					v-model="formEntries.statesSelect"
					@focusout="
						runValidation(
							'select',
							'statesSelect',
							$event,
							domStaticValues.chooseState
						)
					" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="lgaSelect"
					label="Local Government"
					:options="lgaSelectOptions"
					v-model="formEntries.lgaSelect"
					@focusout="
						runValidation(
							'select',
							'lgaSelect',
							$event,
							domStaticValues.chooseLga
						)
					" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="bloodGroupSelect"
					label="Blood Group"
					:options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
					v-model="formEntries.bloodGroupSelect"
					@focusout="
						runValidation(
							'select',
							'bloodGroupSelect',
							$event,
							domStaticValues.chooseBloodGroup
						)
					" />
			</div>
		</div>

		<!-- Address -->
		<div class="row mb-3">
			<div class="col-12 mb-3">
				<TextField
					id="address"
					label="Address"
					placeholder="Enter Address"
					isTextarea
					v-model="formEntries.address"
					@input="runValidation('address', 'address', $event)" />
			</div>
		</div>

		<!-- Phone Fields -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<PhoneField
					id="fatherPhone"
					label="Father's Phone"
					placeholder="Enter Father's Phone"
					v-model="formEntries.fatherPhone"
					@input="runValidation('phone', 'fatherPhone', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="motherPhone"
					label="Mother's Phone"
					placeholder="Enter Mother's Phone"
					v-model="formEntries.motherPhone"
					@input="runValidation('phone', 'motherPhone', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="otherPhone"
					label="Other Phone"
					placeholder="Enter Other Phone"
					v-model="formEntries.otherPhone"
					@input="runValidation('phone', 'otherPhone', $event)" />
			</div>
		</div>

		<!-- Submit and error list -->
		<center>
			<div
				v-if="hasFalsyState.hasError"
				style="overflow-wrap: break-word"
				class="red-text text-muted p-2">
				this fields are invalid:
				{{ Array.from(hasFalsyState.fields).join(", ") }}
			</div>

			<button
				type="button"
				class="btn btn-primary w-50"
				:disabled="hasFalsyState.hasError || isSubmitting"
				v-html="submitButtonContent"
				@click="onSubmit">
			</button>

			<div
				class="mt-3 fw-bold"
				v-if="submitStatus"
				:class="isSubmitFailed ? 'red-text' : 'green-text'">
				{{ submitStatus }}
			</div>
		</center>
	</form>
</template>

<script setup lang="ts">
	import TextField from "./textField.vue";
	import PhoneField from "./phoneField.vue";
	import SelectField from "./selectField.vue";
	import WebCam from "./webcam.vue";
	import { reactive, ref, watch, computed } from "vue";
	import {
		validateNameField,
		validateSelectField,
		domStaticValues,
		validatePhoneField,
		validateDob,
		validateAddressField,
		notifyToast,
	} from "../utils/scripts";
	import naijaStateLocalGovernment from "naija-state-local-government";
	import { formModel } from "../../model";
	import { spinner } from "../utils/spinner";
	import { useTabStore } from "../../store/tabStore";
	import { useClassesStore } from "../../store/classesStore";

	interface FormEntriesInterface {
		firstname: string;
		middlename: string;
		surname: string;
		genderSelect: string;
		dob: string;
		religionSelect: string;
		bloodGroupSelect: string;
		address: string;
		fatherPhone: string;
		motherPhone: string;
		otherPhone: string;
		lgaSelect: string;
		statesSelect: string;
		classSelect: string;
		passport: string;
	}

	// reactive form entries
	const formEntries = reactive({
		firstname: "",
		middlename: "",
		surname: "",
		genderSelect: "",
		dob: "",
		religionSelect: "",
		bloodGroupSelect: "",
		address: "",
		fatherPhone: "",
		motherPhone: "",
		otherPhone: "",
		lgaSelect: "",
		statesSelect: "",
		classSelect: "",
		passport: "",
	});

	// reactive validation state
	const formFieldsState = reactive<Record<keyof FormEntriesInterface, boolean>>(
		{
			firstname: false,
			middlename: false,
			surname: false,
			genderSelect: false,
			dob: false,
			religionSelect: false,
			bloodGroupSelect: false,
			address: false,
			fatherPhone: false,
			motherPhone: false,
			otherPhone: false,
			lgaSelect: false,
			statesSelect: false,
			classSelect: false,
			passport: false,
		}
	);

	const stateSelectOptions: string[] = naijaStateLocalGovernment.states();
	let lgaSelectOptions = ref<string[]>([]);

	watch(
		function () {
			return formEntries.statesSelect;
		},
		function (newValue) {
			if (formEntries.statesSelect === "") {
				return;
			}
			lgaSelectOptions.value = naijaStateLocalGovernment.lgas(newValue).lgas;
		}
	);

	const hasFalsyState = computed(() => {
		let key: keyof FormEntriesInterface;
		const errors = new Set<string>();
		for (key in formFieldsState) {
			if (!formFieldsState[key]) errors.add(key);
		}
		return { hasError: errors.size > 0, fields: errors };
	});

	function runValidation(
		type: "name" | "select" | "phone" | "dob" | "address",
		prop: keyof FormEntriesInterface,
		event: Event,
		invalidValue?: string
	): void {
		const target = event.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement;

		if (type === "name") {
			validateNameField({
				inputElem: target as HTMLInputElement,
				elementStateObj: formFieldsState,
				stateProp: prop,
			});
		}
		if (type === "select") {
			validateSelectField({
				invalidValue: invalidValue || "",
				stateObj: formFieldsState,
				prop,
				selectElem: target as HTMLSelectElement,
			});
		}
		if (type === "phone") {
			validatePhoneField({
				inputElem: target as HTMLInputElement,
				prop,
				statesObj: formFieldsState,
			});
		}
		if (type === "dob") {
			validateDob({
				inputElem: target as HTMLInputElement,
				prop,
				statesObj: formFieldsState,
			});
		}
		if (type === "address") {
			validateAddressField({
				inputElem: target as HTMLTextAreaElement,
				prop,
				statesObj: formFieldsState,
			});
		}
	}

	function onImageReceived(payload: { success: boolean; image?: string }) {
		if (!payload.success) return;
		formEntries.passport = payload.image!;
		formFieldsState.passport = !!formEntries.passport;
	}

	function onUploadReceived(payload: { success: boolean; file?: string }) {
		if (!payload.success) return;
		formEntries.passport = payload.file!;
		formFieldsState.passport = !!formEntries.passport;
	}

	const isSubmitting = ref<boolean>(false);
	const submitButtonContent = ref<string>("Submit");
	const submitStatus = ref<string>("");
	const isSubmitFailed = ref(true);
	const imageSrcRef = ref<InstanceType<typeof WebCam> | null>(null);

	async function onSubmit(): Promise<void> {
		isSubmitting.value = true;
		submitButtonContent.value = spinner();
		submitStatus.value = "";

		try {
			const formData = new FormData();
			let key: keyof FormEntriesInterface;
			for (key in formEntries) {
				formData.append(key, formEntries[key]);
			}

			await formModel.sendFormData(formData);
			isSubmitFailed.value = false;

			notifyToast({
				text: "successfully added new pupil",
				type: "success",
				timeout: 3000,
			});

			resetForm("appForm", imageSrcRef.value?.reset);
			useTabStore().goto("overview");
		} catch (err: any) {
			submitStatus.value = err.message || "An error occurred, check console";
			isSubmitFailed.value = true;
		} finally {
			isSubmitting.value = false;
			submitButtonContent.value = "Submit";
		}
	}

	function resetForm(formId: string, cb?: Function): void {
		const formEl = document.getElementById(formId);

		if (!formEl) {
			console.error(`Element with form id "${formId}" not found`);
			return;
		}

		const elements = formEl.querySelectorAll("*");
		elements.forEach(function (el) {
			if (el instanceof HTMLInputElement) {
				if (el.type === "checkbox" || el.type === "radio") el.checked = false;
				else el.value = "";
			} else if (el instanceof HTMLTextAreaElement) {
				el.value = "";
			} else if (el instanceof HTMLSelectElement) {
				el.selectedIndex = 0;
			} else if (el instanceof HTMLImageElement) {
				el.src = "";
				cb?.();

				// imageSrcRef.value.res3
			}
		});

		// Reset reactive form entries
		let key: keyof FormEntriesInterface;
		for (key in formEntries) formEntries[key] = "";
	}
</script>
