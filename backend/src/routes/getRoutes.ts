import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import { baseRoute, getAllSession } from "./getHandlers";

export const getRoutes: ServerRoute[] = [baseRoute, getAllSession];
