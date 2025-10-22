export const tabsModel = (function () {
	const baseUrl = "http://localhost:3333";

	/** Real API: get overall stats */
	const getSchoolStats = async function (sessionYear: string) {
		const res = await fetch(`${baseUrl}/getSchoolStats/${sessionYear}`);
		if (!res.ok) throw new Error("Failed to fetch resource");
		return await res.json();
	};

	/** Real API: get class details */
	const getClassData = async function (
		sessionYear: string,
		queriedClass: string
	) {
		const safeYear = sessionYear.replace("/", "-");
		const res = await fetch(
			`${baseUrl}/getClass?sessionYear=${encodeURIComponent(
				safeYear
			)}&queriedClass=${encodeURIComponent(queriedClass)}`
		);
		if (!res.ok) throw new Error("Failed to fetch resource");
		return await res.json();
	};

	/** Real API: load available classes (used for tab headers) */
	const loadClasses = async function (sessionYear: string): Promise<string[]> {
		const safeYear = sessionYear.replace("/", "-");
		const res = await fetch(
			`${baseUrl}/getClass?sessionYear=${encodeURIComponent(safeYear)}`
		);
		if (!res.ok) throw new Error("Failed to fetch classes");
		return await res.json();
	};

	// ---------------- MOCKS ----------------

	/** Mock: load all available classes (for tabs) */
	const loadClassesMock = async function (): Promise<string[]> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve(["overview", "grade1", "grade2", "grade3", "graded"]);
			}, 2000);
		});
	};

	/** Mock: fetch overview stats */
	const getSchoolStatsMock = async function (): Promise<{
		total_boys: number;
		total_girls: number;
		total_classes: number;
	}> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve({
					total_boys: 58,
					total_girls: 64,
					total_classes: 12,
				});
			}, 2000);
		});
	};

	/** Mock: fetch specific class data */
	const getClassDataMock = async function (
		queriedClass: string
	): Promise<any[]> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve([
					{
						name: "Aisha Bello",
						className: queriedClass,
						parentPhone: "08012345678",
					},
					{
						name: "John Doe",
						className: queriedClass,
						parentPhone: "08087654321",
					},
				]);
			}, 2000);
		});
	};

	return {
		loadClasses,
		loadClassesMock,
		getSchoolStats,
		getSchoolStatsMock,
		getClassData,
		getClassDataMock,
	};
})();
