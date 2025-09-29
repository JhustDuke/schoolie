export const sessionModel = (function () {
	const baseurl = "http://localhost:3333";

	const loadSessionYears = async function (): Promise<string[] | null> {
		try {
			const res = await fetch(`${baseurl}/getAllSessionYears`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("Failed to fetch session years");
				throw new Error("failed to fetch a response");
			}
			const data = await res.json();
			if (!Array.isArray(data)) {
				console.error("Invalid response format");
				throw new Error("invalid response format");
			}
			if (data.length === 0) {
				console.error("data.length===0");
				throw new Error("no session year available");
			}
			console.log("session years loaded");
			return data;
		} catch (err: any) {
			console.error("Error fetching session years:", err);
			throw new Error(err.message);
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
			if (!res.ok) {
				throw new Error("request did not succeed");
			}
			const msg: { msg: string } = await res.json();
			console.log(`session year: ${sessionYear} created`);
			return msg;
		} catch (err: any) {
			console.error("Error adding session year:", err.message);
			throw new Error(JSON.stringify({ msg: "Failed to add session year" }));
		}
	};

	const getSessionStats = async function (sessionYear: string): Promise<{
		total_boys: number;
		total_girls: number;
		total_classes: number;
	} | null> {
		try {
			const res = await fetch(`${baseurl}/getSchoolStats/${sessionYear}`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("failed to fetch resource");
				throw new Error("request did not succeed");
			}
			const final = await res.json();
			return final;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
	return { addNewSessionYear, loadSessionYears, getSessionStats };
})();
