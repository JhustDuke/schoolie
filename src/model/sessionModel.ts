import { isValidYearFormat } from "../utils";

export const sessionModel = (function (
	databaseName: string = "amenDivineSessions"
) {
	const safeGetStorage = function (key: string) {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Error reading localStorage:", error);
			return null;
		}
	};

	const safeSetStorage = function (key: string, value: object) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.error("Error writing to localStorage:", error);
			return false;
		}
	};

	const initSessions = function () {
		if (!safeGetStorage(databaseName)) {
			safeSetStorage(databaseName, {});
			console.log(databaseName, " inited");
			return;
		}
		console.log("db is already inited");
	};

	const loadSessionYears = function () {
		const sessionDb = safeGetStorage(databaseName);
		if (!sessionDb) {
			console.log("no session years available");
			return null;
		}
		const sessionYears = Object.keys(sessionDb);
		if (sessionYears.length === 0) {
			console.log("no session years available");
			return null;
		}
		return sessionYears;
	};

	const isDuplicate = function (sessionYear: string) {
		const sessionDb = safeGetStorage(databaseName);
		if (!sessionDb) {
			console.log(databaseName, "not found");
			return false;
		}
		if (!sessionDb[sessionYear]) {
			console.log("session does not exist");
			return false;
		}
		return true;
	};

	const addNewSessionYear = function (sessionYear: string) {
		const sessionDb = safeGetStorage(databaseName) || {};
		if (sessionDb[sessionYear]) {
			console.log("Session year already exists");
			return;
		}
		sessionDb[sessionYear] = {
			createdAt: new Date().toISOString(),
			meta: {},
		};
		if (safeSetStorage(databaseName, sessionDb)) {
			console.log("New session year added:", sessionYear);
		}
	};
	const addPupil = function ({
		sessionYear,
		classGroup,
		level,
		pupilData,
	}: {
		sessionYear: string;
		classGroup: string;
		level: string;
		pupilData: Record<string, string>;
	}) {
		const db = safeGetStorage(databaseName) || {};
		const hashId = generateHash(
			pupilData.surname + pupilData.firstname + pupilData.dob
		);

		if (!db[sessionYear]) {
			db[sessionYear] = { classes: {} };
		}

		if (!db[sessionYear].classes[classGroup]) {
			db[sessionYear].classes[classGroup] = {};
		}

		if (!db[sessionYear].classes[classGroup][level]) {
			db[sessionYear].classes[classGroup][level] = { pupils: [] };
		}

		db[sessionYear].classes[classGroup][level].pupils.push({
			idHash: hashId,
			data: pupilData,
		});

		safeSetStorage(databaseName, db);
	};

	const getSessionYearData = function () {};

	initSessions();
	return { loadSessionYears, isDuplicate, addNewSessionYear, addPupil };
})();

function generateHash(input: string) {
	var hash = 0;
	for (var i = 0; i < input.length; i++) {
		hash = (hash * 31 + input.charCodeAt(i)) | 0;
	}
	return "h" + hash.toString(16);
}

// 	};

// 	/** Gets session data if it exists */
// 	const getSessionData = function (sessionYear: string): any {
// 		if (!isSessionYearExist(sessionYear)) {
// 			console.log(`Session year ${sessionYear} does not exist.`);
// 			return null;
// 		}
