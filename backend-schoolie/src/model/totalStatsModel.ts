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

	try {
		const data = await fetchSessionData(conn, table);
		return data;
	} catch (error: any) {
		console.error("Error fetching totals:", error.message);
		throw new Error(error.message);
	} finally {
		conn.release();
	}
}

async function fetchSessionData(
	conn: any,
	table: string
): Promise<{ total_boys: number; total_girls: number; classes: any }> {
	const [rows]: any = await conn.query(
		`SELECT total_boys, total_girls, classes FROM \`${table}\``
	);

	if (!rows.length) {
		throw new Error("session year table has no rows");
	}

	return {
		total_boys: Number(rows[0].total_boys),
		total_girls: Number(rows[0].total_girls),
		classes: rows[0].classes ? JSON.parse(rows[0].classes) : {},
	};
}
