import { hasProperty } from "./hasProperty";
import { propValueMatches } from "./propValueMatches";

export interface queryInterface {
	sessionyear?: string | null;
	classname?: string | null;
	gender?: string | null;
	[key: string]: unknown;
}

// helper: checks if a given pupil matches any search key based on provided query object
export const checkPupilMatch = function (
	pupil: Record<string, any>, // single pupil object
	searchKeys: string[], // list of property names to check
	queryObj: Record<string, any> // query object containing search values
) {
	// loop through each key we want to search
	for (let searchKey of searchKeys) {
		// check if the pupil has this property and if its value matches the query
		if (
			hasProperty(pupil, searchKey) &&
			propValueMatches(pupil, searchKey, queryObj)
		) {
			// return true immediately if a match is found
			return true;
		}
	}
	// return false if no key matches
	return false;
};

// helper: processes all pupils in a gender group and adds matches to the output array
export const processGenderGroup = function (
	pupilsArr: any[], // array of pupils for a gender group
	searchKeys: string[], // list of property names to check
	queryObj: Record<string, any>, // query object containing search values
	matchedPupils: any[] // array to store matched pupils
) {
	// skip if pupilsArr is not a valid array
	if (!Array.isArray(pupilsArr)) return;
	// loop through each pupil in the given gender group
	for (let pupil of pupilsArr) {
		// if this pupil matches based on the provided search keys and query
		if (checkPupilMatch(pupil, searchKeys, queryObj)) {
			// add this pupil to the matched pupils array
			matchedPupils.push(pupil);
		}
	}
};
/**
 * Filters pupils based on search terms from the queryObj
 */
export const filterPupilsBySearchTerms = function (
	pupilsData: any[],
	queryObj: queryInterface,
	searchTerms: string[]
) {
	const match: any[] = [];

	for (let i = 0; i < pupilsData.length; i++) {
		const pupil = pupilsData[i];
		let isMatch = true;

		for (const term of searchTerms) {
			//if the given string does not exist as a propKey in queryObj skip it
			if (!(term in queryObj)) {
				console.warn("queryObj does have", term, "as a property key");
				continue;
			}

			//this is the value gotten from the queryObj
			const queryPropVal = (queryObj as any)[term]?.toLowerCase();
			//this is the value of the stored pupil data from the db
			const pupilPropVal = pupil[term]?.toLowerCase();

			//if the stored value doesnt match the quereidProp value then this is not the pupil
			if (pupilPropVal !== queryPropVal) {
				isMatch = false;
				break;
			}
		}
		//if the two propValues match, then this is the pupil i'm looking for
		if (isMatch) match.push(pupil);
	}

	return match;
};
