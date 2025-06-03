import dotenv from "dotenv";
import Hapi, { Server } from "@hapi/hapi";
import { allRoutes } from "./routes";
import { createDB } from "./model";

dotenv.config();

const port: number = Number(process.env.PORT);
const host: string = process.env.HOST || "localhost";

const server: Server = Hapi.server({
	port,
	host,
});

server.route(allRoutes);

async function start() {
	const time = new Date();
	// Ensure the database is created before starting the server

	try {
		await createDB(); // Ensure the database is created
		await server.start();
		// Ensure the database is created before starting the server
		console.log(
			`🚀 Server running at: ${
				server.info.uri
			} at ${time.getHours()}:${time.getMinutes()}`
		);
	} catch (err) {
		console.error("Server start error:", err);
		process.exit(1);
	}
}

start();
