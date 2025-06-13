import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { getAllSessionYears } from "../model";
getAllSessionYears;

export const getRoutes: ServerRoute[] = [
	// base route
	{
		method: "GET",
		path: "/",
		handler: function (request: Request, res: ResponseToolkit) {
			return res
				.response("Hello from Hapi + TypeScript! and getRoutes")
				.code(200);
		},
	},

	//getallSessionYears
	{
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
				const result = await getAllSessionYears();
				return res.response(result);
			} catch (err: any) {
				return res.response({
					err: "the was an error",
					errMsg: err.message,
				});
			}
		},
	},
];
