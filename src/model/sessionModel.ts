export const sessionModel = (function () {
	const API_BASE_URL = "http://localhost:3333";

	const loadSessionYears = async function (): Promise<string[] | null> {
		try {
			const res = await fetch(`${API_BASE_URL}/getAllSessionYears`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("Failed to fetch session years");
				return null;
			}
			const data = await res.json();
			if (!Array.isArray(data)) {
				console.error("Invalid response format");
				return null;
			}
			if (data.length === 0) {
				console.error("no session years available in db");
				return null;
			}
			console.log("session years loaded");
			return data;
		} catch (err) {
			console.error("Error fetching session years:", err);
			return null;
		}
	};

	const getTotals = async function () {
		try {
			const res = await fetch(`${API_BASE_URL}/getTotals/3000_3333`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("failed to fetch resource");
				return null;
			}
			console.log(await res.json());
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const addNewSessionYear = async function (sessionYear: string) {
		try {
			const res = await fetch(`${API_BASE_URL}/addSessionYear`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sessionYear }),
			});
			const msg = await res.json();
			console.log(`session year: ${sessionYear} created`);
		} catch (err) {
			console.error("Error adding session year:", err);
		}
	};

	return { addNewSessionYear, loadSessionYears, getTotals };
})();
