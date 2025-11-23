import dotenv from "dotenv";
import Hapi, { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import { allRoutes } from "./routes";
import { initDbModel } from "./model";

dotenv.config();

const port: number = Number(process.env.PORT);
const host: string = process.env.HOST || "localhost";

const server: Server = Hapi.server({ port, host });

async function bootstrap() {
	try {
		// Initialize DB first
		await initDbModel();

		// Register plugins
		await server.register(Inert);

		// Setup routes
		server.route({
			method: "GET",
			path: "/uploads/{param*}",
			handler: {
				directory: { path: "src/uploads", listing: false },
			},
		});

		server.route(allRoutes);

		// Start server
		await server.start();

		const time = new Date();
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
}

bootstrap();
