import { appPool } from "./createDBModel";
import { getAllSessionModel } from "./";

interface queryInterface {
	sessionyear?: string | null;
	classname?: string | null;
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
export const searchQueryModel = function (
	queryObj: queryInterface,
	pool = appPool
) {
	const HighPriorityKeys = ["sessionyear", "classname", "gender"];

	const queryParser = function (): any {
		const queryStringKeys = Object.keys(queryObj);
		const highKeys: string[] = [];
		const otherKeys = [];

		//search for high priority and (low-priority)
		for (let key of queryStringKeys) {
			if (HighPriorityKeys.includes(key)) {
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

	const buildHighPriorityQuery = function () {
		const { highKeys } = queryParser();
		let dbquery = "";
		const queryIndex: any[] = [];
		const conditionals: string[] = [];

		if (highKeys.length > 0) {
			if (highKeys.includes("sessionyear") && queryObj.sessionyear) {
				queryIndex.push(queryObj.sessionyear);
				conditionals.push(`sessionYear='$${queryIndex.length}'`);
			}
			if (highKeys.includes("classname") && queryObj.classname) {
				queryIndex.push(queryObj.classname);
				conditionals.push(`className='$${queryIndex.length}'`);
			}
			if (highKeys.includes("gender") && queryObj.gender) {
				queryIndex.push(queryObj.gender); // 🔧 FIXED: previously pushed classname again
				conditionals.push(`gender='$${queryIndex.length}'`);
			}
		}

		if (conditionals.length > 0) {
			dbquery = conditionals.join(" AND ");
		}

		if (dbquery === "") {
			return false;
		}

		console.log("ran to this point in major query");
		return {
			query: dbquery.trim(),
			values: queryIndex, // 🔧 returning values for merge
		};
	};

	const mergeOtherQuery = function () {
		const result = buildHighPriorityQuery();
		if (result === false) {
			// TODO: handle recursive fallback
			return;
		}

		let { query: majorQuery, values } = result;
		const { otherKeys, highKeys } = queryParser();

		if (otherKeys.length === 0 && highKeys.length === 0) {
			throw new Error("no search term provided");
		}

		const conditionals: string[] = [];

		for (let key of otherKeys) {
			const val = queryObj[key];
			if (val !== null) {
				values.push(val);
				conditionals.push(`${key}='$${values.length}'`);
			}
		}

		let newQuery = majorQuery;
		if (conditionals.length > 0) {
			newQuery += " AND " + conditionals.join(" AND ");
		}
		console.log("ran to this point in other query");
		return {
			whereClause: newQuery,
			values,
		};
	};
	return mergeOtherQuery();
};
