export const sessionModel = (function () {
	const baseurl = "http://localhost:3333";

	const loadSessionYears = async function (): Promise<string[] | null> {
		try {
			const res = await fetch(`${baseurl}/getAllSessionYears`, {
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

	const addNewSessionYear = async function (
		sessionYear: string
	): Promise<{ msg: string }> {
		try {
			const res = await fetch(`${baseurl}/addSessionYear`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sessionYear }),
			});
			const msg: { msg: string } = await res.json();
			console.log(`session year: ${sessionYear} created`);
			return msg;
		} catch (err: any) {
			console.error("Error adding session year:", err.message);
			return { msg: "Failed to add session year" };
		}
	};

	return { addNewSessionYear, loadSessionYears };
})();
