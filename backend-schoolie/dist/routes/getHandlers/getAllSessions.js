"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSession = void 0;
const model_1 = require("../../model");
exports.getAllSession = {
    method: "GET",
    path: "/getAllSessionYears",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
    },
    handler: async function (request, res) {
        try {
            const result = await (0, model_1.getAllSessionModel)();
            return res.response(result);
        }
        catch (err) {
            return res.response({
                err: "the was an error",
                errMsg: err.message,
            });
        }
    },
};
//# sourceMappingURL=getAllSessions.js.map