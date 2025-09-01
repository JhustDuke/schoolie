import { appPool } from "../model";
import { sanitizeTableName } from ".";

/**
 * Retrieves or initializes the total statistics and classes for a session year.
 */
export async function getTotalStats(
	tableSessionYear = "2022/2023",
	pool = appPool
): Promise<{ total_boys: number; total_girls: number; classes: any }> {
	const conn = await pool.getConnection();
	const table = sanitizeTableName(tableSessionYear);
	const query = `SELECT total_boys, total_girls, classes FROM \`${table}\` WHERE id=1`;

	try {
		const [rows]: any = await conn.query(query);
		if (rows.length === 0) {
			await conn.query(
				`INSERT INTO \`${table}\` (id, total_boys, total_girls, classes) VALUES (1, 0, 0, '{}')`
			);
			return { total_boys: 0, total_girls: 0, classes: {} };
		}
		const { total_boys, total_girls, classes } = rows[0];
		return {
			total_boys,
			total_girls,
			classes: classes ? JSON.parse(classes) : {},
		};
	} catch (error: any) {
		console.error("Error fetching totals:", error.message);
		throw new Error("Could not retrieve total stats");
	} finally {
		conn.release();
	}
}
