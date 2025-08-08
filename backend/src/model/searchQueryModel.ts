import { appPool } from "./createDBModel";
import { getAllSessionModel } from "./";
import { sanitizeTableName } from "../utils";
import { all } from "axios";

interface queryInterface {
	sessionyear?: string | null;
	classname?: string | null;
	classes?: string | null;
	gender?: string | null;
	[key: string]: string | null | undefined;
}

/**
 * it will check wether a priority key is present
 * if it is it keeps aside for querying the db
 * if its not it queries all entries in the db recursively and stores the gotten data in an object
 * if a session no className obj it skips it and goes to the next one
 * 
 * the plan get check query from the url query
 * if it
 * has the priority keys
 * 
 * TODO WHEN BACK FROM IMSU
 * EXECUTE THE GOTTEN QUERY IN A KNOWN SESSIONYEAR TABLE
 * GET ALL SESSIONS FROM GETALLSESSIONSMODEL
 * CREATE A RECURSION FOR WHEN HIGHPRIORITY KEYS ARE NOT PROVIDED

 */

export const searchQueryModel = async function (
	queryObj: queryInterface,
	pool = appPool
) {
	const HighPriorityKeys = ["classname", "gender", "sessionyear"];

	const queryParser = function (): any {
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

	/**
	 * Filters pupils based on search terms from the queryObj
	 */
	const filterPupilsBySearchTerms = function (
		pupilsData: any[],
		queryObj: queryInterface,
		searchTerms: string[]
	): any[] {
		const match: any[] = [];

		for (let i = 0; i < pupilsData.length; i++) {
			const pupil = pupilsData[i];
			let isMatch = true;

			for (const term of searchTerms) {
				if (!(term in queryObj)) continue;

				const queryVal = queryObj[term]?.toLowerCase();
				const pupilVal = pupil[term]?.toLowerCase();

				if (pupilVal !== queryVal) {
					isMatch = false;
					break;
				}
			}

			if (isMatch) match.push(pupil);
		}

		return match;
	};

	/**
	 * Parses and validates classes from DB result
	 */
	const extractClassData = async function (
		tableName: string,
		queriedClass: string | null,
		gender: string
	) {
		const parsed = await fetchParsedClassesFromDB(tableName);
		if (!parsed || Object.keys(parsed).length === 0)
			throw new Error("invalid or empty SQL result...");

		const result: any = { allClasses: parsed, genderData: [] };

		if (queriedClass && parsed[queriedClass]) {
			result.classContent = parsed[queriedClass];
			result.genderData = parsed[queriedClass][gender] || [];
		}

		return result;
	};

	const fetchParsedClassesFromDB = async function (tableName: string) {
		try {
			const safeTable = sanitizeTableName(tableName);
			const query = `SELECT classes FROM \`${safeTable}\``;
			const [rows]: any = await appPool.query(query);

			if (!rows.length) {
				throw new Error("rows array is empty ");
			}
			if (!rows[0].classes) {
				throw new Error(`no classes present in ${rows[0]}`);
			}

			const parsed = JSON.parse(rows[0].classes);

			return parsed;
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	const getAllSessionsClasses = async function (sessionsArr: any[]) {
		//get all the sessionyear in the db
		const allClasses = [];
		const emptyClasses = [];
		//enter the classes column in each year
		for await (let classEntry of sessionsArr) {
			//parse the classes
			let parsedClassData: any = await fetchParsedClassesFromDB(classEntry);

			if (parsedClassData && Object.keys(parsedClassData).length) {
				allClasses.push(parsedClassData);
			} else {
				emptyClasses.push({ _empty: true });
			}
		}

		return { allClasses, emptyClasses };
	};

	const hasProperty = function (pupilProp: any, prop: string) {
		if (pupilProp[prop]) {
			return true;
		}
		return false;
	};
	const propValueMatches = function (
		pupilProp: any,
		queryProp: string,
		queryObj: any
	) {
		const pupilVal = pupilProp[queryProp]?.toLowerCase();
		const queryVal = queryObj[queryProp]?.toLowerCase();

		if (pupilVal === queryVal) {
			return true;
		}
		return false;
	};

	const searchParsedClassesByGender = function (
		classesArr: any[],
		queryObj: any,
		searchKeys: string[]
	) {
		// create an empty array to store all matched pupils
		const matchedPupils: any[] = [];

		// loop through each classEntryObj in the array
		for (let classEntryObj of classesArr) {
			// for each class key in that object (e.g. "premiereClass", "primary-5")
			for (let singleClassKey in classEntryObj) {
				const singleClass = classEntryObj[singleClassKey];

				// define gender groups
				const genderGroups = ["boys", "girls"];

				// loop through each gender group in the current class
				for (let genderType of genderGroups) {
					const pupilsArr = singleClass[genderType];

					if (!Array.isArray(pupilsArr)) continue; // defensive check

					// loop through each pupil in this gender group
					for (
						let pupilIndex = 0;
						pupilIndex < pupilsArr.length;
						pupilIndex++
					) {
						const currentPupil = pupilsArr[pupilIndex];
						// check all search keys for this pupil
						for (let searchKey of searchKeys) {
							//if the searchkey prop exist in the pupil data
							if (hasProperty(currentPupil, searchKey)) {
								//if the supplied data and the stored data values are the same
								if (propValueMatches(currentPupil, searchKey, queryObj)) {
									matchedPupils.push(currentPupil);
									break; // stop checking other keys for this pupil
								}
							}
						}
					}
				}
			}
		}
		if (!matchedPupils.length) {
			throw new Error("no pupil found");
		}
		return matchedPupils;
	};

	const recurseClassSearch = async function (
		queryObj: any,
		searchKeys: string[]
	) {
		try {
			const allSessionYears = await getAllSessionModel();
			const { allClasses } = await getAllSessionsClasses(allSessionYears);
			const result = searchParsedClassesByGender(
				allClasses,
				queryObj,
				searchKeys
			);

			//check if the supplied otherKey prop exist as a prop in each pupil of the genderArr
			//if it does, check if the value===the provided value
			//if its a match push the current pupilData to the global match object
			//if it doesnt move to other pupils in the genderArr
			//repeat for all gender in all sessionYear and return the
			return result;
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	const execClassDataSearch = async function () {
		//mainFilter=[gender,classname]
		const { otherKeys: searchTerms, highKeys: mainFilter } = queryParser();

		if (!searchTerms.length && !mainFilter.length)
			throw new Error("no value provided");

		if (!mainFilter.length) {
			return await recurseClassSearch(queryObj, searchTerms);
		}

		const tableName = queryObj.sessionyear
			? sanitizeTableName(queryObj.sessionyear)
			: null;
		if (!tableName) throw new Error("no session year provided");

		const conn = await pool.getConnection();
		try {
			const queriedClass = queryObj.classname;
			const gender =
				queryObj.gender === "male".toLowerCase().trim() ? "boys" : "girls";

			const { classContent, allClasses, genderData } = await extractClassData(
				tableName,
				queriedClass || null,
				gender
			);

			const finalOutput: any = {};

			if (queriedClass) {
				finalOutput[queriedClass] = classContent;
				const match = filterPupilsBySearchTerms(
					genderData,
					queryObj,
					searchTerms
				);
				if (!match.length) throw new Error("no matching records found");
				finalOutput.match = match;
			} else {
				finalOutput.allClasses = allClasses;
			}

			return finalOutput;
		} catch (err: any) {
			throw new Error(JSON.stringify({ err: err.message, source: err.stack }));
		} finally {
			conn.release();
		}
	};

	return await execClassDataSearch();
};
