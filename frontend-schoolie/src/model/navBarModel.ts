export const navBarModel = (function () {
	// Base URL for search requests
	const searchUrl = "http://localhost:3333/search?";

	// Build a query string from an object of key-value pairs
	const buildQuery = function (obj: Record<string, string>) {
		const queryData: string[] = [];
		for (let key in obj) {
			const queryKey = key,
				queryValue = obj[key];
			// Encode values to avoid breaking URL with spaces or special chars
			queryData.push(`${queryKey}=${encodeURIComponent(queryValue)}`);
		}
		const final = queryData.join("&");
		console.log(final, "fi");
		return final;
	};

	// Perform search request using fetch API
	const searchModel = async function (params: Record<string, string>) {
		try {
			// Construct full URL with query string
			const fullUrl = searchUrl + buildQuery(params);

			// Execute GET request
			const response = await fetch(fullUrl);
			console.log(fullUrl, "the url");
			// Check if response is successful
			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			// Parse response as JSON
			const data = await response.json();

			// Return parsed data to caller
			return data.length > 0 ? data : "nothing gotten";
		} catch (error: any) {
			// Log error for debugging
			console.error(error.message);
			// Rethrow so caller can handle it too
			throw error;
		}
	};

	return {
		searchModel,
		buildQuery,
	};
})();
