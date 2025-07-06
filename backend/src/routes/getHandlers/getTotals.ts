import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import joi from "joi";
import { totalStatsModel } from "../../model/totalStatsModel";

const paramSchema = joi.object({
	sessionYear: joi.string().length(9).required(),
});

export const getTotals: ServerRoute = {
	method: "GET",
	path: "/getTotals/{sessionYear}",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
		validate: {
			params: paramSchema,
		},

		handler: async function (req: Request, res: ResponseToolkit) {
			const sessionYear = req.params.sessionYear;
			try {
				const stats = await totalStatsModel(sessionYear);

				return res.response(stats).code(200);
			} catch (err: any) {
				return res
					.response({ message: err.message, outcome: "failed to get totals" })
					.code(400);
			}

			return res.response("testing getTotals").code(200);
		},
	},
};
