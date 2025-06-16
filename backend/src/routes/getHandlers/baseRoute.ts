import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";

export const baseRoute: ServerRoute =
	// base route
	{
		method: "GET",
		path: "/",
		handler: function (request: Request, res: ResponseToolkit) {
			return res
				.response("Hello from Hapi + TypeScript! and getRoutes")
				.code(200);
		},
	};
