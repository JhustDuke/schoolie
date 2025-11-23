console.log("RUNNING FILE:", __filename);

import { getRoutes } from "./allGetRoute";
import { postRoutes } from "./allPostRoute";

import { updatePupilData } from "./updateHandler";

import { deletePupil, deleteSession } from "./deleteHandler";

import { notFoundRoutes } from "./notFound";

export const allRoutes = [
	...getRoutes,
	...postRoutes,
	...updatePupilData,
	...deletePupil,
	...deleteSession,
	...notFoundRoutes,
];
