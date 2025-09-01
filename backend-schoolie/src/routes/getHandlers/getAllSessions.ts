import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { getAllSessionModel } from "../../model";

export const getAllSession: ServerRoute = {
	method: "GET",
	path: "/getAllSessionYears",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
	},

	handler: async function (request: Request, res: ResponseToolkit) {
		try {
			const result = await getAllSessionModel();
			return res.response(result);
		} catch (err: any) {
			return res.response({
				err: "the was an error",
				errMsg: err.message,
			});
		}
	},
};
