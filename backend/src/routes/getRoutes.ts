import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { createSessionYearTable } from "../model";

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
		method: "POST",
		path: "/post",
		handler: function (request: Request, res: ResponseToolkit) {
			const { sessionYear } = request.payload as { sessionYear: string };
			if (!sessionYear) {
				return res.response("Session year is required").code(400);
			}

			createSessionYearTable(sessionYear)
				.then(function () {
					return res
						.response(
							`Session year table for ${sessionYear} created successfully`
						)
						.code(201);
				})
				.catch(function (err) {
					console.error("Error creating session year table:", err);
					return res.response("Failed to create session year table").code(500);
				});
		},
	},
];
