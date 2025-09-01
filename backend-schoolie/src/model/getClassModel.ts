import { sanitizeTableName } from "../utils";
import { appPool } from "./createDBModel";

export const getClassModel = async function (
	sessionYear: string = "3000/3333",
	queriedClass: string,
	pool = appPool
) {
	const conn = await pool.getConnection();
	const table = sanitizeTableName(sessionYear);

	try {
		const query = `SELECT classes FROM \`${table}\` WHERE id = 1`;
		const [rows]: any = await conn.query(query);

		if (!rows.length) {
			throw new Error("no classes found");
		}

		const classes =
			typeof rows[0].classes === "string"
				? JSON.parse(rows[0].classes)
				: rows[0].classes;

		return classes?.[queriedClass] || null;
	} catch (err: any) {
		throw new Error(err.message);
	} finally {
		conn.release();
	}
};
