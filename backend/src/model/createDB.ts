import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
console.log(".");
const dbName: string | undefined = process.env.DB_NAME;

if (!dbName || !/^[a-zA-Z0-9_]+$/.test(dbName)) {
	throw new Error("❌ Invalid or missing DB_NAME in .env");
}

export const createDB = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: Number(process.env.DB_PORT),
});

createDB.connect(function (err) {
	if (err) {
		console.error("❌ createDB error:", err.message);
		return;
	}
	console.log("Connected to MySQL");

	const createDBQuery: string = `CREATE DATABASE IF NOT EXISTS \`${dbName}\``;

	createDB.query(createDBQuery, function (err) {
		if (err) {
			console.error(`❌ Query error: ${err.message}`);
		} else {
			console.log(`✅ Database '${dbName}' created`);
		}
		createDB.end();
	});
});
