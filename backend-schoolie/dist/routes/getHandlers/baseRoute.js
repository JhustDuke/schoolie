"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRoute = void 0;
const path_1 = __importDefault(require("path"));
exports.baseRoute = {
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: path_1.default.join(process.cwd(), "dist"),
            index: ["index.html"],
        },
    },
};
//# sourceMappingURL=baseRoute.js.map