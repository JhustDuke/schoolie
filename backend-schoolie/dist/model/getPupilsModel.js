"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPupilByClassModel = void 0;
const DBinit_1 = require("./DBinit");
const getPupilByClassModel = async function ({ sessionYear = "3000/3333", classname, }) {
    const conn = await DBinit_1.appPool.getConnection();
    const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");
    try {
        const [rows] = await conn.query(`SELECT classes, total_boys, total_girls FROM \`${table}\` `);
        if (!rows.length)
            throw new Error("No data found");
        const { total_boys, total_girls } = rows[0];
        const classData = JSON.parse(rows[0].classes || "{}");
        const classKey = Object.keys(classData).find(function (k) {
            return k.toLowerCase() === classname.toLowerCase();
        });
        if (!classKey)
            throw new Error("Classname does not exist");
        const classEntry = classData[classKey];
        const boys = Array.isArray(classEntry.boys) ? classEntry.boys : [];
        const girls = Array.isArray(classEntry.girls)
            ? classEntry.girls
            : [];
        const allPupils = [...boys, ...girls];
        if (allPupils.length === 0)
            throw new Error("Class is empty");
        const processed = allPupils.map(function (p) {
            const rawPassport = p.passport || "";
            const cleanedPassport = rawPassport
                .replace(/\\/g, "/") // fix Windows paths
                .replace("src/uploads/", "uploads/"); // expose static folder
            return {
                firstname: p.firstnameInput || p.firstname || null,
                surname: p.surnameInput || p.surname || null,
                dob: p.dobInput || null,
                fatherContact: p.fatherPhoneInput || p.fatherPhone || null,
                passport: cleanedPassport
                    ? `${process.env.BASE_URL || "http://localhost:3333"}/${cleanedPassport}`
                    : null,
                totalBoys: total_boys,
                totalGirls: total_girls,
            };
        });
        return processed;
    }
    catch (err) {
        throw new Error(err.message || "Failed to get class data");
    }
    finally {
        conn.release();
    }
};
exports.getPupilByClassModel = getPupilByClassModel;
//# sourceMappingURL=getPupilsModel.js.map