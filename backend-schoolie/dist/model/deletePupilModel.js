"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePupilModel = void 0;
const DBinit_1 = require("./DBinit");
const deletePupilModel = async function ({ sessionYear = "3000/3333", className, gender, firstName, middleName, surName, }) {
    const conn = await DBinit_1.appPool.getConnection();
    const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");
    try {
        const [rows] = await conn.query(`SELECT classes, total_boys, total_girls FROM \`${table}\` WHERE id=1`);
        if (!rows.length)
            throw new Error("Session not found");
        const parsedClasses = JSON.parse(rows[0].classes || "{}");
        const genderKey = gender === "male" ? "boys" : "girls";
        const pupilArr = parsedClasses[className.toLowerCase()]?.[genderKey];
        let totalBoys = rows[0].total_boys;
        let totalGirls = rows[0].total_girls;
        if (!Array.isArray(pupilArr))
            throw new Error("Class not found");
        const index = pupilArr.findIndex(function (p) {
            return (p.firstnameInput?.toLowerCase().trim() ===
                firstName.toLowerCase().trim() &&
                p.middlenameInput?.toLowerCase().trim() ===
                    middleName.toLowerCase().trim() &&
                p.surnameInput?.toLowerCase().trim() === surName.toLowerCase().trim());
        });
        if (index === -1)
            throw new Error("Pupil not found");
        pupilArr.splice(index, 1);
        if (gender === "female" && totalGirls > 0)
            totalGirls -= 1;
        if (gender === "male" && totalBoys > 0)
            totalBoys -= 1;
        const updated = JSON.stringify(parsedClasses);
        await conn.query(`UPDATE \`${table}\` SET classes=?, total_girls=?, total_boys=? WHERE id=1`, [updated, totalGirls, totalBoys]);
        return {
            success: true,
            message: "Pupil successfully deleted",
        };
    }
    catch (err) {
        throw new Error(err.message);
    }
    finally {
        conn.release();
    }
};
exports.deletePupilModel = deletePupilModel;
//# sourceMappingURL=deletePupilModel.js.map