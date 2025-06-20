export interface PupilPersonalInfoInterface {
	firstnameInput: string;
	middlenameInput: string;
	surnameInput: string;
	genderSelect: "male" | "female";
	dobInput: string;
	religionSelect: string;
	bloodGroupSelect: string;
	addressInput: string;
	fatherPhoneInput: string;
	motherPhoneInput: string;
	otherPhoneInput: string;
	lgaSelect: string;
	statesSelect: string;
	classSelect: string;
	passport: string; // base64 image string
}
