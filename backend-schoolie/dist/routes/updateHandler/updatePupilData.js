"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePupilData = void 0;
const model_1 = require("../../model");
const utils_1 = require("../../utils");
exports.updatePupilData = [
    {
        method: "PATCH",
        path: "/updatePupil",
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
                    .code(500);
            }
            const { className, sessionYear, firstName, gender, updatedData } = (req.payload);
            const missingField = (0, utils_1.validateFormFields)({
                className,
                sessionYear,
                firstName,
                gender,
                updatedData,
            });
            if (missingField) {
                return res.response({ missingField }).code(400);
            }
            try {
                const update = await (0, model_1.updatePupilModel)({
                    className,
                    sessionYear,
                    firstName,
                    gender,
                    updatedData,
                });
                return res.response({ message: "Update successful", update }).code(200);
            }
            catch (err) {
                return res.response({ error: err.message }).code(500);
            }
        },
    },
];
//# sourceMappingURL=updatePupilData.js.map