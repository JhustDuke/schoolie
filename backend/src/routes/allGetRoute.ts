import { ServerRoute } from "@hapi/hapi";
import { baseRoute, getAllSession, getTotals } from "./getHandlers";

export const getRoutes: ServerRoute[] = [baseRoute, getAllSession, getTotals];
