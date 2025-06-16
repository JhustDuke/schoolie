import dotenv from "dotenv";
import Hapi, { Server } from "@hapi/hapi";
import { allRoutes } from "./routes";
import { createDBModel } from "./model";

dotenv.config();

/**things to work on
 * global handler that returns an error page if none is provided
 * handler that makes sure all routes returns something
 */

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
		await createDBModel(); // Ensure the database is created
		await server.start();

		console.log(
			`🚀 Server running at: ${
				server.info.uri
			} as at ${time.getHours()}:${time.getMinutes()}`
		);
	} catch (err) {
		console.error("Server start error:", err);
		process.exit(1);
	}
}

start();
