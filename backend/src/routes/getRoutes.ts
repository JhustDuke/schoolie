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
];
