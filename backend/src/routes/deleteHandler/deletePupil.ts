import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { deletePupilModel } from "../../model";
import { validateFormFields } from "../../utils";

export const deletePupil: ServerRoute[] = [
	{
		method: "DELETE",
		path: "/deletePupil",
		options: {
			payload: {
				parse: true,
				allow: ["application/json"],
			},
		},
		handler: async function (req: Request, res: ResponseToolkit) {
			const { sessionYear, className, firstName, gender } = <any>req.payload;
			const field = { sessionYear, className, firstName, gender };

			const missing = validateFormFields(field);
			if (missing) {
				return res.response(missing).code(400);
			}

			try {
				const result = await deletePupilModel({
					sessionYear,
					className,
					firstName,
					gender,
				});
				return res.response(result).code(200);
			} catch (err: any) {
				return res.response({ error: err.message }).code(500);
			}
		},
	},
];
