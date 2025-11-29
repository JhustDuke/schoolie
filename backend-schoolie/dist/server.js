"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const hapi_1 = __importDefault(require("@hapi/hapi"));
const inert_1 = __importDefault(require("@hapi/inert"));
const routes_1 = require("./routes");
const model_1 = require("./model");
dotenv_1.default.config();
const port = Number(process.env.PORT);
const host = process.env.HOST || "localhost";
const server = hapi_1.default.server({ port, host });
async function bootstrap() {
    try {
        // Initialize DB first
        await (0, model_1.initDbModel)();
        // Register plugins
        await server.register(inert_1.default);
        // Setup routes
        server.route({
            method: "GET",
            path: "/uploads/{param*}",
            handler: {
                directory: { path: "src/uploads", listing: false },
            },
        });
        server.route(routes_1.allRoutes);
        // Start server
        await server.start();
        const time = new Date();
        console.log(`🚀 Server running at: ${server.info.uri} as at ${time.getHours()}:${time.getMinutes()}`);
    }
    catch (err) {
        console.error(err.message);
        console.error(err.stack);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map