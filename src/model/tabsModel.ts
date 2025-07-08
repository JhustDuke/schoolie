export const tabsModel = (function () {
	const baseUrl = "http://localhost:3333";

	const getTotals = async function (sessionYear: string): Promise<{
		total_boys: number;
		total_girls: number;
		classes: number;
	} | null> {
		try {
			const res = await fetch(`${baseUrl}/getTotals/${sessionYear}`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("failed to fetch resource");
				return null;
			}
			const final = await res.json();
			return final;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
	return { getTotals };
})();
