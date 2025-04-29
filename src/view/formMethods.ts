import {
	addElemToDom,
	showErrMsg,
	validateNameField,
	validatePhoneField,
	validateSelectField,
	validateAddressField,
	populateStates,
} from "../utils";

import { domRefs as domElements, domStaticValues } from "./";
import { sessionModel as ssModel } from "../model";
import { naijaService } from "../services";

export const formMethods = (function (
	domRefs = domElements
	//sessionModel = ssModel
) {
	const elementStates = {
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
		statesSelect: false,
		classSelect: false,
		webCam: false,
	};
	const elementDefaultState = function () {
		domRefs.formSubmitBtn!.disabled = true;
		domRefs.stopCameraBtn!.disabled = true;
		domRefs.snapCameraBtn!.disabled = true;
	};

	const DOMDefaultState = function () {
		elementDefaultState();
		populateStates(domRefs.stateSelect as HTMLSelectElement);
	};

	// Validation Methods
	const validateFirstname = function () {
		const { firstnameInput } = domRefs;
		validateNameField({
			inputElem: firstnameInput!,
			fieldKey: "firstnameInput",
			elementStates,
		});
	};

	const validateMiddlename = function () {
		const { middlenameInput } = domRefs;
		validateNameField({
			inputElem: middlenameInput!,
			fieldKey: "middlenameInput",
			elementStates,
		});
	};

	const validateSurname = function () {
		const { surnameInput } = domRefs;
		validateNameField({
			inputElem: surnameInput!,
			fieldKey: "surnameInput",
			elementStates,
		});
	};

	const validateFatherPhone = function () {
		const { fatherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: fatherPhoneInput,
			fieldKey: "fatherPhoneInput",
			elementStates,
		});
	};

	const validateMotherPhone = function () {
		const { motherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: motherPhoneInput,
			fieldKey: "motherPhoneInput",
			elementStates,
		});
	};

	const validateOtherPhone = function () {
		const { otherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: otherPhoneInput,
			fieldKey: "otherPhoneInput",
			elementStates,
		});
	};

	const validateGender = function () {
		validateSelectField({
			selectElem: domRefs.genderSelect!,
			fieldKey: "genderSelect",
			elementStates,
			invalidValue: domStaticValues.chooseGender,
			errorMsg: "Gender is required",
		});
	};
	const validateClass = function () {
		validateSelectField({
			selectElem: domRefs.classSelect!,
			fieldKey: "classSelect",
			elementStates,
			invalidValue: domStaticValues.chooseClass,
			errorMsg: "please select a class ",
		});
	};

	const validateDob = function () {
		const { dobInput } = domRefs;
		const dobValue = dobInput?.value.trim();
		const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dobValue || !dobRegex.test(dobValue)) {
			addElemToDom({
				parentElem: dobInput!.parentElement!,
				typeOfElem: "span",
				textContent: "Please enter a valid date (YYYY-MM-DD)",
				elemAttributes: { class: "text-danger mt-1" },
				pluginFunc: showErrMsg,
			});
			elementStates.dobInput = false;
		} else {
			elementStates.dobInput = true;
		}
	};

	const validateReligion = function () {
		validateSelectField({
			selectElem: domRefs.religionSelect!,
			fieldKey: "religionSelect",
			elementStates,
			invalidValue: domStaticValues.chooseReligion,
			errorMsg: "Religion is required",
		});
	};

	const validateBloodGroup = function () {
		validateSelectField({
			selectElem: domRefs.bloodGroupSelect!,
			fieldKey: "bloodGroupSelect",
			elementStates,
			invalidValue: domStaticValues.chooseBloodGroup,
			errorMsg: "Blood group is required",
		});
	};

	const validateNaijaState = function () {
		const { stateSelect } = domRefs;
		if (!stateSelect) return;

		if (
			!stateSelect.value.trim() ||
			stateSelect.value === domStaticValues.chooseState
		) {
			addElemToDom({
				parentElem: stateSelect.parentElement!,
				typeOfElem: "span",
				textContent: "State is required",
				pluginFunc: showErrMsg,
			});
			elementStates.statesSelect = false;
		} else {
			elementStates.statesSelect = true;
		}
	};

	const getLocalGovts = function () {
		const { stateSelect, lgaSelect } = domRefs;
		if (!stateSelect || !lgaSelect) return;

		const selectedState = stateSelect.value;
		if (!selectedState || selectedState === domStaticValues.chooseState) {
			addElemToDom({
				parentElem: lgaSelect.parentElement!,
				typeOfElem: "span",
				textContent: "Please select a state first",
				pluginFunc: showErrMsg,
			});
			elementStates.lgaSelect = false;
		} else {
			lgaSelect.innerHTML = "";
			addElemToDom({
				parentElem: lgaSelect,
				typeOfElem: "option",
				textContent: "Choose LGA",
				elemAttributes: { value: "chooseLga", disabled: true },
			});

			const lgas = naijaService.getLgasByState(selectedState);
			lgas.forEach(function (lga: string) {
				addElemToDom({
					parentElem: lgaSelect,
					typeOfElem: "option",
					textContent: lga,
					elemAttributes: { value: lga },
				});
			});
			elementStates.lgaSelect = true;
		}
	};

	const validateAddress = function () {
		const { addressInput } = domRefs;
		validateAddressField({
			inputElem: addressInput!,
			fieldKey: "addressInput",
			elementStates,
		});
	};

	// Webcam functionality
	let stream: any = null;
	const startCameranFunc = async function () {
		const {
			video,
			startCameraBtn,
			canvasWrapper,
			cameraHelp,
			stopCameraBtn,
			snapCameraBtn,
			generatedImg,
		} = domRefs;

		try {
			//if the stream is inactive start the webcam
			if (!stream) {
				stream = await navigator.mediaDevices.getUserMedia({ video: true });
				video!.srcObject = stream;
				video?.play();
				canvasWrapper?.classList.remove("d-none");
				cameraHelp?.classList.add("d-none");
				startCameraBtn!.textContent = "retake?";
				generatedImg!.src = "";
				startCameraBtn!.disabled = true;
				stopCameraBtn!.disabled = false;
				snapCameraBtn!.disabled = false;
				console.log("streaming");
			}
		} catch (err) {
			console.log("there was an error:", err);
		}
	};

	const snapPictureFunc = function () {
		const { video, canvas, generatedImg } = domRefs;
		if (stream) {
			const ctx = canvas?.getContext("2d");
			canvas!.width = video?.videoWidth as number;
			canvas!.height = video?.videoHeight as number;
			ctx?.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const convertToImageData = canvas?.toDataURL("image/png");
			generatedImg?.classList.remove("d-none");
			generatedImg!.src = convertToImageData as string;
			canvas?.classList.add("d-none");
			console.log("snapped picture");
			//if no image has been snapped
			if (generatedImg!.src === "") {
				elementStates.webCam = false;
			} else {
				elementStates.webCam = true;
			}
		}
	};

	const stopCameraFunc = function () {
		//if the stream is active
		const { video, snapCameraBtn, stopCameraBtn, startCameraBtn } = domRefs;
		if (stream) {
			stream.getTracks().forEach(function (track: any) {
				track.stop();
			});
			stream = null;
			video?.pause();
			stopCameraBtn!.disabled = true;
			snapCameraBtn!.disabled = true;
			startCameraBtn!.disabled = false;
			console.log("stream stopped!");
		}
	};

	const saveWebCamImageFunc = function () {
		snapPictureFunc();
		stopCameraFunc();
	};

	const inputsWithError = function () {
		const { errorFields } = domRefs;
		const errorsInputs = new Set<string>();

		let inputsObject = elementStates;
		for (let key in inputsObject) {
			let value = inputsObject[key as keyof typeof inputsObject];
			if (value === false) {
				errorsInputs.add(key);
			}
		}
		if (errorsInputs.size > 0) {
			errorFields?.classList.add("red-text");
			errorFields?.classList.remove("d-none");
			errorFields!.textContent = `please fill the following: ${[
				...errorsInputs,
			].join(", ")}`;
		} else {
			errorFields?.classList.add("d-none");
			errorFields!.textContent = "";
		}
	};

	const checkFormValidity = function () {
		const { formSubmitBtn } = domRefs;
		const itContainsFalsy = Object.values(elementStates).includes(false);
		if (!itContainsFalsy) {
			formSubmitBtn!.disabled = false;
		} else {
			formSubmitBtn!.disabled = true;
		}
	};

	const watchForm = function () {
		checkFormValidity();
		inputsWithError();
	};

	const getFormInputs = function () {
		const formData = new FormData();

		formData.append("surname", domRefs.surnameInput!.value.trim());
		formData.append("firstname", domRefs!.firstnameInput!.value.trim());
		formData.append("middlename", domRefs.middlenameInput!.value.trim());
		formData.append("gender", domRefs.genderSelect!.value);
		formData.append("dob", domRefs.dobInput!.value.trim());
		formData.append("state", domRefs.stateSelect!.value);
		formData.append("lga", domRefs.lgaSelect!.value);
		formData.append("bloodGroup", domRefs.bloodGroupSelect!.value);
		formData.append("religion", domRefs.religionSelect!.value);
		formData.append("address", domRefs.addressInput!.value.trim());
		formData.append("fatherPhone", domRefs.fatherPhoneInput!.value.trim());
		formData.append("motherPhone", domRefs.motherPhoneInput!.value.trim());
		formData.append("otherPhone", domRefs.otherPhoneInput!.value.trim());

		// For webcam image (optional, if used)
		if (
			domRefs.generatedImg!.src &&
			domRefs.generatedImg!.src.startsWith("data:image")
		) {
			formData.append("passport", domRefs.generatedImg!.src);
		}

		const formObject = Object.fromEntries(formData.entries());
		return formObject;
	};

	// Store data and add pupil
	const storeData = function () {
		const { selectElem } = domRefs;
		const sessionYear = selectElem?.value.trim();
		if (!sessionYear || sessionYear === domStaticValues.chooseSession) {
			alert("please select a session year");
			console.log("no session year selected");
			return;
		}

		const data = getFormInputs() as {
			surname: string;
			firstname: string;
			dob: string;
			[key: string]: string;
		};

		// sessionModel.addPupil(
		// 	sessionYear,
		// 	"JSS1", // or use dynamic class group
		// 	"Gold", // or use dynamic level
		// 	{
		// 		surname: data.surname,
		// 		firstname: data.firstname,
		// 		dob: data.dob,
		// 	}
		// );
	};

	return {
		DOMDefaultState,
		validateFirstname,
		validateMiddlename,
		validateSurname,
		validateDob,
		validateGender,
		validateBloodGroup,
		validateReligion,
		validateNaijaState,
		validateAddress,
		validateClass,
		validateFatherPhone,
		validateMotherPhone,
		validateOtherPhone,
		getLocalGovts,
		startCameranFunc,
		stopCameraFunc,
		saveWebCamImageFunc,
		getFormInputs,
		watchForm,
		storeData, // Added to return object
	};
})();
console.log("form Methods ran");
/**
 * the plan
 * when the form is filled correctly
 * and the submit button is hit
 * it sends the user to a dashboard page
 * the dashboard page is gotten my first asking the user to select a session year and session class
 * then it adds it to the db
 * then it changes location to the dash board page which has the session year in and the class and the pupils card though brief but a more option can be provide to see everything comprehensively
 */
