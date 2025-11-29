"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalStatsModel = totalStatsModel;
const _1 = require(".");
const utils_1 = require("../utils");
/**
 * Retrieves or initializes the total statistics and classes for a session year.
 */
async function totalStatsModel(tableSessionYear = "2022/2023", pool = _1.appPool) {
    const conn = await pool.getConnection();
    const table = (0, utils_1.sanitizeTableName)(tableSessionYear);
    try {
        const data = await fetchSessionData(conn, table);
        return data;
    }
    catch (error) {
        console.error("Error fetching totals:", error.message);
        throw new Error(error.message);
    }
    finally {
        conn.release();
    }
}
async function fetchSessionData(conn, table) {
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
//# sourceMappingURL=totalStatsModel.js.map