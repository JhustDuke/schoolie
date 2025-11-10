import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { addPupilModel } from "../../model";
import { validateFormFields, handleFileUpload } from "../../utils";

export const addPupil: ServerRoute = {
	method: "POST",
	path: "/addPupil",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
		payload: {
			output: "stream",
			multipart: true,
			parse: true,
			maxBytes: 2 * 1024 * 1024,
			allow: ["application/json", "multipart/form-data"],
		},
	},

	handler: async function (req: Request, res: ResponseToolkit) {
		if (!req.payload)
			return res.response({ message: "payload required" }).code(500);

		const {
			firstnameInput,
			middlenameInput,
			surnameInput,
			genderSelect,
			dobInput,
			religionSelect,
			bloodGroupSelect,
			addressInput,
			fatherPhoneInput,
			motherPhoneInput,
			otherPhoneInput,
			lgaSelect,
			statesSelect,
			classSelect,
			passport,
		} = <any>req.payload;

		const requiredFields = {
			firstnameInput,
			middlenameInput,
			surnameInput,
			genderSelect,
			dobInput,
			religionSelect,
			bloodGroupSelect,
			addressInput,
			fatherPhoneInput,
			motherPhoneInput,
			otherPhoneInput,
			lgaSelect,
			statesSelect,
			classSelect,
			passport,
		};
		const error = validateFormFields(requiredFields);
		if (error) return res.response({ error }).code(400);

		try {
			const filepath = await handleFileUpload({
				file: passport,
				imageData: {
					firstname: firstnameInput,
					lastName: surnameInput,
					className: classSelect,
					gender: genderSelect,
					middleName: middlenameInput,
				},
			});
			const result = await addPupilModel({
				sessionYear: "3000/3333",
				className: "primary-5",
				gender: genderSelect,
				alias: "diamond",
				pupilPersonalInfo: {
					...requiredFields,
					passport: filepath,
				},
			});
			return res
				.response({ result, message: "upload was succesful" })
				.code(200);
		} catch (error: any) {
			return res.response(error.message).code(500);
		}
	},
};
