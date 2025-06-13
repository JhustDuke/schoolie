import { RowDataPacket } from "mysql2";
import { appPool } from "./createDB";

export const getAllSessionYears = async function () {
	const dbConnection = await appPool.getConnection();
	try {
		const [rows] = await dbConnection.query("SHOW TABLES");
		const tableNames = (rows as RowDataPacket[]).map(function (row) {
			return Object.values(row)[0];
		});
		return tableNames;
	} catch (err: any) {
		console.log(err);
		return {
			status: "there was an error",
			errorMsg: err.message,
		};
	} finally {
		dbConnection.release();
	}
};
