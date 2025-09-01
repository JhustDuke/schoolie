import { appPool } from "./createDBModel";
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
	const HighPriorityKeys = ["classname", "gender", "sessionyear"];

	const queryParser = function () {
		const queryStringKeys = Object.keys(queryObj);
		const highKeys: string[] = [];
		const otherKeys: string[] = [];

		for (let key of queryStringKeys) {
			const lowerCasedKey = key.toLowerCase();
			if (HighPriorityKeys.includes(lowerCasedKey)) {
				highKeys.push(key);
			} else {
				otherKeys.push(key);
			}
		}

		return {
			highKeys,
			otherKeys,
		};
	};

	const fetchParsedClassesFromDB = async function (
		tableName: string
	): Promise<{ [key: string]: Record<string, any> }> {
		const conn = await pool.getConnection();
		try {
			const safeTable = sanitizeTableName(tableName);
			const query = `SELECT classes FROM \`${safeTable}\``;

			const [rows]: any = await conn.query(query);

			if (!rows.length) {
				throw new Error("rows array is empty");
			}
			if (!rows[0].classes) {
				throw new Error(`no classes present in ${rows[0]}`);
			}

			const parsed: { [key: string]: Record<string, any> } = JSON.parse(
				rows[0].classes
			);
			return parsed;
		} catch (err: any) {
			throw new Error(err.message);
		} finally {
			conn.release();
		}
	};

	//gets all the classes PARSED for a specified sessionYear and an additional emptyClasses for debugging purposes
	const getAllSessionsClasses = async function (sessionsArr: any[]): Promise<{
		allClassNames: Array<Record<string, any>>;
		emptyClasses: Array<Record<"_empty", boolean>>;
		tableWithClasses: Array<string>;
	}> {
		const allClassNames: Array<Record<string, any>> = [];
		const emptyClasses: Array<Record<"_empty", boolean>> = [];
		const tableWithClasses: any[] = [];

		for await (let sessionYear of sessionsArr) {
			let parsedClassData: any = await fetchParsedClassesFromDB(sessionYear);

			if (parsedClassData && Object.keys(parsedClassData).length) {
				allClassNames.push(parsedClassData);
				tableWithClasses.push(sessionYear);
			} else {
				emptyClasses.push({ _empty: true });
			}
		}

		return { allClassNames, emptyClasses, tableWithClasses };
	};

	// main function: searches parsed classes by gender
	const searchParsedClassesByGender = function (
		classesArr: Record<string, any>[], // array of class entry objects
		queryObj: Record<string, any>, // query object containing search values
		searchKeys: string[] // list of property names to check
	): any[] {
		// create an empty array to store matched pupils
		const matchedPupils: any[] = [];

		// loop through each class entry object in the array
		for (let classEntryObj of classesArr) {
			// loop through each class key in the current class entry object
			for (let singleClassKey in classEntryObj) {
				// get the class object (e.g., containing boys and girls arrays)
				const singleClass = classEntryObj[singleClassKey];
				// process the boys array for matches
				processGenderGroup(
					singleClass.boys,
					searchKeys,
					queryObj,
					matchedPupils
				);
				// process the girls array for matches
				processGenderGroup(
					singleClass.girls,
					searchKeys,
					queryObj,
					matchedPupils
				);
			}
		}

		// if no pupils were matched, throw an error
		if (!matchedPupils.length) throw new Error("no pupil found");

		// return the matched pupils array
		return matchedPupils;
	};

	const recurseClassSearch = async function (
		queryObj: any, // the object containing search filters
		searchKeys: string[] // keys to check in pupil objects for matching
	) {
		try {
			// retrieve all session years from the database
			const allSessionYears = await getAllSessionModel();

			// retrieve all classes for the retrieved session years you can retrieve empty class too for debegging purposes
			const { allClassNames } = await getAllSessionsClasses(allSessionYears);

			// search parsed classes by gender using provided query and search keys
			const result = searchParsedClassesByGender(
				allClassNames,
				queryObj,
				searchKeys
			);

			// return the search result
			return result;
		} catch (err: any) {
			// if any error occurs, throw it as a new Error with its message
			throw new Error(err.message);
		}
	};

	/**
	 * Parses and validates classes from DB result
	 */
	const extractClassData = async function (
		tableName: string,
		className: string | null,
		gender: string
	): Promise<{
		allClasses: Record<string, any>;
		genderData: any[];
		classOverview?: any;
	}> {
		// Expect: Retrieve parsed class data from DB based on tableName
		const parsed = await fetchParsedClassesFromDB(tableName);

		// Expect: Fail immediately if DB query returned null/undefined
		if (!parsed) {
			throw new Error("invalid SQL result...");
		}

		// Expect: Fail if parsed object exists but contains no class keys
		if (Object.keys(parsed).length === 0) {
			console.warn(tableName, "is empty");
		}
		const result: any = {};

		// Expect: If a className exists in parsed, set class content and gender-specific data
		if (className && parsed[className]) {
			result.allClasses = parsed;
			result.classOverview = parsed[className];
			result.genderData = parsed[className][gender] || [];
		}

		// Expect: Return fully prepared result object with requested data
		return result;
	};

	//exec all data search
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
		const { genderData } = await extractClassData(
			tableName as string,
			className as string,
			gender
		);
		const filteredResult = filterPupilsBySearchTerms(
			genderData,
			queryObj,
			searchTerms
		);
		if (filteredResult.length) {
			return filteredResult;
		} else {
			throw new Error("no match found");
		}
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
		//get all session years,
		const allSessions: string[] = await getAllSessionModel();

		//this gets destructured table thats is not null
		const { tableWithClasses } = await getAllSessionsClasses(allSessions);

		const result: any[] = [];

		for (let tableName of tableWithClasses) {
			//go into all sessionyear based on the supplied classes and extract the needed gender
			const { genderData } = await extractClassData(
				tableName,
				className,
				gender
			);

			//search by that gender
			const filtered = filterPupilsBySearchTerms(
				genderData,
				queryObj,
				searchTerms
			);
			if (Array.isArray(filtered) && filtered.length) {
				result.push(...filtered);
			}
		}
		if (!result.length) {
			throw new Error("no match found");
		}
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
		// get all session years
		const allSessions: string[] = await getAllSessionModel();

		// get only the sessions with classes
		const { tableWithClasses } = await getAllSessionsClasses(allSessions);

		const result: any[] = [];

		for (let tableName of tableWithClasses) {
			// extract class data for the given className in each table
			const { classOverview } = await extractClassData(
				tableName,
				className,
				gender
			);

			if (!classOverview) continue;

			// check both genders explicitly
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
		// get all session years
		const allSessions: string[] = await getAllSessionModel();

		// get only the sessions with classes
		const { allClassNames } = await getAllSessionsClasses(allSessions);

		const result: any[] = [];

		// search across every parsed class object
		for (let classEntryObj of allClassNames) {
			for (let singleClassKey in classEntryObj) {
				const singleClass = classEntryObj[singleClassKey];

				// grab gender array (boys or girls depending on supplied gender)
				const genderArr = singleClass[gender] || [];

				// filter that array using provided search terms
				const filtered = filterPupilsBySearchTerms(
					genderArr,
					queryObj,
					searchTerms
				);

				if (filtered.length) {
					result.push(...filtered);
				}
			}
		}

		if (!result.length) throw new Error("no match found across sessions");

		return result;
	};

	// main function: executes a class data search based on provided query parameters
	const execSearchStrategy = async function () {
		// destructure parsed query into search terms (non-critical keys) and main filter (critical keys)
		const { otherKeys: searchTerms, highKeys: mainFilter } = queryParser();
		// sanitize session year to make a safe table name if provided
		const tableName = queryObj.sessionyear
			? sanitizeTableName(queryObj.sessionyear)
			: null;

		// get the classname from the query object
		const className = queryObj.classname;

		// determine gender key to use ("boys" or "girls") based on query gender
		const gender =
			queryObj.gender === "male".toLowerCase().trim() ? "boys" : "girls";

		// if both search terms and main filter are empty, stop and throw an error
		if (!searchTerms.length && !mainFilter.length)
			throw new Error("no value provided");

		// if no main filter exists, perform a recursive search across all classes/sessions
		if (!mainFilter.length) {
			console.log("recurse search ran");
			return await recurseClassSearch(queryObj, searchTerms);
		}

		//first all criteria is given i.e tablename(sessionYear),classname,gender(gender has a default value so its always given) and searchterm
		if (allCriteriaGiven(queryObj, searchTerms)) {
			console.log("execAllCriteriaGivenSearch ran");
			return await execAllCriteriaGivenSearch({
				tableName: tableName as string,
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		}

		//criteria 2: sessionYear(tableName) is NOT given
		if (allButSessionYearGiven(queryObj, searchTerms)) {
			console.log("allButSessionYearGiven ran");
			return await execAllButSessionYearGivenSearch({
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		}
		//criteria 3:only classname and gender(has default value) and searchterms
		if (onlyClassNameGiven(queryObj, searchTerms)) {
			console.log("onlyClassNameGiven ran");
			return await execOnlyClassNameGivenSearch({
				className: className as string,
				gender,
				queryObj,
				searchTerms,
			});
		}
		//criteria 4:only gender is given
		if (onlyGenderGiven(queryObj, searchTerms)) {
			console.log("onlyGenderGiven ran");
			return await execOnlyGenderGivenSearch({ gender, queryObj, searchTerms });
		}
	};
	return await execSearchStrategy();
};

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
