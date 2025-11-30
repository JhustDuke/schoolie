"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DBinit"), exports);
__exportStar(require("./DBTableModel"), exports);
//get
__exportStar(require("./getAllSessionModel"), exports);
__exportStar(require("./totalStatsModel"), exports);
__exportStar(require("./classOpsModel"), exports);
__exportStar(require("./searchQueryModel"), exports);
__exportStar(require("./getPupilsModel"), exports);
//post
__exportStar(require("./addPupilModel"), exports);
//patch
__exportStar(require("./updatePupilModel"), exports);
//delet
__exportStar(require("./deletePupilModel"), exports);
//# sourceMappingURL=index.js.map