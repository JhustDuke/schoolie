export const classModel = (function () {
	const baseUrl = "http://localhost:3333";

	// --------------------------
	// REAL ENDPOINTS
	// --------------------------

	/**
	 * Gets overall school stats for the selected session year
	 */
	const getSchoolStats = async function (sessionYear: string): Promise<{
		total_boys: number;
		total_girls: number;
		total_classes: number;
	} | null> {
		try {
			const res = await fetch(`${baseUrl}/getSchoolStats/${sessionYear}`, {
				method: "GET",
			});
			if (!res.ok) throw new Error("failed to fetch resource");
			const final = await res.json();
			return final;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	/**
	 * Fetches class-specific data for a given session year and class name
	 */
	const getClassData = async function (
		sessionYear: string,
		queriedClass: string
	): Promise<any[] | null> {
		const safeYear = sessionYear.replace("/", "-");

		try {
			const getSingleClass = await fetch(
				`${baseUrl}/getClass?sessionYear=${encodeURIComponent(
					safeYear
				)}&queriedClass=${encodeURIComponent(queriedClass)}`
			);
			const result = await getSingleClass.json();
			if (!getSingleClass.ok) throw new Error(result.message);
			return result;
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	/**
	 * Loads all class names for a given session year
	 * (Used to populate tab headers: overview, grade1, grade2, etc.)
	 */
	const loadClasses = async function (sessionYear: string): Promise<string[]> {
		const safeYear = sessionYear.replace("/", "-");
		try {
			const allClassNames = await fetch(
				`${baseUrl}/getClass?sessionYear=${encodeURIComponent(safeYear)}`
			);
			const result = await allClassNames.json();
			if (!allClassNames.ok) throw new Error(result.message);
			return result as string[];
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	/**
	 * Adds a new list of classes to a specific session
	 */
	const addClasses = async function (
		sessionYear: string,
		newClasses: string[]
	): Promise<{ success: boolean; added: string[] | string }> {
		try {
			const response = await fetch(`${baseUrl}/addClasses`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ classes: newClasses, sessionYear }),
			});

			if (!response.ok) {
				console.log("res:", response);
				const errText = await response.text();
				throw new Error(errText || response.statusText);
			}
			return { success: true, added: newClasses.join(",") };
		} catch (err: any) {
			throw err.message;
		}
	};

	// --------------------------
	// MOCK ENDPOINTS
	// --------------------------

	const getSchoolStatsMock = async function (): Promise<{
		total_boys: number;
		total_girls: number;
		total_classes: number;
	}> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve({
					total_boys: 120,
					total_girls: 130,
					total_classes: 6,
				});
			}, 2000);
		});
	};

	const getClassDataMock = async function (
		queriedClass: string
	): Promise<any[]> {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				if (queriedClass === "graded") {
					reject(new Error("class not found"));
				} else {
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
				}
			}, 2000);
		});
	};

	/**
	 * Mock version of loadClasses that returns sample tab headers
	 */
	const loadClassesMock = async function (): Promise<string[]> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve(["overview", "grade1", "grade2", "graded"]);
			}, 2000);
		});
	};

	/**
	 * Mock version of addClasses that simulates adding classes
	 */
	const addClassesMock = async function (
		sessionYear: string,
		newClasses: string[]
	): Promise<{ success: boolean; added: string[] }> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				console.log(
					`[MOCK] Added ${newClasses.length} classes for ${sessionYear}:`,
					newClasses
				);
				resolve({ success: true, added: newClasses });
			}, 2000);
		});
	};

	// --------------------------
	// EXPORTS
	// --------------------------
	return {
		loadClasses,
		loadClassesMock,
		getSchoolStats,
		getSchoolStatsMock,
		getClassData,
		getClassDataMock,
		addClasses,
		addClassesMock,
	};
})();
