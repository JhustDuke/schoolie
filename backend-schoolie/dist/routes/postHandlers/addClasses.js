"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClasses = void 0;
const model_1 = require("../../model");
const joi_1 = __importDefault(require("joi"));
const validatePayloadSchema = joi_1.default.object({
    classes: joi_1.default.array().required().label("classes"),
    sessionYear: joi_1.default.string().required().label("sessionYear"),
});
exports.addClasses = {
    method: "POST",
    path: "/addClasses",
    options: {
        validate: {
            payload: validatePayloadSchema,
            failAction: (req, resToolkit, err) => resToolkit
                .response({
                message: "session and classes are required",
                expectedFormat: {
                    classes: ["class1", "class2", "classN"],
                    sessionYear: "e.g. '2023/2024'",
                    err: err.details,
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
    handler: async function (req, res) {
        const { classes, sessionYear } = req.payload;
        const newClasses = (0, model_1.classOpsModel)();
        try {
            await newClasses.addClasses(classes, sessionYear);
            return res
                .response({ message: `Added classes: ${classes.join(", ")}` })
                .code(200);
        }
        catch (err) {
            return res.response({ message: err.message }).code(400);
        }
    },
};
//# sourceMappingURL=addClasses.js.map