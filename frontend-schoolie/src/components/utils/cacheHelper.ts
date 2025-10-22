// @utils/cacheHelper.ts
export async function useCache(
	key: string,
	fetcher: () => Promise<any>,
	durationMs: number = 10 * 60 * 1000 // default: 10 min
): Promise<any> {
	const cache = useCacheStore();
	const cached = cache.get(key);
	const currentTimeInMs = Date.now();

	if (cached && currentTimeInMs - cached.timestamp < durationMs) {
		return cached.data;
	}

	try {
		const data = await fetcher();
		cache.set(key, { data, timestamp: currentTimeInMs });
		return data;
	} catch (err) {
		throw err;
	}
}

// simple global cache instance
const cacheStore = new Map<string, { data: any; timestamp: number }>();
function useCacheStore() {
	return cacheStore;
}
