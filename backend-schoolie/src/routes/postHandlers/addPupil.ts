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
			sessionYear,
			firstname,
			middlename,
			surname,
			genderSelect,
			dob,
			religionSelect,
			bloodGroupSelect,
			address,
			fatherPhone,
			motherPhone,
			otherPhone,
			lgaSelect,
			statesSelect,
			classSelect,
			alias,
			passport,
		} = <any>req.payload;

		const requiredFields = {
			firstname,
			middlename,
			surname,
			genderSelect,
			dob,
			religionSelect,
			bloodGroupSelect,
			address,
			fatherPhone,
			motherPhone,
			otherPhone,
			lgaSelect,
			statesSelect,
			classSelect,
			passport,
		};
		const errorMsg = validateFormFields(requiredFields);

		if (errorMsg) {
			return res.response({ message: errorMsg }).code(400);
		}

		try {
			const filepath = await handleFileUpload({
				file: passport,
				imageData: {
					firstname,
					lastName: surname,
					className: classSelect,
					gender: genderSelect,
					middleName: middlename,
				},
			});
			const result = await addPupilModel({
				sessionYear,
				className: classSelect,
				gender: genderSelect,
				alias,
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
