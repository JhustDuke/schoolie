import { appPool } from ".";

function sanitizeTableName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, "_");
}

export async function sessionYearTableModel(sessionYear: string) {
	const tableName = sanitizeTableName(sessionYear);

	const createTableSQL = `
    CREATE TABLE IF NOT EXISTS \`${tableName}\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					
      classes JSON NOT NULL,
      total_boys INT DEFAULT 0,
      total_girls INT DEFAULT 0,
      total_pupils INT GENERATED ALWAYS AS(total_boys+total_girls) STORED ,
      newly_added_pupils JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

	const conn = await appPool.getConnection();
	try {
		await conn.query(createTableSQL);
		console.log(`Table  ${tableName}' created or already exists.`);
	} catch (err) {
		console.error("❌ Error creating session year table:", err);
		throw err;
	} finally {
		conn.release();
	}
}
