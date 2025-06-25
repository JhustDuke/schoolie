import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { updatePupilModel } from "../../model";
import { validateFormFields } from "../../utils";

export const updatePupilData: ServerRoute[] = [
	{
		method: "PATCH",
		path: "/updatePupil",
		options: {
			cors: {
				origin: ["*"],
				headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			},
			payload: {
				failAction: "error",
				parse: true,
				allow: ["application/json"],
			},
		},
		handler: async function (req: Request, res: ResponseToolkit) {
			if (!req.payload) {
				return res
					.response({ message: "bad request", reason: "no payload provided" })
					.code(500);
			}
			const { className, sessionYear, firstName, gender, updatedData } = <any>(
				req.payload
			);

			const missingField = validateFormFields({
				className,
				sessionYear,
				firstName,
				gender,
				updatedData,
			});
			if (missingField) {
				return res.response({ missingField }).code(400);
			}

			try {
				const update = await updatePupilModel({
					className,
					sessionYear,
					firstName,
					gender,
					updatedData,
				});
				return res.response({ message: "Update successful", update }).code(200);
			} catch (err: any) {
				return res.response({ error: err.message }).code(500);
			}
		},
	},
];
