"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRoutes = void 0;
exports.notFoundRoutes = [
    {
        method: "*",
        path: "/{any?}",
        handler: function (request, res) {
            return res
                .response({
                message: `path '${request.path}'  not found`,
            })
                .code(404);
        },
    },
];
//# sourceMappingURL=notFound.js.map