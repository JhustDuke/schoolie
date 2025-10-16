import { sanitizeTableName } from "../utils";
import { appPool } from "./createDBModel";

export const getClassModel = function () {
	const getClass = async function (
		sessionYear: string = "3000/3333",
		queriedClass: string,
		pool = appPool
	): Promise<Record<string, unknown> | null> {
		const conn = await pool.getConnection();
		const table: string = sanitizeTableName(sessionYear);

		try {
			const query: string = `SELECT classes FROM \`${table}\` WHERE id = 1`;
			const [rows]: any = await conn.query(query);

			if (!rows.length) {
				throw new Error("no classes found");
			}

			const classes: Record<string, any> =
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

	const getClassKeys = async function (
		sessionYear: string = "3000/3333",
		pool = appPool
	): Promise<string[]> {
		const conn = await pool.getConnection();
		const table: string = sanitizeTableName(sessionYear);

		try {
			const query: string = `SELECT classes FROM \`${table}\` WHERE id = 1`;
			const [rows]: any = await conn.query(query);

			if (!rows.length) {
				throw new Error("no classes found");
			}

			const classes: Record<string, unknown> =
				typeof rows[0].classes === "string"
					? JSON.parse(rows[0].classes)
					: rows[0].classes;

			return Object.keys(classes || {});
		} catch (err: any) {
			throw new Error(err.message);
		} finally {
			conn.release();
		}
	};

	return { getClass, getClassKeys };
};
