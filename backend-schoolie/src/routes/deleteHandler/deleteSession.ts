import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { deleteSessionModel } from "../../model/deleteSessionModel";

console.log("path", __filename);
export const deleteSession: ServerRoute[] = [
	{
		method: "DELETE",
		path: "/deleteSession/{sessionYear?}",
		options: {
			cors: {
				origin: ["*"],
				headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			},
		},
		handler: async function (req: Request, res: ResponseToolkit) {
			const sessionYear = req.params.sessionYear;
			if (!sessionYear) {
				return res
					.response({
						message: "bad request",
						reason: "no sessionYear provided",
					})
					.code(400);
			}

			try {
				const result = await deleteSessionModel({ sessionYear });
				return res.response(result).code(200);
			} catch (err: any) {
				return res.response({ error: err.message }).code(500);
			}
		},
	},
];
