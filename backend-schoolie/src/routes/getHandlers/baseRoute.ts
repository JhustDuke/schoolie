import { ServerRoute } from "@hapi/hapi";
import path from "path";

export const baseRoute: ServerRoute = {
	method: "GET",
	path: "/{param*}",
	handler: {
		directory: {
			path: path.join(process.cwd(), "dist"),
			index: ["index.html"],
		},
	},
};
