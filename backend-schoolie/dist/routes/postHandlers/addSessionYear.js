"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSessionYear = void 0;
const model_1 = require("../../model");
exports.addSessionYear = {
    method: "POST",
    path: "/addSessionYear",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
        payload: {
            parse: true,
            allow: ["application/json", "application/x-www-form-urlencoded"],
        },
    },
    handler: function (req, res) {
        if (!req.payload) {
            return res
                .response({ message: "urlencoded paylod is required" })
                .code(400);
        }
        const { sessionYear } = req.payload;
        if (!sessionYear) {
            return res.response("Session year is required").code(400);
        }
        return (0, model_1.sessionYearTableModel)(sessionYear)
            .then(function () {
            console.log("session year created in db");
            return res
                .response({ msg: `session year ${sessionYear} created` })
                .code(200);
        })
            .catch(function (err) {
            console.log("the was an error", err.message);
            return res.response({ msg: err.message }).code(400);
        });
    },
};
//# sourceMappingURL=addSessionYear.js.map