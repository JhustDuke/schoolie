import { formMethods } from "../view";
import { resetLgaSelect } from "../utils";
import { formRefs as domElements } from "../view";

export const formController = (function (domRefs = domElements) {
	const {
		firstnameInput,
		middlenameInput,
		surnameInput,
		fatherPhoneInput,
		motherPhoneInput,
		otherPhoneInput,
		lgaSelect,
		stateSelect,
		dobInput,
		genderSelect,
		religionSelect,
		bloodGroupSelect,
		studentForm,
		addressInput,
		startCameraBtn,
		snapCameraBtn,
		stopCameraBtn,
		uploadBtn,
		formSubmitBtn,
	} = domRefs;

	if (window.location.pathname === "/form.html") {
		formMethods.DOMDefaultState();
	}

	//webCam
	startCameraBtn?.addEventListener("click", formMethods.startCameranFunc);

	stopCameraBtn?.addEventListener("click", formMethods.stopCameraFunc);

	//when its input file
	uploadBtn?.addEventListener("input", formMethods.uploadImageFunc);

	snapCameraBtn?.addEventListener("click", formMethods.saveWebCamImageFunc);

	//selects
	lgaSelect?.addEventListener("focusin", formMethods.getLocalGovts);

	//name inputs
	firstnameInput?.addEventListener("input", formMethods.validateFirstname);

	middlenameInput?.addEventListener("input", formMethods.validateMiddlename);

	surnameInput?.addEventListener("input", formMethods.validateSurname);

	//address
	addressInput?.addEventListener("input", formMethods.validateAddress);

	//phonenumber
	fatherPhoneInput?.addEventListener("input", formMethods.validateFatherPhone);

	motherPhoneInput?.addEventListener("input", formMethods.validateMotherPhone);

	otherPhoneInput?.addEventListener("input", formMethods.validateOtherPhone);

	//selects
	dobInput?.addEventListener("change", formMethods.validateDob);

	stateSelect?.addEventListener("change", function () {
		formMethods.validateNaijaState();
		resetLgaSelect(lgaSelect as HTMLSelectElement);
	});

	genderSelect?.addEventListener("change", formMethods.validateGender);

	religionSelect?.addEventListener("change", formMethods.validateReligion);

	bloodGroupSelect?.addEventListener("change", formMethods.validateBloodGroup);

	///button toggler
	formSubmitBtn?.addEventListener("click", formMethods.getFormInputs);

	//watcher
	studentForm?.addEventListener("click", formMethods.watchForm);
	studentForm?.addEventListener("input", formMethods.watchForm);
	studentForm?.addEventListener("change", formMethods.watchForm);
})();
