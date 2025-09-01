import { appPool } from ".";
import { sanitizeTableName } from "../utils";

/**
 * Retrieves or initializes the total statistics and classes for a session year.
 */
export async function totalStatsModel(
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
				`UPDATE \`${table}\` SET total_boys = ?, total_girls = ?, classes = ? WHERE id = 1`,
				[0, 0, JSON.stringify({})]
			);
			return { total_boys: 0, total_girls: 0, classes: 0 };
		}
		const { total_boys, total_girls, classes } = rows[0];
		const parsedClasses =
			typeof classes === "string" ? JSON.parse(classes) : classes;
		const totalClasses = parsedClasses ? Object.keys(parsedClasses).length : 0;

		return {
			total_boys,
			total_girls,
			classes: totalClasses,
		};
	} catch (error: any) {
		console.error("Error fetching totals:", error.message);
		throw new Error(error.message);
	} finally {
		conn.release();
	}
}
