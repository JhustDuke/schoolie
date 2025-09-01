/**
 * Sanitizes a table name by replacing invalid characters with underscores.
 */
export function sanitizeTableName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, "_");
}
