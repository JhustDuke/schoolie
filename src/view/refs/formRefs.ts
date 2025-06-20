export const formRefs = {
	// Form elements
	studentForm: document.querySelector<HTMLFormElement>("#studentForm"),

	surnameInput: document.querySelector<HTMLInputElement>("#surnameInput"),

	firstnameInput: document.querySelector<HTMLInputElement>("#firstnameInput"),

	middlenameInput: document.querySelector<HTMLInputElement>("#middlenameInput"),

	genderSelect: document.querySelector<HTMLSelectElement>("#genderSelect"),

	dobInput: document.querySelector<HTMLInputElement>("#dobInput"),

	stateSelect: document.querySelector<HTMLSelectElement>("#stateSelect"),

	classSelect: document.querySelector<HTMLSelectElement>("#classSelect"),

	lgaSelect: document.querySelector<HTMLSelectElement>("#lgaSelect"),

	bloodGroupSelect:
		document.querySelector<HTMLSelectElement>("#bloodGroupSelect"),

	religionSelect: document.querySelector<HTMLSelectElement>("#religionSelect"),

	addressInput: document.querySelector<HTMLTextAreaElement>("#addressInput"),

	fatherPhoneInput:
		document.querySelector<HTMLInputElement>("#fatherPhoneInput"),

	motherPhoneInput:
		document.querySelector<HTMLInputElement>("#motherPhoneInput"),

	otherPhoneInput: document.querySelector<HTMLInputElement>("#otherPhoneInput"),

	errorFields: document.querySelector<HTMLDivElement>("#errorFields"),

	formSubmitBtn: document.querySelector<HTMLButtonElement>("#studentSubmitBtn"),

	//webCam and image
	startCameraBtn: document.querySelector<HTMLButtonElement>("#startCameraBtn"),

	stopCameraBtn: document.querySelector<HTMLButtonElement>("#stopCameraBtn"),

	snapCameraBtn: document.querySelector<HTMLInputElement>("#snapCameraBtn"),

	uploadBtn: document.querySelector<HTMLInputElement>("#uploadBtn"),
	canvasWrapper: document.querySelector<HTMLElement>("#canvasWrapper"),

	canvas: document.querySelector<HTMLCanvasElement>("#canvas"),

	video: document.querySelector<HTMLVideoElement>("#video"),

	cameraHelp: document.querySelector<HTMLSpanElement>("#cameraHelp"),

	generatedImg: document.querySelector<HTMLImageElement>("#generatedImg"),
};
