import { getRoutes } from "./allGetRoute";
import { postRoutes } from "./allPostRoute";
import {updatePupilData}from './updateHandler'
import { notFoundRoutes } from "./notFound";

export const allRoutes = [...getRoutes, ...postRoutes, ...notFoundRoutes,...updatePupilData];
