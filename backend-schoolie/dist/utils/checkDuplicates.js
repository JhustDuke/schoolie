"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicates = checkDuplicates;
function checkDuplicates(inputA, inputB) {
    let arrA = Array.isArray(inputA) ? inputA : [inputA];
    let arrB = Array.isArray(inputB) ? inputB : [inputB];
    arrA = arrA.map(function (item) {
        return item.toLowerCase();
    });
    arrB = arrB.map(function (item) {
        return item.toLowerCase();
    });
    const duplicates = arrB.filter(function (item) {
        return arrA.includes(item);
    });
    return {
        isDuplicate: duplicates.length > 0,
        duplicates,
    };
}
//# sourceMappingURL=checkDuplicates.js.map