import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { getPupilByClassModel } from "../../model";

export const getPupilByClass: ServerRoute = {
	method: "GET",
	path: "/getPupils",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		const { sessionYear, classname } = req.query as Record<
			string,
			string | undefined
		>;

		if (!classname) {
			return res.response({ message: "className is required" }).code(400);
		}

		if (!sessionYear) {
			return res.response({ message: "sessionYear is required" }).code(400);
		}

		try {
			const result = await getPupilByClassModel({ sessionYear, classname });
			return res.response({ result }).code(200);
		} catch (err: any) {
			return res.response({ error: err.message }).code(500);
		}
	},
};
