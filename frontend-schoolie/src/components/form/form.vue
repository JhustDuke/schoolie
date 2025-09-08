<template>
	<form class="container bg-light p-4 rounded shadow-sm">
		<!-- Webcam Section -->
		<div class="row mb-3">
			<div class="text-center">
				<WebCam
					@image-captured="onWebcamCapture"
					v-model="webCam" />
			</div>
		</div>

		<!-- Name Fields -->
		<div class="row mb-3">
			<div class="col-md-3 mb-3">
				<TextField
					id="surname"
					label="Surname"
					placeholder="Enter Surname"
					v-model="surnameInput"
					@input="runValidation('name', 'surnameInput', $event)" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="firstname"
					label="First Name"
					placeholder="Enter First Name"
					v-model="firstnameInput"
					@input="runValidation('name', 'firstnameInput', $event)" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="middlename"
					label="Middle Name"
					placeholder="Enter Middle Name"
					v-model="middlenameInput"
					@input="runValidation('name', 'middlenameInput', $event)" />
			</div>

			<!-- select field starts here -->
			<div class="col-md-3 mb-3">
				<SelectField
					id="classSelect"
					label="Class"
					:options="[
						'Creche',
						'Nursery 1',
						'Nursery 2',
						'Nursery 3',
						'Grade 1',
						'Grade 2',
						'Grade 3',
						'Grade 4',
						'Grade 5',
					]"
					v-model="classSelect"
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
					v-model="genderSelect"
					:options="['Male', 'Female']"
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
					v-model="dobInput"
					placeholder="YYYY-MM-DD"
					type="text"
					@focusout="runValidation('dob', 'dobInput', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="religionSelect"
					label="Religion"
					v-model="religionSelect"
					:options="['Christian', 'Muslim']"
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
					v-model="stateSelect"
					:options="['State 1', 'State 2', 'State 3']"
					@focusout="
						runValidation(
							'select',
							'stateSelect',
							$event,
							domStaticValues.chooseState
						)
					" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="lgaSelect"
					label="Local Government"
					v-model="lgaSelect"
					:options="['LGA 1', 'LGA 2', 'LGA 3']"
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
					v-model="bloodGroupSelect"
					:options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
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
					id="addressInput"
					label="Address"
					placeholder="Enter Address"
					isTextarea
					v-model="addressInput"
					@input="runValidation('address', 'addressInput', $event)" />
			</div>
		</div>

		<!-- Phone Fields -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<PhoneField
					id="fatherPhone"
					label="Father's Phone"
					placeholder="Enter Father's Phone"
					v-model="fatherPhoneInput"
					@input="runValidation('phone', 'fatherPhoneInput', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="motherPhone"
					label="Mother's Phone"
					placeholder="Enter Mother's Phone"
					v-model="motherPhoneInput"
					@input="runValidation('phone', 'motherPhoneInput', $event)" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="otherPhone"
					label="Other Phone"
					placeholder="Enter Other Phone"
					v-model="otherPhoneInput"
					@input="runValidation('phone', 'otherPhoneInput', $event)" />
			</div>
		</div>

		<!-- Submit -->
		<center>
			<button
				disabled
				type="button"
				class="btn btn-primary w-50"
				@click="onSubmit">
				Submit
			</button>
		</center>
	</form>
</template>

<script setup lang="ts">
	import TextField from "./textField.vue";
	import PhoneField from "./phoneField.vue";
	import SelectField from "./selectField.vue";
	import WebCam from "./webcam.vue";
	import { ref } from "vue";
	import {
		validateNameField,
		validateSelectField,
		domStaticValues,
		validatePhoneField,
		validateDob,
		validateAddressField,
	} from "../utils/scripts";

	const firstnameInput = ref<string>("");
	const middlenameInput = ref<string>("");
	const surnameInput = ref<string>("");
	const genderSelect = ref<string>("");
	const dobInput = ref<string>("");
	const religionSelect = ref<string>("");
	const bloodGroupSelect = ref<string>("");
	const addressInput = ref<string>("");
	const fatherPhoneInput = ref<string>("");
	const motherPhoneInput = ref<string>("");
	const otherPhoneInput = ref<string>("");
	const lgaSelect = ref<string>("");
	const stateSelect = ref<string>("");
	const classSelect = ref<string>("");
	const webCam = ref<string>("");

	const formFieldsState = ref<Record<string, boolean>>({
		firstnameInput: false,
		middlenameInput: false,
		surnameInput: false,
		genderSelect: false,
		dobInput: false,
		religionSelect: false,
		bloodGroupSelect: false,
		addressInput: false,
		fatherPhoneInput: false,
		motherPhoneInput: false,
		otherPhoneInput: false,
		lgaSelect: false,
		stateSelect: false,
		classSelect: false,
		webCam: false,
	});

	/**
	 * Centralized validation
	 */
	function runValidation(
		type: "name" | "select" | "phone" | "dob" | "address",
		prop: string,
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
				elementStateObj: formFieldsState.value,
				stateProp: prop,
			});
		}
		if (type === "select") {
			validateSelectField({
				invalidValue: invalidValue || "",
				stateObj: formFieldsState.value,
				prop,
				selectElem: target as HTMLSelectElement,
			});
		}
		if (type === "phone") {
			validatePhoneField({
				inputElem: target as HTMLInputElement,
				prop,
				statesObj: formFieldsState.value,
			});
		}
		if (type === "dob") {
			validateDob({
				inputElem: target as HTMLInputElement,
				prop,
				statesObj: formFieldsState.value,
			});
		}
		if (type === "address") {
			validateAddressField({
				inputElem: target as HTMLTextAreaElement,
				prop,
				statesObj: formFieldsState.value,
			});
		}
	}

	function onWebcamCapture() {}

	function onSubmit() {
		console.log("Submit clicked");
	}
</script>
