"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchoolStats = void 0;
const joi_1 = __importDefault(require("joi"));
const totalStatsModel_1 = require("../../model/totalStatsModel");
const paramValidateSchema = joi_1.default.object({
    sessionYear: joi_1.default.string().length(9).required(),
});
exports.getSchoolStats = {
    method: "GET",
    path: "/getSchoolStats/{sessionYear?}",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
        validate: {
            params: paramValidateSchema,
        },
        handler: async function (req, res) {
            const sessionYear = req.params.sessionYear;
            if (!sessionYear) {
                return res.response("session year is required").code(400);
            }
            try {
                const stats = await (0, totalStatsModel_1.totalStatsModel)(sessionYear);
                return res.response(stats).code(200);
            }
            catch (err) {
                return res
                    .response({ message: err.message, outcome: "failed to get totals" })
                    .code(400);
            }
        },
    },
};
//# sourceMappingURL=getSchoolStats.js.map