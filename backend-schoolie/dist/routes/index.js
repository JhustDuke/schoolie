"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
console.log("RUNNING FILE:", __filename);
const allGetRoute_1 = require("./allGetRoute");
const allPostRoute_1 = require("./allPostRoute");
const updateHandler_1 = require("./updateHandler");
const deleteHandler_1 = require("./deleteHandler");
const notFound_1 = require("./notFound");
exports.allRoutes = [
    ...allGetRoute_1.getRoutes,
    ...allPostRoute_1.postRoutes,
    ...updateHandler_1.updatePupilData,
    ...deleteHandler_1.deletePupil,
    ...deleteHandler_1.deleteSession,
    ...notFound_1.notFoundRoutes,
];
//# sourceMappingURL=index.js.map