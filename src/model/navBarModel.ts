export const navBarModel = (function () {
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const searchUrl = `${baseUrl}/search?`;

	const buildQuery = function (obj: Record<string, string>) {
		const queryData: string[] = [];
		for (let key in obj) {
			const queryKey = key;
			const queryValue = obj[key];
			queryData.push(`${queryKey}=${encodeURIComponent(queryValue)}`);
		}
		return queryData.join("&");
	};

	const searchModel = async function (params: Record<string, string>) {
		try {
			const fullUrl = searchUrl + buildQuery(params);
			const response = await fetch(fullUrl);

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const data = await response.json();
			return data.length > 0 ? data : "nothing gotten";
		} catch (error: any) {
			console.error(error.message);
			throw error;
		}
	};

	return {
		searchModel,
		buildQuery,
	};
})();
