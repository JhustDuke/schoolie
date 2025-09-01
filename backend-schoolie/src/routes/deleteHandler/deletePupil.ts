import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { deletePupilModel } from "../../model";
import { validateFormFields } from "../../utils";

export const deletePupil: ServerRoute[] = [
	{
		method: "DELETE",
		path: "/deletePupil",
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
					.code(400);
			}

			const { sessionYear, className, gender, firstName, middleName, surName } =
				<any>req.payload;

			const missingField = validateFormFields({
				sessionYear,
				className,
				gender,
				firstName,
				middleName,
				surName,
			});
			if (missingField) {
				return res.response({ missingField }).code(400);
			}

			try {
				const result = await deletePupilModel({
					sessionYear,
					className,
					gender,
					firstName,
					middleName,
					surName,
				});
				return res.response(result).code(200);
			} catch (err: any) {
				return res.response({ error: err.message }).code(500);
			}
		},
	},
];
