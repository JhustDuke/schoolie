export const navBarModel = (function () {
	const baseDeleteUrl = "http://localhost:3333/deleteSession";
	const searchUrl = "http://localhost:3333/search?";

	// Build query string from an object
	const buildQuery = function (obj: Record<string, string>) {
		const queryData: string[] = [];
		for (let key in obj) {
			queryData.push(`${key}=${encodeURIComponent(obj[key])}`);
		}
		return queryData.join("&");
	};

	// --- SEARCH MODEL ---
	const searchModel = async function (params: Record<string, string>) {
		try {
			const fullUrl = searchUrl + buildQuery(params);
			const res = await fetch(fullUrl);
			const data = await res.json();

			if (!res.ok) {
				// Show backend-provided response message
				throw new Error(
					data.response || `Request failed with status ${res.status}`
				);
			}

			return data.response.length > 0 ? data.response : null;
		} catch (error: any) {
			console.error("Search Error:", error.message);
			throw error;
		}
	};

	// --- DELETE SINGLE SESSION (REAL) ---
	const deleteSession = async function (sessionYear: string): Promise<any> {
		try {
			if (!sessionYear) throw new Error("No sessionYear provided");

			// Construct URL with path param
			const fullUrl = `${baseDeleteUrl}/${encodeURIComponent(sessionYear)}`;
			const response = await fetch(fullUrl, { method: "DELETE" });

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || `Delete failed with status ${response.status}`
				);
			}

			return `${sessionYear} deleted succesfully`;
		} catch (error: any) {
			console.error("Delete Session Error:", error.message);
			throw error;
		}
	};

	return {
		searchModel,

		deleteSession,
	};
})();
