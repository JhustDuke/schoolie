import Hapi, { Server, Request, ResponseToolkit } from "@hapi/hapi";
import dotenv from "dotenv";

dotenv.config();

const port: number = Number(process.env.PORT) || 3333;

const server: Server = Hapi.server({
	port,
	host: "localhost",
});

server.route({
	method: "GET",
	path: "/",
	handler(req: Request, h: ResponseToolkit) {
		return "Hello from Hapi + TypeScript!";
	},
});

async function start(): Promise<void> {
	try {
		await server.start();
		console.log(`🚀 Server running at: ${server.info.uri}`);
	} catch (err) {
		console.error("Server start error:", err);
		process.exit(1);
	}
}

start();
