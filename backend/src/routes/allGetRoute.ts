import { ServerRoute } from "@hapi/hapi";
import {
	baseRoute,
	getAllSession,
	getClass,
	getSchoolStats,
} from "./getHandlers";

export const getRoutes: ServerRoute[] = [
	baseRoute,
	getAllSession,
	getSchoolStats,
	getClass,
];
