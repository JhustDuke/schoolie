import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import { addPupilModel } from "../../model";
export const addPupil: ServerRoute = {
	method: "POST",
	path: "/addPupil",
	options: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
		payload: {
			output: "stream",
			multipart: true,
			parse: true,
			maxBytes: 2 * 1024 * 1024,
			allow: ["multipart/form-data"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		return await addPupilModel({
			sessionYear: "2222/2222",
			className: "test",
			gender: "male",
			pupil: {},
		})
			.then(function (queryOutcome) {
				return res.response(queryOutcome).code(200);
			})
			.catch(function (error) {
				return res.response(error).code(400);
			});
	},
};
