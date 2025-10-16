import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { getClassModel } from "../../model";
import Joi from "joi";

const validateQuerySchema = Joi.object({
	queriedClass: Joi.string().min(2).label("queriedClass"), // optional now
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
							queriedClass: "e.g. 'basic-1' (optional)",
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
		const queriedClass = <string | undefined>req.query.queriedClass;
		const sessionYear = <string>req.query.sessionYear;

		// destructure methods from the model factory
		const { getClass, getClassKeys } = getClassModel();

		try {
			if (queriedClass) {
				// Scenario 1: specific class requested
				const classStats = await getClass(sessionYear, queriedClass);

				if (!classStats) {
					return res.response({ message: "Class not found" }).code(404);
				}

				return res.response(classStats).code(200);
			} else {
				// Scenario 2: no queriedClass → return all class keys
				const classKeys = await getClassKeys(sessionYear);

				if (!classKeys.length) {
					return res.response({ message: "No classes found" }).code(404);
				}

				return res.response(classKeys).code(200);
			}
		} catch (err: any) {
			return res.response({ message: err.message }).code(500);
		}
	},
};
