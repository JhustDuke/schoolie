"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appPool = void 0;
exports.initDbModel = initDbModel;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
if (!dbName || !/^[a-zA-Z0-9_]+$/.test(dbName)) {
    throw new Error("❌ Invalid or missing DB_NAME in .env");
}
// This pool connects to the server without a database (for DB creation)
const adminPool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
});
// This pool connects to the specific DB (for app queries)
exports.appPool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
});
async function initDbModel() {
    let conn;
    try {
        conn = await adminPool.getConnection();
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created.`);
    }
    catch (err) {
        const msg = err?.message ||
            err?.sqlMessage ||
            err?.code ||
            "Unknown database error occurred";
        console.error("❌ DB init error:", msg);
        throw new Error(msg);
    }
    finally {
        if (conn)
            conn.release();
    }
}
//# sourceMappingURL=DBinit.js.map