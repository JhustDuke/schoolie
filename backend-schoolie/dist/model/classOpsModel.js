"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOpsModel = void 0;
const utils_1 = require("../utils");
const DBinit_1 = require("./DBinit");
const classOpsModel = function () {
    const getSingleClass = async function (sessionYear = "3000/3333", queriedClass, pool = DBinit_1.appPool) {
        const conn = await pool.getConnection();
        const table = (0, utils_1.sanitizeTableName)(sessionYear);
        try {
            const query = `SELECT classes FROM \`${table}\` WHERE id = 1`;
            const [rows] = await conn.query(query);
            if (!rows.length) {
                throw new Error("no classes found");
            }
            const classes = typeof rows[0].classes === "string"
                ? JSON.parse(rows[0].classes)
                : rows[0].classes;
            return classes?.[queriedClass] || null;
        }
        catch (err) {
            throw new Error(err.message);
        }
        finally {
            conn.release();
        }
    };
    const allClassNames = async function (sessionYear = "3000/3333", pool = DBinit_1.appPool) {
        const conn = await pool.getConnection();
        const table = (0, utils_1.sanitizeTableName)(sessionYear);
        try {
            const query = `SELECT classes FROM \`${table}\``;
            const [rows] = await conn.query(query);
            if (!rows.length) {
                return null;
            }
            const classes = typeof rows[0].classes === "string"
                ? JSON.parse(rows[0].classes)
                : rows[0].classes;
            if (Object.keys(classes).length === 0) {
                return null;
            }
            return Object.keys(classes);
        }
        catch (err) {
            throw new Error(err.message);
        }
        finally {
            conn.release();
        }
    };
    const addClasses = async function (newClasses, sessionYear = "3000/3333", pool = DBinit_1.appPool) {
        const conn = await pool.getConnection();
        const table = (0, utils_1.sanitizeTableName)(sessionYear);
        try {
            let currentClasses = await allClassNames(sessionYear, pool);
            // ✅ check for duplicates
            if (Array.isArray(currentClasses)) {
                const { isDuplicate, duplicates } = (0, utils_1.checkDuplicates)(currentClasses, newClasses);
                if (isDuplicate) {
                    throw new Error(`duplicate entries ${duplicates.join(", ")} in ${sessionYear}`);
                }
            }
            const query = `SELECT classes FROM \`${table}\` `;
            let [rows] = await conn.query(query);
            if (!rows.length) {
                const initClassesInDB = JSON.stringify({});
                await conn.query(`INSERT INTO \`${table}\` (CLASSES,TOTAL_BOYS,TOTAL_GIRLS) VALUES (?,?,?)`, [initClassesInDB, 0, 0]);
                const [retryRows] = await conn.query(`SELECT classes FROM \`${table}\``);
                rows = retryRows;
            }
            const classes = typeof rows[0].classes === "string"
                ? JSON.parse(rows[0].classes)
                : rows[0].classes;
            // ✅ Add each new class as an empty object
            for (const cls of newClasses) {
                const normalized = cls.toLowerCase().trim();
                classes[normalized] = { alias: normalized, boys: [], girls: [] };
            }
            // ✅ Update DB
            const updatedClasses = JSON.stringify(classes);
            await conn.query(`UPDATE \`${table}\` SET classes = ?`, [updatedClasses]);
            console.log(`✅ Added classes [${newClasses.join(", ")}] to ${sessionYear}`);
        }
        catch (err) {
            throw Error(err.message || "class registration failed");
        }
        finally {
            conn.release();
        }
    };
    return { getSingleClass, allClassNames, addClasses };
};
exports.classOpsModel = classOpsModel;
//# sourceMappingURL=classOpsModel.js.map