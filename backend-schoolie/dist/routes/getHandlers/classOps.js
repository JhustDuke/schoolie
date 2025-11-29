"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClass = void 0;
const model_1 = require("../../model");
const joi_1 = __importDefault(require("joi"));
const validateQuerySchema = joi_1.default.object({
    queriedClass: joi_1.default.string().min(2).label("queriedClass"), // optional now
    sessionYear: joi_1.default.string().required().label("sessionYear"),
});
exports.getClass = {
    method: "GET",
    path: "/getClass",
    options: {
        validate: {
            query: validateQuerySchema,
            failAction: function (req, resToolkit, err) {
                return resToolkit
                    .response({
                    message: "Invalid query format",
                    expectedFormat: {
                        queriedClass: "e.g. 'basic-1' (optional)",
                        sessionYear: "e.g. '2023/2024'",
                        err: err.details,
                    },
                })
                    .code(400)
                    .takeover();
            },
        },
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
    },
    handler: async function (req, res) {
        const queriedClass = req.query.queriedClass;
        const sessionYear = req.query.sessionYear;
        // destructure methods from the model factory
        const { getSingleClass, allClassNames } = (0, model_1.classOpsModel)();
        try {
            if (queriedClass) {
                // Scenario 1: specific class requested
                const classStats = await getSingleClass(sessionYear, queriedClass);
                if (!classStats) {
                    return res.response({ message: "Class not found" }).code(404);
                }
                return res.response(classStats).code(200);
            }
            else {
                // Scenario 2: no queriedClass → return all class keys
                const classKeys = await allClassNames(sessionYear);
                if (!classKeys?.length) {
                    return res.response({ message: "No classes found" }).code(404);
                }
                return res.response(classKeys).code(200);
            }
        }
        catch (err) {
            return res.response({ message: err.message }).code(500);
        }
    },
};
//# sourceMappingURL=classOps.js.map