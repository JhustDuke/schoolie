import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { classOpsModel } from "../../model";
import Joi from "joi";

const validatePayloadSchema = Joi.object({
	classes: Joi.array().required().label("classes"),
	sessionYear: Joi.string().required().label("sessionYear"),
});

export const addClasses: ServerRoute = {
	method: "POST",
	path: "/addClasses",
	options: {
		validate: {
			payload: validatePayloadSchema,
			failAction: (req, resToolkit, err) =>
				resToolkit
					.response({
						message: "session and classes are required",
						expectedFormat: {
							classes: ["class1", "class2", "classN"],
							sessionYear: "e.g. '2023/2024'",
							err: (err as any).details,
						},
					})
					.code(400)
					.takeover(),
		},

		payload: {
			output: "data",
			parse: true,
			allow: ["application/json", "application/x-www-form-urlencoded"],
		},
		cors: {
			origin: ["*"],
			headers: ["Content-Type", "Accept", "Access-Control-Allow-Origin"],
			additionalHeaders: ["X-Requested-With"],
		},
	},
	handler: async function (req: Request, res: ResponseToolkit) {
		const { classes, sessionYear } = req.payload as {
			classes: string[];
			sessionYear: string;
		};

		const newClasses = classOpsModel();

		try {
			await newClasses.addClasses(classes, sessionYear);

			return res
				.response({ message: `Added classes: ${classes.join(", ")}` })
				.code(200);
		} catch (err: any) {
			return res.response({ message: err.message }).code(400);
		}
	},
};
