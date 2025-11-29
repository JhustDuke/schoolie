"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPupilModel = addPupilModel;
const _1 = require(".");
const utils_1 = require("../utils");
async function addPupilModel({ sessionYear, className, gender, alias = className, pupilPersonalInfo, }) {
    const table = (0, utils_1.sanitizeTableName)(sessionYear);
    // 1. LOAD DB DATA
    const { total_boys, total_girls, classes } = await fetchSessionData(table);
    let newTotalBoys = total_boys;
    let newTotalGirls = total_girls;
    // 2. CLASS MUST ALREADY EXIST
    if (!classes[className]) {
        throw new Error("class does not exist in this session year");
    }
    const genderKey = gender.toLowerCase() === "female" ? "girls" : "boys";
    const pupilList = classes[className][genderKey];
    // 3. DUPLICATE CHECK
    if (!isDuplicatePupil(pupilList, pupilPersonalInfo)) {
        pupilList.push(pupilPersonalInfo);
        // SINGLE SOURCE OF TRUTH FOR INCREMENTS
        if (gender.toLowerCase() === "male")
            newTotalBoys += 1;
        if (gender.toLowerCase() === "female")
            newTotalGirls += 1;
    }
    else {
        throw new Error("duplicate pupil");
    }
    // 4. WRITE BACK
    await updateSessionData(table, JSON.stringify(classes), newTotalBoys, newTotalGirls);
    console.log({ newTotalBoys, newTotalGirls, classes });
    return true;
}
// --- UTIL -------------------------------------------------------------------
function isDuplicatePupil(arr, pupil) {
    return arr.some(function (item) {
        return JSON.stringify(item) === JSON.stringify(pupil);
    });
}
async function fetchSessionData(table) {
    const conn = await _1.appPool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT total_boys, total_girls, classes FROM \`${table}\``);
        if (!rows.length) {
            throw new Error("session year table has no rows");
        }
        return {
            total_boys: Number(rows[0].total_boys),
            total_girls: Number(rows[0].total_girls),
            classes: rows[0].classes ? JSON.parse(rows[0].classes) : {},
        };
    }
    finally {
        conn.release();
    }
}
async function updateSessionData(table, classesJson, total_boys, total_girls) {
    const conn = await _1.appPool.getConnection();
    try {
        await conn.query(`UPDATE \`${table}\` SET classes=?, total_boys=?, total_girls=?`, [classesJson, total_boys, total_girls]);
    }
    finally {
        conn.release();
    }
}
//# sourceMappingURL=addPupilModel.js.map