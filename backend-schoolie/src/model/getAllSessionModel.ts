import { RowDataPacket } from "mysql2";
import { appPool } from "./createDBModel";

export const getAllSessionModel = async function () {
	const dbConnection = await appPool.getConnection();
	try {
		const [rows] = await dbConnection.query("SHOW TABLES");
		const tableNames = (rows as RowDataPacket[]).map(function (row) {
			return Object.values(row)[0];
		});
		return tableNames;
	} catch (err: any) {
		throw new Error(err.message);
	} finally {
		dbConnection.release();
	}
};
