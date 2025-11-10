import { sanitizeTableName, checkDuplicates } from "../utils";
import { appPool } from "./DBinit";

export const classOpsModel = function () {
	const getSingleClass = async function (
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

	const allClassNames = async function (
		sessionYear: string = "3000/3333",
		pool = appPool
	): Promise<string[] | null> {
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

			if (Object.keys(classes).length === 0) {
				return null;
			}
			return Object.keys(classes);
		} catch (err: any) {
			throw new Error(err.message);
		} finally {
			conn.release();
		}
	};

	const addClasses = async function (
		newClasses: string[],
		sessionYear: string = "3000/3333",
		pool = appPool
	): Promise<void> {
		const conn = await pool.getConnection();
		const table: string = sanitizeTableName(sessionYear);

		try {
			let currentClasses = await allClassNames(sessionYear, pool);

			// ✅ check for duplicates
			if (Array.isArray(currentClasses)) {
				const { isDuplicate, duplicates } = checkDuplicates(
					currentClasses,
					newClasses
				);
				if (isDuplicate) {
					throw new Error(
						`duplicate entries ${duplicates.join(", ")} in ${sessionYear}`
					);
				}
			}

			const query: string = `SELECT classes FROM \`${table}\` `;
			const [rows]: any[] = await conn.query(query);

			if (!rows.length) {
				throw new Error("database operation error");
			}

			const classes: Record<string, unknown> =
				typeof rows[0].classes === "string"
					? JSON.parse(rows[0].classes)
					: rows[0].classes;

			// ✅ Add each new class as an empty object
			for (const cls of newClasses) {
				const normalized = cls.toLowerCase().trim();
				classes[normalized] = { alias: normalized, boys: [], girls: [] };
			}

			// ✅ Update DB
			const updatedClasses = JSON.stringify(classes);
			await conn.query(`UPDATE \`${table}\` SET classes = ?`, [updatedClasses]);

			console.log(
				`✅ Added classes [${newClasses.join(", ")}] to ${sessionYear}`
			);
		} catch (err: any) {
			throw Error(err.message || "class registration failed");
		} finally {
			conn.release();
		}
	};

	return { getSingleClass, allClassNames, addClasses };
};
