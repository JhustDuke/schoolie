"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionYearTableModel = sessionYearTableModel;
const _1 = require(".");
function sanitizeTableName(name) {
    return name.replace(/[^a-zA-Z0-9_]/g, "_");
}
async function sessionYearTableModel(sessionYear) {
    const tableName = sanitizeTableName(sessionYear);
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS \`${tableName}\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					
      classes JSON NOT NULL,
      total_boys INT DEFAULT 0,
      total_girls INT DEFAULT 0,
      total_pupils INT GENERATED ALWAYS AS(total_boys+ total_girls) STORED ,
      newly_added_pupils JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
    const conn = await _1.appPool.getConnection();
    try {
        await conn.query(createTableSQL);
        console.log(`Table  ${tableName}' created or already exists.`);
    }
    catch (err) {
        console.error("❌ Error creating session year table:", err);
        throw err;
    }
    finally {
        conn.release();
    }
}
//# sourceMappingURL=DBTableModel.js.map