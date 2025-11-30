"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPupil = void 0;
const model_1 = require("../../model");
const utils_1 = require("../../utils");
exports.addPupil = {
    method: "POST",
    path: "/addPupil",
    options: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
            additionalHeaders: ["X-Requested-With"],
        },
        payload: {
            output: "stream",
            multipart: true,
            parse: true,
            maxBytes: 2 * 1024 * 1024,
            allow: ["application/json", "multipart/form-data"],
        },
    },
    handler: async function (req, res) {
        if (!req.payload)
            return res.response({ message: "payload required" }).code(500);
        const { sessionYear, firstname, middlename, surname, genderSelect, dob, religionSelect, bloodGroupSelect, address, fatherPhone, motherPhone, otherPhone, lgaSelect, statesSelect, classSelect, alias, passport, } = req.payload;
        const requiredFields = {
            firstname,
            middlename,
            surname,
            genderSelect,
            dob,
            religionSelect,
            bloodGroupSelect,
            address,
            fatherPhone,
            motherPhone,
            otherPhone,
            lgaSelect,
            statesSelect,
            classSelect,
            passport,
        };
        const errorMsg = (0, utils_1.validateFormFields)(requiredFields);
        if (errorMsg) {
            return res.response({ message: errorMsg }).code(400);
        }
        try {
            const filepath = await (0, utils_1.handleFileUpload)({
                file: passport,
                imageData: {
                    firstname,
                    lastName: surname,
                    className: classSelect,
                    gender: genderSelect,
                    middleName: middlename,
                },
            });
            const result = await (0, model_1.addPupilModel)({
                sessionYear,
                className: classSelect,
                gender: genderSelect,
                alias,
                pupilPersonalInfo: {
                    ...requiredFields,
                    passport: filepath,
                },
            });
            return res
                .response({ result, message: "upload was succesful" })
                .code(200);
        }
        catch (error) {
            return res
                .response({
                message: error.message || " failed to register in the backend",
            })
                .code(500);
        }
    },
};
//# sourceMappingURL=addPupil.js.map