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
		path: "/{any?}",
		handler: function (request: Request, res: ResponseToolkit) {
			return res.response("the requested route was not found").code(404);
		},
	},
];
function sanitizeTableName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, "_");
}
