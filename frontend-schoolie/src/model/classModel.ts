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
	interface classDetailsType {
		firstname?: string | null;
		lastname?: string | null;
		passport?: string | null;
		totalBoys?: string | null;
		totalGirls?: string | null;
	}
	const getClassData = async function (
		sessionYear: string,
		queriedClass: string
	): Promise<classDetailsType[] | null> {
		const safeYear: string = sessionYear.replace("/", "-");

		try {
			const response = await fetch(
				`${baseUrl}/getPupils?sessionYear=${encodeURIComponent(
					safeYear
				)}&classname=${encodeURIComponent(queriedClass)}`
			);

			const body = await response.json();

			if (!response.ok) {
				throw new Error(body.error || "Failed to fetch class data");
			}

			if (!Array.isArray(body.result)) {
				throw new Error("Invalid response format from server");
			}

			return body.result; // ✅ now returns the array
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
			const body = await response.json();

			if (!response.ok) {
				throw new Error(body.message || "class registration failed");
			}
			return { success: true, added: newClasses.join(",") };
		} catch (err: any) {
			throw err;
		}
	};

	return {
		loadClasses,

		getSchoolStats,

		getClassData,

		addClasses,
	};
})();
