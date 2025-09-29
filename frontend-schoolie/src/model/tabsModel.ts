export const tabsModel = (function () {
	const baseUrl = "http://localhost:3333";

	const getSchoolStats = async function (sessionYear: string): Promise<{
		total_boys: number;
		total_girls: number;
		total_classes: number;
	} | null> {
		try {
			const res = await fetch(`${baseUrl}/getSchoolStats/${sessionYear}`, {
				method: "GET",
			});
			if (!res.ok) {
				console.error("failed to fetch resource");
				throw new Error("failed to fetch resource");
			}
			const final = await res.json();
			return final;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	const getClassData = async function (
		sessionYear: string,
		queriedClass: string
	): Promise<any[] | null> {
		const safeYear = sessionYear.replace("/", "-");

		try {
			const res = await fetch(
				`${baseUrl}/getClass?sessionYear=${encodeURIComponent(
					safeYear
				)}&queriedClass=${encodeURIComponent(queriedClass)}`
			);
			const result = await res.json();
			console.log(result);

			if (!res.ok) {
				throw new Error(result.message);
			}

			return result;
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	const loadClasses = async function (): Promise<string[]> {
		try {
			return [];
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	return { loadClasses, getSchoolStats, getClassData };
})();
