import dotenv from "dotenv";
import Hapi, { Server } from "@hapi/hapi";
import { allRoutes } from "./routes";
import { initDbModel } from "./model";

dotenv.config();

const port: number = Number(process.env.PORT);
const host: string = process.env.HOST || "localhost";

const server: Server = Hapi.server({
	port,
	host,
});

server.route(allRoutes);

(async function start() {
	const time = new Date();
	// Ensure the database is created before starting the server
	try {
		// Ensure the database is created

		await Promise.all([initDbModel(), server.start()]);

		console.log(
			`🚀 Server running at: ${
				server.info.uri
			} as at ${time.getHours()}:${time.getMinutes()}`
		);
	} catch (err: any) {
		console.error(err.message);
		console.error(err.stack);
		process.exit(1);
	}
})();
