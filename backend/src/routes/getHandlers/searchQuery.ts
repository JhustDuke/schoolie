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
			return res.response("no query provided");
		}
		try {
			const test = searchQueryModel(query);
			return res.response(test);
		} catch (err: any) {
			return res.response(err.message);
		}
	},
};
