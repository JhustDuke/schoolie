<template>
	<form class="container bg-light p-4 rounded shadow-sm">
		<!-- Webcam Section -->
		<div class="row mb-3">
			<div class="text-center">
				<WebCam @image-captured="onWebcamCapture" />
			</div>
		</div>

		<!-- Name Fields -->
		<div class="row mb-3">
			<div class="col-md-3 mb-3">
				<TextField
					id="surname"
					label="Surname"
					placeholder="Enter Surname"
					@input="onInputChange" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="firstname"
					label="First Name"
					placeholder="Enter First Name"
					@input="onInputChange" />
			</div>
			<div class="col-md-3 mb-3">
				<TextField
					id="middlename"
					label="Middle Name"
					placeholder="Enter Middle Name"
					@input="onInputChange" />
			</div>
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
					@change="onInputChange" />
			</div>
		</div>

		<!-- Gender, DOB, Religion -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<SelectField
					id="genderSelect"
					label="Gender"
					:options="['Male', 'Female']"
					@change="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<TextField
					id="dobInput"
					label="Date of Birth"
					placeholder="YYYY-MM-DD"
					type="date"
					@input="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="religionSelect"
					label="Religion"
					:options="['Christian', 'Muslim']"
					@change="onInputChange" />
			</div>
		</div>

		<!-- State, LGA, Blood Group -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<SelectField
					id="stateSelect"
					label="State"
					:options="['State 1', 'State 2', 'State 3']"
					@change="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="lgaSelect"
					label="Local Government"
					:options="['LGA 1', 'LGA 2', 'LGA 3']"
					@change="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<SelectField
					id="bloodGroupSelect"
					label="Blood Group"
					:options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
					@change="onInputChange" />
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
					@input="onInputChange" />
			</div>
		</div>

		<!-- Phone Fields -->
		<div class="row mb-3">
			<div class="col-md-4 mb-3">
				<PhoneField
					id="fatherPhone"
					label="Father's Phone"
					placeholder="Enter Father's Phone"
					@input="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="motherPhone"
					label="Mother's Phone"
					placeholder="Enter Mother's Phone"
					@input="onInputChange" />
			</div>
			<div class="col-md-4 mb-3">
				<PhoneField
					id="otherPhone"
					label="Other Phone"
					placeholder="Enter Other Phone"
					@input="onInputChange" />
			</div>
		</div>

		<!-- Submit -->
		<center>
			<button
				disabled
				type="button"
				class="btn btn-primary w-50"
				@click="onSubmit"
				>Submit</button
			>
		</center>
	</form>
</template>

<script setup lang="ts">
	import TextField from "./textField.vue";
	import PhoneField from "./phoneField.vue";
	import SelectField from "./selectField.vue";
	import WebCam from "./webcam.vue";
	//import naijaStateLocalGovernment from "naija-state-local-government";

	// Placeholder methods for now
	function onInputChange(value?: any) {
		console.log("Input changed:", value);
	}

	function onWebcamCapture(imgData: string) {
		console.log("Captured image:", imgData);
	}

	function onSubmit() {
		console.log("Submit clicked");
	}
</script>
