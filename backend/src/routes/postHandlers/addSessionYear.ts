import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { sessionYearTableModel } from "../../model";

export const addSessionYear: ServerRoute = {
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
		const { sessionYear } = <{ sessionYear: string }>request.payload;
		if (!sessionYear) {
			return res.response("Session year is required").code(400);
		}
		return sessionYearTableModel(sessionYear)
			.then(function () {
				console.log("session year created in db");
				return res
					.response({ msg: `session year ${sessionYear} created` })
					.code(200);
			})
			.catch(function (err) {
				console.log("the was an error", err.message);
				return res.response({ msg: err.message }).code(400);
			});
	},
};
