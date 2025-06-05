import { getRoutes } from "./getRoutes";
import { postRoutes } from "./postRoutes";

export const allRoutes = [...getRoutes, ...postRoutes];
