"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = void 0;
const model_1 = require("../../model");
exports.searchQuery = {
    method: "GET",
    path: "/search",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
        },
    },
    handler: async function (req, res) {
        const query = req.query;
        if (!query) {
            return res
                .response({ status: "fail", response: "no query provided" })
                .code(400);
        }
        try {
            const test = await (0, model_1.searchQueryModel)(query);
            return res.response({ status: "pass", response: test });
        }
        catch (err) {
            return res
                .response({
                status: "fail",
                response: err.message,
                source: JSON.stringify(err.stack),
            })
                .code(400);
        }
    },
};
//# sourceMappingURL=searchQuery.js.map