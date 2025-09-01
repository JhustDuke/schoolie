import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";

export const notFoundRoutes: ServerRoute[] = [
	{
		method: "*",
		path: "/{any?}",
		handler: function (request: Request, res: ResponseToolkit) {
			return res.response({ message: "route not found" }).code(404);
		},
	},
];
