"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQueryModel = void 0;
const DBinit_1 = require("./DBinit");
const _1 = require(".");
const utils_1 = require("../utils");
const searchQueryModel = async function (queryObj, pool = DBinit_1.appPool) {
    // --- helper to normalize pupils ---
    const formatPupils = function (allPupils) {
        return allPupils.map(function (p) {
            const rawPassport = p.passport || "";
            const cleanedPassport = rawPassport
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
        const highKeys = [];
        const otherKeys = [];
        for (let key of queryStringKeys) {
            if (HighPriorityKeys.includes(key.toLowerCase())) {
                highKeys.push(key);
            }
            else {
                otherKeys.push(key);
            }
        }
        return { highKeys, otherKeys };
    };
    // --- Fetch parsed classes safely ---
    const fetchParsedClassesFromDB = async function (tableName) {
        const conn = await pool.getConnection();
        try {
            const safeTable = (0, utils_1.sanitizeTableName)(tableName);
            const query = `SELECT classes FROM \`${safeTable}\``;
            const [rows] = await conn.query(query);
            if (!rows.length || !rows[0].classes)
                return {};
            return JSON.parse(rows[0].classes);
        }
        finally {
            conn.release();
        }
    };
    // --- Get all classes across sessions ---
    const getAllSessionsClasses = async function (sessionsArr) {
        const allClassNames = [];
        const tableWithClasses = [];
        for await (let sessionYear of sessionsArr) {
            const parsedClassData = await fetchParsedClassesFromDB(sessionYear);
            if (Object.keys(parsedClassData).length) {
                allClassNames.push(parsedClassData);
                tableWithClasses.push(sessionYear);
            }
        }
        return { allClassNames, tableWithClasses };
    };
    // --- Extract gender-specific data from a class ---
    const extractClassData = async function (tableName, className, gender) {
        const parsed = await fetchParsedClassesFromDB(tableName);
        if (!parsed)
            throw new Error("invalid SQL result");
        const result = {};
        if (className && parsed[className]) {
            result.allClasses = parsed;
            result.classOverview = parsed[className];
            result.genderData = parsed[className][gender] || [];
        }
        return result;
    };
    // --- Various search strategy functions ---
    const execAllCriteriaGivenSearch = async function ({ tableName, className, gender, queryObj, searchTerms, }) {
        const { genderData } = await extractClassData(tableName, className, gender);
        const filteredResult = (0, utils_1.filterPupilsBySearchTerms)(genderData, queryObj, searchTerms);
        if (filteredResult.length)
            return filteredResult;
        throw new Error("no match found");
    };
    const execAllButSessionYearGivenSearch = async function ({ className, gender, queryObj, searchTerms, }) {
        const allSessions = await (0, _1.getAllSessionModel)();
        const { tableWithClasses } = await getAllSessionsClasses(allSessions);
        const result = [];
        for (let tableName of tableWithClasses) {
            const { genderData } = await extractClassData(tableName, className, gender);
            const filtered = (0, utils_1.filterPupilsBySearchTerms)(genderData, queryObj, searchTerms);
            if (filtered.length)
                result.push(...filtered);
        }
        if (!result.length)
            throw new Error("no match found");
        return result;
    };
    const execOnlyClassNameGivenSearch = async function ({ className, gender, queryObj, searchTerms, }) {
        const allSessions = await (0, _1.getAllSessionModel)();
        const { tableWithClasses } = await getAllSessionsClasses(allSessions);
        const result = [];
        for (let tableName of tableWithClasses) {
            const { classOverview } = await extractClassData(tableName, className, gender);
            if (!classOverview)
                continue;
            const boys = classOverview.boys || [];
            const girls = classOverview.girls || [];
            const filteredBoys = (0, utils_1.filterPupilsBySearchTerms)(boys, queryObj, searchTerms);
            const filteredGirls = (0, utils_1.filterPupilsBySearchTerms)(girls, queryObj, searchTerms);
            if (filteredBoys.length)
                result.push(...filteredBoys);
            if (filteredGirls.length)
                result.push(...filteredGirls);
        }
        if (!result.length)
            throw new Error("no match found across sessions");
        return result;
    };
    const execOnlyGenderGivenSearch = async function ({ gender, queryObj, searchTerms, }) {
        const allSessions = await (0, _1.getAllSessionModel)();
        const { allClassNames } = await getAllSessionsClasses(allSessions);
        const result = [];
        for (let classEntryObj of allClassNames) {
            for (let singleClassKey in classEntryObj) {
                const singleClass = classEntryObj[singleClassKey];
                const genderArr = singleClass[gender] || [];
                const filtered = (0, utils_1.filterPupilsBySearchTerms)(genderArr, queryObj, searchTerms);
                if (filtered.length)
                    result.push(...filtered);
            }
        }
        if (!result.length)
            throw new Error("no match found across sessions");
        return result;
    };
    const recurseClassSearch = async function (queryObj, searchKeys) {
        const allSessionYears = await (0, _1.getAllSessionModel)();
        const { allClassNames } = await getAllSessionsClasses(allSessionYears);
        return searchParsedClassesByGender(allClassNames, queryObj, searchKeys);
    };
    const searchParsedClassesByGender = function (classesArr, queryObj, searchKeys) {
        const matchedPupils = [];
        for (let classEntryObj of classesArr) {
            for (let singleClassKey in classEntryObj) {
                const singleClass = classEntryObj[singleClassKey];
                (0, utils_1.processGenderGroup)(singleClass.boys, searchKeys, queryObj, matchedPupils);
                (0, utils_1.processGenderGroup)(singleClass.girls, searchKeys, queryObj, matchedPupils);
            }
        }
        if (!matchedPupils.length)
            throw new Error("no pupil found");
        return matchedPupils;
    };
    // --- Execute the proper strategy ---
    const execSearchStrategy = async function () {
        const { otherKeys: searchTerms, highKeys: mainFilter } = queryParser();
        const tableName = queryObj.sessionyear
            ? (0, utils_1.sanitizeTableName)(queryObj.sessionyear)
            : null;
        const className = queryObj.classname;
        const gender = queryObj.gender === "male".toLowerCase().trim() ? "boys" : "girls";
        if (!searchTerms.length && !mainFilter.length)
            throw new Error("no value provided");
        let rawResult = [];
        if (!mainFilter.length)
            rawResult = await recurseClassSearch(queryObj, searchTerms);
        else if (allCriteriaGiven(queryObj, searchTerms))
            rawResult = await execAllCriteriaGivenSearch({
                tableName: tableName,
                className: className,
                gender,
                queryObj,
                searchTerms,
            });
        else if (allButSessionYearGiven(queryObj, searchTerms))
            rawResult = await execAllButSessionYearGivenSearch({
                className: className,
                gender,
                queryObj,
                searchTerms,
            });
        else if (onlyClassNameGiven(queryObj, searchTerms))
            rawResult = await execOnlyClassNameGivenSearch({
                className: className,
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
exports.searchQueryModel = searchQueryModel;
// --- helper functions to determine which criteria exist ---
function allCriteriaGiven(queryObj, searchTerms) {
    return Boolean(queryObj.sessionyear &&
        queryObj.classname &&
        queryObj.gender &&
        searchTerms.length > 0);
}
function allButSessionYearGiven(queryObj, searchTerms) {
    return Boolean(!queryObj.sessionyear &&
        queryObj.classname &&
        queryObj.gender &&
        searchTerms.length > 0);
}
function onlyClassNameGiven(queryObj, searchTerms) {
    return Boolean(queryObj.classname && searchTerms.length > 0);
}
function onlyGenderGiven(queryObj, searchTerms) {
    return Boolean(queryObj.gender && searchTerms.length > 0);
}
//# sourceMappingURL=searchQueryModel.js.map