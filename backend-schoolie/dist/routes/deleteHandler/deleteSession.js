"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = void 0;
const deleteSessionModel_1 = require("../../model/deleteSessionModel");
console.log("path", __filename);
exports.deleteSession = [
    {
        method: "DELETE",
        path: "/deleteSession/{sessionYear?}",
        options: {
            cors: {
                origin: ["*"],
                headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            },
        },
        handler: async function (req, res) {
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
                const result = await (0, deleteSessionModel_1.deleteSessionModel)({ sessionYear });
                return res.response(result).code(200);
            }
            catch (err) {
                return res.response({ error: err.message }).code(500);
            }
        },
    },
];
//# sourceMappingURL=deleteSession.js.map