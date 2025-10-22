// @types/cacheHelper.d.ts

declare module "@utils/cacheHelper" {
	/**
	 * Generic cache utility function.
	 * @param key Unique key identifying cached data (e.g., API endpoint, tab name)
	 * @param fetcher Function that fetches and returns data if cache is invalid or empty
	 * @param durationMs Optional cache lifetime in milliseconds (default: 10 minutes)
	 * @returns Cached or freshly fetched data
	 */
	export function useCache<T>(
		key: string,
		fetcher: () => Promise<T>,
		durationMs?: number
	): Promise<T>;
}
