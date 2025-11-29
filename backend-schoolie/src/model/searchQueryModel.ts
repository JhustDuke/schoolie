import { appPool } from "./DBinit";
import { getAllSessionModel } from ".";
import {
	sanitizeTableName,
	processGenderGroup,
	queryInterface,
	filterPupilsBySearchTerms,
} from "../utils";

export const searchQueryModel = async function (
	queryObj: queryInterface,
	pool = appPool
) {
	// --- helper to normalize pupils ---
	const formatPupils = function (allPupils: any[]) {
		return allPupils.map(function (p) {
			const rawPassport: string = p.passport || "";

			const cleanedPassport: string = rawPassport
				.replace(/\\/g, "/")
				.replace("src/uploads/", "uploads/");

			return {
				firstname: p.firstnameInput || p.firstname || null,
				surname: p.surnameInput || p.surname || null,
				dob: p.dobInput || null,
				fatherContact: p.fatherPhoneInput || p.fatherPhone || null,
				passport: cleanedPassport || null,
			};
		});
	};

	// --- Parse query for high/other keys ---
	const HighPriorityKeys = ["classname", "gender", "sessionyear"];
	const queryParser = function () {
		const queryStringKeys = Object.keys(queryObj);
		const highKeys: string[] = [];
		const otherKeys: string[] = [];

		for (let key of queryStringKeys) {
			if (HighPriorityKeys.includes(key.toLowerCase())) {
				highKeys.push(key);
			} else {
				otherKeys.push(key);
			}
		}
		return { highKeys, otherKeys };
	};

	// --- Fetch parsed classes safely ---
	const fetchParsedClassesFromDB = async function (
		tableName: string
	): Promise<{ [key: string]: Record<string, any> }> {
		const conn = await pool.getConnection();
		try {
			const safeTable = sanitizeTableName(tableName);
			const query = `SELECT classes FROM \`${safeTable}\``;
			const [rows]: any = await conn.query(query);
			if (!rows.length || !rows[0].classes) return {};
			return JSON.parse(rows[0].classes);
		} finally {
			conn.release();
		}
	};

	// --- Get all classes across sessions ---
	const getAllSessionsClasses = async function (sessionsArr: any[]) {
		const allClassNames: Array<Record<string, any>> = [];
		const tableWithClasses: string[] = [];

		for await (let sessionYear of sessionsArr) {
			const parsedClassData: any = await fetchParsedClassesFromDB(sessionYear);
			if (Object.keys(parsedClassData).length) {
				allClassNames.push(parsedClassData);
				tableWithClasses.push(sessionYear);
			}
		}
		return { allClassNames, tableWithClasses };
	};

	// --- Extract gender-specific data from a class ---
	const extractClassData = async function (
		tableName: string,
		className: string | null,
		gender: string
	): Promise<{
		allClasses: Record<string, any>;
		genderData: any[];
		classOverview?: any;
	}> {
		const parsed = await fetchParsedClassesFromDB(tableName);
		if (!parsed) throw new Error("invalid SQL result");
		const result: any = {};

		if (className && parsed[className]) {
			result.allClasses = parsed;
			result.classOverview = parsed[className];
			result.genderData = parsed[className][gender] || [];
		}
		return result;
	};

	// --- Various search strategy functions ---
	const execAllCriteriaGivenSearch = async function ({
		tableName,
		className,
		gender,
		queryObj,
		searchTerms,
	}: {
		tableName: string;
		className: string;
		gender: string;
		queryObj: Record<string, any>;
		searchTerms: string[];
	}) {
		const { genderData } = await extractClassData(tableName, className, gender);
		const filteredResult = filterPupilsBySearchTerms(
			genderData,
			queryObj,
			searchTerms
		);
		if (filteredResult.length) return filteredResult;
		throw new Error("no match found");
	};

	const execAllButSessionYearGivenSearch = async function ({
		className,
		gender,
		queryObj,
		searchTerms,
	}: {
		className: string;
		gender: string;
		queryObj: Record<string, any>;
		searchTerms: string[];
	}) {
		const allSessions: string[] = await getAllSessionModel();
		const { tableWithClasses } = await getAllSessionsClasses(allSessions);
		const result: any[] = [];

		for (let tableName of tableWithClasses) {
			const { genderData } = await extractClassData(
				tableName,
				className,
				gender
			);
			const filtered = filterPupilsBySearchTerms(
				genderData,
				queryObj,
				searchTerms
			);
			if (filtered.length) result.push(...filtered);
		}
		if (!result.length) throw new Error("no match found");
		return result;
	};

	const execOnlyClassNameGivenSearch = async function ({
		className,
		gender,
		queryObj,
		searchTerms,
	}: {
		className: string;
		gender: string;
		queryObj: Record<string, any>;
		searchTerms: string[];
	}) {
		const allSessions: string[] = await getAllSessionModel();
		const { tableWithClasses } = await getAllSessionsClasses(allSessions);
		const result: any[] = [];

		for (let tableName of tableWithClasses) {
			const { classOverview } = await extractClassData(
				tableName,
				className,
				gender
			);
			if (!classOverview) continue;
			const boys = classOverview.boys || [];
			const girls = classOverview.girls || [];

			const filteredBoys = filterPupilsBySearchTerms(
				boys,
				queryObj,
				searchTerms
			);
			const filteredGirls = filterPupilsBySearchTerms(
				girls,
				queryObj,
				searchTerms
			);

			if (filteredBoys.length) result.push(...filteredBoys);
			if (filteredGirls.length) result.push(...filteredGirls);
		}
		if (!result.length) throw new Error("no match found across sessions");
		return result;
	};

	const execOnlyGenderGivenSearch = async function ({
		gender,
		queryObj,
		searchTerms,
	}: {
		gender: string;
		queryObj: Record<string, any>;
		searchTerms: string[];
	}) {
		const allSessions: string[] = await getAllSessionModel();
		const { allClassNames } = await getAllSessionsClasses(allSessions);
		const result: any[] = [];

		for (let classEntryObj of allClassNames) {
			for (let singleClassKey in classEntryObj) {
				const singleClass = classEntryObj[singleClassKey];
				const genderArr = singleClass[gender] || [];
				const filtered = filterPupilsBySearchTerms(
					genderArr,
					queryObj,
					searchTerms
				);
				if (filtered.length) result.push(...filtered);
			}
		}
		if (!result.length) throw new Error("no match found across sessions");
		return result;
	};

	const recurseClassSearch = async function (
		queryObj: any,
		searchKeys: string[]
	) {
		const allSessionYears = await getAllSessionModel();
		const { allClassNames } = await getAllSessionsClasses(allSessionYears);
		return searchParsedClassesByGender(allClassNames, queryObj, searchKeys);
	};

	const searchParsedClassesByGender = function (
		classesArr: Record<string, any>[],
		queryObj: Record<string, any>,
		searchKeys: string[]
	) {
		const matchedPupils: any[] = [];
		for (let classEntryObj of classesArr) {
			for (let singleClassKey in classEntryObj) {
				const singleClass = classEntryObj[singleClassKey];
				processGenderGroup(
					singleClass.boys,
					searchKeys,
					queryObj,
					matchedPupils
				);
				processGenderGroup(
					singleClass.girls,
					searchKeys,
					queryObj,
					matchedPupils
				);
			}
		}
		if (!matchedPupils.length) throw new Error("no pupil found");
		return matchedPupils;
	};

	// --- Execute the proper strategy ---
	const execSearchStrategy = async function () {
		const { otherKeys: searchTerms, highKeys: mainFilter } = queryParser();
		const tableName = queryObj.sessionyear
			? sanitizeTableName(queryObj.sessionyear)
			: null;
		const className = queryObj.classname;
		const gender =
			queryObj.gender === "male".toLowerCase().trim() ? "boys" : "girls";

		if (!searchTerms.length && !mainFilter.length)
			throw new Error("no value provided");

		let rawResult: any[] = [];

		if (!mainFilter.length)
			rawResult = await recurseClassSearch(queryObj, searchTerms);
		else if (allCriteriaGiven(queryObj, searchTerms))
			rawResult = await execAllCriteriaGivenSearch({
				tableName: tableName as string,
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		else if (allButSessionYearGiven(queryObj, searchTerms))
			rawResult = await execAllButSessionYearGivenSearch({
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		else if (onlyClassNameGiven(queryObj, searchTerms))
			rawResult = await execOnlyClassNameGivenSearch({
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		else if (onlyGenderGiven(queryObj, searchTerms))
			rawResult = await execOnlyGenderGivenSearch({
				gender,
				queryObj,
				searchTerms,
			});

		// --- always format pupils consistently ---
		return formatPupils(rawResult);
	};

	return await execSearchStrategy();
};

// --- helper functions to determine which criteria exist ---
function allCriteriaGiven(queryObj: queryInterface, searchTerms: string[]) {
	return Boolean(
		queryObj.sessionyear &&
			queryObj.classname &&
			queryObj.gender &&
			searchTerms.length > 0
	);
}
function allButSessionYearGiven(
	queryObj: queryInterface,
	searchTerms: string[]
) {
	return Boolean(
		!queryObj.sessionyear &&
			queryObj.classname &&
			queryObj.gender &&
			searchTerms.length > 0
	);
}
function onlyClassNameGiven(queryObj: queryInterface, searchTerms: string[]) {
	return Boolean(queryObj.classname && searchTerms.length > 0);
}
function onlyGenderGiven(queryObj: queryInterface, searchTerms: string[]) {
	return Boolean(queryObj.gender && searchTerms.length > 0);
}
