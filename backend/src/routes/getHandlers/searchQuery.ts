import { Request, ServerRoute, ResponseToolkit } from "@hapi/hapi";
import { searchQueryModel } from "../../model";

export const searchQuery: ServerRoute = {
	method: "GET",
	path: "/search",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		const query = req.query;

		if (!query) {
			return res
				.response({ status: "fail", response: "no query provided" })
				.code(400);
		}
		try {
			const test = await searchQueryModel(query);
			return res.response({ status: "pass", response: test });
		} catch (err: any) {
			return res
				.response({
					status: "fail",
					response: err.message,
					source: JSON.stringify(err.stack),
				})
				.code(400);
		}
	},
};
