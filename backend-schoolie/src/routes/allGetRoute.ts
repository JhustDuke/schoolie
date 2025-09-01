import { ServerRoute } from "@hapi/hapi";
import {
	baseRoute,
	getAllSession,
	getClass,
	getSchoolStats,
	searchQuery,
} from "./getHandlers";

export const getRoutes: ServerRoute[] = [
	baseRoute,
	getAllSession,
	getSchoolStats,
	getClass,
	searchQuery,
];
