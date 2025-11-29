"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPupilsBySearchTerms = exports.processGenderGroup = exports.checkPupilMatch = void 0;
const hasProperty_1 = require("./hasProperty");
const propValueMatches_1 = require("./propValueMatches");
// helper: checks if a given pupil matches any search key based on provided query object
const checkPupilMatch = function (pupil, // single pupil object
searchKeys, // list of property names to check
queryObj // query object containing search values
) {
    // loop through each key we want to search
    for (let searchKey of searchKeys) {
        // check if the pupil has this property and if its value matches the query
        if ((0, hasProperty_1.hasProperty)(pupil, searchKey) &&
            (0, propValueMatches_1.propValueMatches)(pupil, searchKey, queryObj)) {
            // return true immediately if a match is found
            return true;
        }
    }
    // return false if no key matches
    return false;
};
exports.checkPupilMatch = checkPupilMatch;
// helper: processes all pupils in a gender group and adds matches to the output array
const processGenderGroup = function (pupilsArr, // array of pupils for a gender group
searchKeys, // list of property names to check
queryObj, // query object containing search values
matchedPupils // array to store matched pupils
) {
    // skip if pupilsArr is not a valid array
    if (!Array.isArray(pupilsArr))
        return;
    // loop through each pupil in the given gender group
    for (let pupil of pupilsArr) {
        // if this pupil matches based on the provided search keys and query
        if ((0, exports.checkPupilMatch)(pupil, searchKeys, queryObj)) {
            // add this pupil to the matched pupils array
            matchedPupils.push(pupil);
        }
    }
};
exports.processGenderGroup = processGenderGroup;
/**
 * Filters pupils based on search terms from the queryObj
 */
const filterPupilsBySearchTerms = function (pupilsData, queryObj, searchTerms) {
    const match = [];
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
            const queryPropVal = queryObj[term]?.toLowerCase();
            //this is the value of the stored pupil data from the db
            const pupilPropVal = pupil[term]?.toLowerCase();
            //if the stored value doesnt match the quereidProp value then this is not the pupil
            if (pupilPropVal !== queryPropVal) {
                isMatch = false;
                break;
            }
        }
        //if the two propValues match, then this is the pupil i'm looking for
        if (isMatch)
            match.push(pupil);
    }
    return match;
};
exports.filterPupilsBySearchTerms = filterPupilsBySearchTerms;
//# sourceMappingURL=classSearchHelpers.js.map