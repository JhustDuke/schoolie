import { ServerRoute } from "@hapi/hapi";
import {
	baseRoute,
	getAllSession,
	getClass,
	getSchoolStats,
	searchQuery,
	getPupilByClass,
} from "./getHandlers";

export const getRoutes: ServerRoute[] = [
	baseRoute,
	getAllSession,
	getSchoolStats,
	getClass,
	searchQuery,
	getPupilByClass,
];
