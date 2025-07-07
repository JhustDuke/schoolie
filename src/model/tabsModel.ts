export const tabsModel = (function () {
	const baseurl = "http://localhost:3333";

	const getTotals = async function (sessionYear: string) {
		try {
			const res = await fetch(`${baseurl}/getTotals/${sessionYear}`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("failed to fetch resource");
				return null;
			}
			console.log(await res.json());
		} catch (err: any) {
			console.error(err.message);
			return null;
		}
	};
	return { getTotals };
})();
