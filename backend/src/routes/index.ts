import { getRoutes } from "./allGetRoute";
import { postRoutes } from "./allPostRoute";
import { notFoundRoutes } from "./notFound";

export const allRoutes = [...getRoutes, ...postRoutes, ...notFoundRoutes];
