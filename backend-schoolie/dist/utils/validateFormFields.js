"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormFields = validateFormFields;
/**
 * Validates required fields in an object.
 * Returns an error message string if any field is empty, otherwise null.
 */
function validateFormFields(fields) {
    for (const [key, value] of Object.entries(fields)) {
        if (!value || (typeof value === "string" && value.trim() === "")) {
            return `${key} cannot be empty`;
        }
    }
    return null;
}
//# sourceMappingURL=validateFormFields.js.map