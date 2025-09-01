/**
 * Validates required fields in an object.
 * Returns an error message string if any field is empty, otherwise null.
 */
export function validateFormFields(fields: Record<string, any>): string | null {
	for (const [key, value] of Object.entries(fields)) {
		if (!value || (typeof value === "string" && value.trim() === "")) {
			return `${key} cannot be empty`;
		}
	}
	return null;
}
