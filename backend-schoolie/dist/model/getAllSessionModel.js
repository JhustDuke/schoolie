"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSessionModel = void 0;
const DBinit_1 = require("./DBinit");
const getAllSessionModel = async function () {
    const dbConnection = await DBinit_1.appPool.getConnection();
    try {
        const [rows] = await dbConnection.query("SHOW TABLES");
        const tableNames = rows.map(function (row) {
            return Object.values(row)[0];
        });
        return tableNames;
    }
    catch (err) {
        throw new Error(err.message);
    }
    finally {
        dbConnection.release();
    }
};
exports.getAllSessionModel = getAllSessionModel;
//# sourceMappingURL=getAllSessionModel.js.map