"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalStats = getTotalStats;
const model_1 = require("../model");
const _1 = require(".");
/**
 * Retrieves or initializes the total statistics and classes for a session year.
 */
async function getTotalStats(tableSessionYear = "2022/2023", pool = model_1.appPool) {
    const conn = await pool.getConnection();
    const table = (0, _1.sanitizeTableName)(tableSessionYear);
    const query = `SELECT total_boys, total_girls, classes FROM \`${table}\` `;
    try {
        const [rows] = await conn.query(query);
        if (rows.length === 0) {
            console.log("emptyyy");
            await conn.query(`UPDATE \`${table}\` SET classes=?,total_boys=?, total_girls=? `, [JSON.stringify({}), 0, 0]);
            return { total_boys: 0, total_girls: 0, classes: {} };
        }
        const { total_boys, total_girls, classes } = rows[0];
        return {
            total_boys,
            total_girls,
            classes: classes ? JSON.parse(classes) : {},
        };
    }
    catch (error) {
        console.error("Error fetching totals:", error.message);
        throw new Error(error.message);
    }
    finally {
        conn.release();
    }
}
//# sourceMappingURL=getTotalStats.js.map