import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { getPupilByClassModel } from "../../model";
import { validateFormFields } from "../../utils";

export const getPupilByClass: ServerRoute = {
	method: "POST",
	path: "/getPupil",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
		payload: {
			parse: true,
			allow: ["application/json", "application/x-www-form-urlencoded"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		if (!req.payload) {
			return res
				.response({ message: "urlencoded payload is required" })
				.code(400);
		}
		const { sessionYear, className, gender, firstName, lastName, middleName } =
			<any>req.payload;

		const missingField = validateFormFields({
			sessionYear,
			lastName,
			middleName,
			className,
			gender,
			firstName,
		});
		if (missingField) {
			return res.response({ missingField }).code(400);
		}

		try {
			const result = await getPupilByClassModel({
				lastName,
				middleName,
				sessionYear,
				className,
				gender,
				firstName,
			});

			return res.response({ result }).code(200);
		} catch (err: any) {
			return res.response({ error: err.message }).code(500);
		}
	},
};
