"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePupilModel = void 0;
const DBinit_1 = require("./DBinit");
const updatePupilModel = async function ({ className, sessionYear = "3000/3333", firstName, updatedData, gender, }) {
    const conn = await DBinit_1.appPool.getConnection();
    const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");
    try {
        const [rows] = await conn.query(`SELECT classes FROM \`${table}\` WHERE id=1`);
        if (!rows.length)
            throw new Error("Session data not found");
        const parsedJSONClasses = JSON.parse(rows[0].classes || "{}");
        const genderKey = gender === "male" ? "boys" : "girls";
        const pupils = parsedJSONClasses[className.trim().toLowerCase()]?.[genderKey] || [];
        const index = pupils.findIndex((pupil) => pupil.firstnameInput?.toLowerCase().trim() ===
            firstName.toLowerCase().trim());
        if (index === -1) {
            throw new Error(`Pupil with name ${firstName} not found`);
        }
        const allowedFields = Object.keys(pupils[index]);
        for (const field of Object.keys(updatedData)) {
            if (!allowedFields.includes(field)) {
                throw new Error(`${field} is not valid. Allowed fields: ${[
                    ...new Set(allowedFields),
                ].join(", ")}`);
            }
        }
        Object.assign(pupils[index], updatedData);
        const updatedJson = JSON.stringify(parsedJSONClasses);
        await conn.query(`UPDATE \`${table}\` SET classes=? WHERE id=1`, [
            updatedJson,
        ]);
        return pupils[index];
    }
    catch (err) {
        console.log("failed to update");
        throw new Error(err.message);
    }
    finally {
        conn.release();
    }
};
exports.updatePupilModel = updatePupilModel;
//# sourceMappingURL=updatePupilModel.js.map