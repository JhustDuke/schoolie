"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeTableName = sanitizeTableName;
/**
 * Sanitizes a table name by replacing invalid characters with underscores.
 */
function sanitizeTableName(name) {
    return name.replace(/[^a-zA-Z0-9_]/g, "_");
}
//# sourceMappingURL=sanitizeTableYear.js.map