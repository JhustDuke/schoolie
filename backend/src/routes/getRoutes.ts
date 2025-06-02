import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";

export const getRoutes: ServerRoute[] = [
	{
		method: "GET",
		path: "/",
		handler: function (request: Request, res: ResponseToolkit) {
			return res
				.response("Hello from Hapi + TypeScript! and getRoutes")
				.code(200);
		},
	},
	{
		method: "*",
		path: "/{any*}",
		handler: function (request: Request, res: ResponseToolkit) {
			return res
				.response({
					statusCode: 404,
					error: "Not Found",
					message: "The requested resource was not found.",
				})
				.code(404);
		},
	},
];
