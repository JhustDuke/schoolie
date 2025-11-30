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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = handleFileUpload;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
async function handleFileUpload({ file, uploadDir = "src/uploads", imageData, }) {
    if (!file || typeof file.pipe !== "function" || !file.hapi?.filename) {
        throw new Error("Invalid file stream or missing filename");
    }
    const originalName = file.hapi.filename;
    const ext = path.extname(originalName) || ".png";
    const filename = `${imageData.firstname}${imageData.middleName}${imageData.lastName}${imageData.className}${imageData.gender}${ext}`;
    const filePath = path.join(uploadDir, filename);
    await new Promise(function (resolve, reject) {
        const writeStream = fs.createWriteStream(filePath);
        writeStream.on("error", function (err) {
            console.error("Write failed:", err.message);
            return reject(new Error("Could not save file"));
        });
        file.on("error", function (err) {
            console.error("Read failed:", err.message);
            return reject(new Error("File read error"));
        });
        file.on("end", function () {
            console.log("Upload complete");
            return resolve("done"); // or resolve({ path: filePath })
        });
        file.pipe(writeStream);
    });
    console.log(filePath);
    return filePath;
}
//# sourceMappingURL=handleFileUpload.js.map