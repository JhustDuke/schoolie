import { getRoutes } from "./getRoutes";
import { postRoutes } from "./postRoutes";
import { notFoundRoutes } from "./notFound";

export const allRoutes = [...getRoutes, ...postRoutes, ...notFoundRoutes];
