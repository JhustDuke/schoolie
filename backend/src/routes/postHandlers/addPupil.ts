import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { addPupilModel } from "../../model";
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
			allow: ["multipart/form-data"],
		},
	},

	handler: async function (req: Request, res: ResponseToolkit) {
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

		// const result = await addPupilModel({
		// 	sessionYear: "3000/3333",
		// 	className: "primary-5",
		// 	gender: genderSelect,
		// 	alias: "diamond",
		// 	pupilPersonalInfo: {
		// 		...requiredFields,
		// 		passport,
		// 	},
		// });

		return res.response({ result: "working" }).code(200);
	},
};

/**
 * Validates required fields in an object.
 * Returns an error message string if any field is empty, otherwise null.
 */
export function validateFormFields(fields: Record<string, any>): string | null {
	for (const [key, value] of Object.entries(fields)) {
		if (!value || (typeof value === "string" && value.trim() === "")) {
			return `${key} cannot be empty`;
		}
	}
	return null;
}
