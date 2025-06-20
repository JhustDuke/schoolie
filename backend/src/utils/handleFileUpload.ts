import * as path from "path";
import * as fs from "fs";

/**
 * Saves a file stream to disk with a unique name and correct extension.
 * @param file - The file stream from payload.
 * @param uploadDir - Directory to save the file in.
 * @returns Relative path to the saved file.
 */
export async function handleFileUpload({
	file,
	uploadDir = "src/uploads",
	pupilname,
}: {
	file: any;
	pupilname: string;
	uploadDir?: string;
}) {
	if (!file || typeof file.pipe !== "function" || !file.hapi?.filename) {
		throw new Error("Invalid file stream or missing filename");
	}

	const originalName = file.hapi.filename;
	const ext = path.extname(originalName) || ".png";
	const filename = `${pupilname}${ext}`;
	const filePath = path.join(uploadDir, filename);

	await new Promise(function (resolve, reject) {
		const writeStream = fs.createWriteStream(filePath);
		writeStream.on("error", function (err) {
			console.error("Write failed:", err.message);
			return reject(new Error("Could not save file"));
		});
		file.on("error", function (err: any) {
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
