"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionModel = void 0;
const DBinit_1 = require("./DBinit");
const deleteSessionModel = async function ({ sessionYear = "3000/3333", }) {
    const conn = await DBinit_1.appPool.getConnection();
    const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");
    try {
        await conn.query(`DROP TABLE \`${table}\``);
        return {
            success: true,
            message: "Session successfully deleted",
        };
    }
    catch (err) {
        throw new Error(err.message);
    }
    finally {
        conn.release();
    }
};
exports.deleteSessionModel = deleteSessionModel;
//# sourceMappingURL=deleteSessionModel.js.map