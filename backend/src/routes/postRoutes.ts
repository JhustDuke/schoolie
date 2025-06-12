import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { createSessionYearTable } from "../model";

export const postRoutes: ServerRoute[] = [
	{
		method: "POST",
		path: "/addSessionYear",
		options: {
			cors: {
				origin: ["*"],
				headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
				additionalHeaders: ["X-Requested-With"],
			},
			payload: {
				parse: true,
				allow: ["application/json", "application/x-www-form-urlencoded"],
			},
		},
		handler: function (request: Request, res: ResponseToolkit) {
			return "test response string";
			// 	const { sessionYear } = <{ sessionYear: string }>request.payload;
			// 	if (!sessionYear) {
			// 		return res.response("Session year is required").code(400);
			// 	}
			// 	return createSessionYearTable(sessionYear)
			// 		.then(function () {
			// 			console.log("session year created in db");
			// 			return res.response({ msg: "session year create" }).code(200);
			// 		})
			// 		.catch(function (err) {
			// 			console.log("the was an error", err.message);
			// 			return res.response({ msg: err.message }).code(400);
			// 		});
			// },
		},
	},
	{
		method: "POST",
		path: "/addSessionYear",
		options: {
			cors: {
				origin: ["*"],
				headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
				additionalHeaders: ["X-Requested-With"],
			},
			payload: {
				parse: true,
				allow: ["application/json", "application/x-www-form-urlencoded"],
			},
		},
		handler: function (request: Request, res: ResponseToolkit) {
			return "test response string";
			// 	const { sessionYear } = <{ sessionYear: string }>request.payload;
			// 	if (!sessionYear) {
			// 		return res.response("Session year is required").code(400);
			// 	}
			// 	return createSessionYearTable(sessionYear)
			// 		.then(function () {
			// 			console.log("session year created in db");
			// 			return res.response({ msg: "session year create" }).code(200);
			// 		})
			// 		.catch(function (err) {
			// 			console.log("the was an error", err.message);
			// 			return res.response({ msg: err.message }).code(400);
			// 		});
			// },
		},
	},
];
