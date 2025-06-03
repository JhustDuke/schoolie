import mysql from "mysql2/promise"; // use promise wrapper
import dotenv from "dotenv";

dotenv.config();

const dbName: string | undefined = process.env.DB_NAME;

if (!dbName || !/^[a-zA-Z0-9_]+$/.test(dbName)) {
	throw new Error("❌ Invalid or missing DB_NAME in .env");
}

export async function createDB() {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		port: Number(process.env.DB_PORT),
	});

	try {
		await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
		console.log(`✅ Database '${dbName}' created.`);
	} catch (err) {
		console.error("❌ Error creating or initing database:", err);
		throw err; // Re-throw the error to handle it in the calling function
	}

	await connection.end();
	console.log("✅ Database connection closed.");
}
