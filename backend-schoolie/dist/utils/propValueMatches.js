"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propValueMatches = void 0;
const hasProperty = function (pupilProp, prop) {
    if (pupilProp[prop]) {
        return true;
    }
    return false;
};
const propValueMatches = function (pupilProp, queryProp, queryObj) {
    const pupilVal = pupilProp[queryProp]?.toLowerCase();
    const queryVal = queryObj[queryProp]?.toLowerCase();
    if (pupilVal === queryVal) {
        return true;
    }
    return false;
};
exports.propValueMatches = propValueMatches;
//# sourceMappingURL=propValueMatches.js.map