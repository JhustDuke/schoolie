"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPupilByClass = void 0;
const model_1 = require("../../model");
exports.getPupilByClass = {
    method: "GET",
    path: "/getPupils",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
    },
    handler: async function (req, res) {
        const { sessionYear, classname } = req.query;
        if (!classname) {
            return res.response({ message: "className is required" }).code(400);
        }
        if (!sessionYear) {
            return res.response({ message: "sessionYear is required" }).code(400);
        }
        try {
            const result = await (0, model_1.getPupilByClassModel)({ sessionYear, classname });
            return res.response({ result }).code(200);
        }
        catch (err) {
            return res.response({ error: err.message }).code(500);
        }
    },
};
//# sourceMappingURL=getPupils.js.map