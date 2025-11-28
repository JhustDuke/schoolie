import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import joi from "joi";
import { totalStatsModel } from "../../model/totalStatsModel";

const paramValidateSchema = joi.object({
	sessionYear: joi.string().length(9).required(),
});

export const getSchoolStats: ServerRoute = {
	method: "GET",
	path: "/getSchoolStats/{sessionYear?}",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
		validate: {
			params: paramValidateSchema,
		},

		handler: async function (req: Request, res: ResponseToolkit) {
			const sessionYear = req.params.sessionYear;
			if (!sessionYear) {
				return res.response("session year is required").code(400);
			}

			try {
				const stats = await totalStatsModel(sessionYear);

				return res.response(stats).code(200);
			} catch (err: any) {
				return res
					.response({ message: err.message, outcome: "failed to get totals" })
					.code(400);
			}
		},
	},
};
