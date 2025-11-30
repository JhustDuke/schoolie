"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePupil = void 0;
const model_1 = require("../../model");
const utils_1 = require("../../utils");
exports.deletePupil = [
    {
        method: "DELETE",
        path: "/deletePupil",
        options: {
            cors: {
                origin: ["*"],
                headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            },
            payload: {
                failAction: "error",
                parse: true,
                allow: ["application/json"],
            },
        },
        handler: async function (req, res) {
            if (!req.payload) {
                return res
                    .response({ message: "bad request", reason: "no payload provided" })
                    .code(400);
            }
            const { sessionYear, className, gender, firstName, middleName, surName } = req.payload;
            const missingField = (0, utils_1.validateFormFields)({
                sessionYear,
                className,
                gender,
                firstName,
                middleName,
                surName,
            });
            if (missingField) {
                return res.response({ missingField }).code(400);
            }
            try {
                const result = await (0, model_1.deletePupilModel)({
                    sessionYear,
                    className,
                    gender,
                    firstName,
                    middleName,
                    surName,
                });
                return res.response(result).code(200);
            }
            catch (err) {
                return res.response({ error: err.message }).code(500);
            }
        },
    },
];
//# sourceMappingURL=deletePupil.js.map