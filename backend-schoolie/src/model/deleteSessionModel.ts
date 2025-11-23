import { appPool } from "./DBinit";

interface DeleteSessionData {
	sessionYear: string;
}

export const deleteSessionModel = async function ({
	sessionYear = "3000/3333",
}: DeleteSessionData) {
	const conn = await appPool.getConnection();
	const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");

	try {
		await conn.query(`DROP TABLE \`${table}\``);

		return {
			success: true,
			message: "Session successfully deleted",
		};
	} catch (err: any) {
		throw new Error(err.message);
	} finally {
		conn.release();
	}
};
