import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { getClassModel } from "../../model";
import joi from "joi";

import Joi from "joi";

const validateQuerySchema = Joi.object({
	queriedClass: Joi.string().required().min(2).label("queriedClass"),
	sessionYear: Joi.string().required().label("sessionYear"),
});

export const getClass: ServerRoute = {
	method: "GET",
	path: "/getClass",
	options: {
		validate: {
			query: validateQuerySchema,
			failAction: function (req, resToolkit, err) {
				return resToolkit
					.response({
						message: "Invalid query format",
						expectedFormat: {
							queriedClass: "e.g. 'jss1'",
							sessionYear: "e.g. '2023/2024'",
							err: (err as any).details,
						},
					})
					.code(400)
					.takeover();
			},
		},
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		const queriedClass = <string>req.query.queriedClass;
		const sessionYear = <string>req.query.sessionYear;

		if (!queriedClass || !sessionYear) {
			return res
				.response({ message: "Missing class or sessionYear" })
				.code(400);
		}

		try {
			const classStats = await getClassModel(sessionYear, queriedClass);

			if (!classStats) {
				return res.response({ message: "Class not found" }).code(404);
			}

			return res.response(JSON.stringify([classStats])).code(200);
		} catch (err: any) {
			return res.response({ message: err.message }).code(500);
		}
	},
};
