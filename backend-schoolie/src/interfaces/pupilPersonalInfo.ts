export interface PupilPersonalInfoInterface {
	firstname: string;
	middlename: string;
	surname: string;
	genderSelect: "male" | "female";
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
	passport: string; // base64 image string
}
