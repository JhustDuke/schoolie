import { ReadStream, createReadStream } from "fs";
import * as fs from "fs";
import * as path from "path";
import { appPool } from "./DBinit";
createReadStream;

/**
 * to serve the photo i need to
 * get the path the photo is located
 * get the name of the photo
 * read the photo to buffer
 * send the photo to the user
 */

/**
 * Asynchronously returns a ReadStream if the image exists
 * @param imageName name of the image file
 * @param imageDir relative path to image folder
 * @returns Promise resolving to ReadStream
 */
async function sendPassportStream(
	imageName = "",
	imageDir = "../uploads"
): Promise<fs.ReadStream> {
	const dir = path.join(__dirname, imageDir);
	const pathWithImageName = path.join(dir, imageName);
	console.log("dir:", dir);
	console.log("image path:", pathWithImageName);

	return new Promise(function (resolve, reject) {
		const stream = fs.createReadStream(pathWithImageName + ".png");
		stream.on("error", function (err) {
			reject(new Error(`Image "${imageName}" not found in ${imageDir}`));
		});
		stream.on("open", function () {
			resolve(stream);
		});
	});
}

interface getPupilInterface {
	sessionYear: string;
	firstName: string;
	middleName: string;
	lastName: string;
	className: string;
	gender: "male" | "female";
}

export const getPupilByClassModel = async function ({
	firstName,
	middleName,
	lastName,
	className,
	gender,
	sessionYear = "3000/3333",
}: getPupilInterface) {
	const conn = await appPool.getConnection();
	const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");

	try {
		const [rows]: any = await conn.query(
			`SELECT classes FROM \`${table}\` WHERE id=1`
		);
		if (!rows.length) throw new Error("No data found");

		const classData = JSON.parse(rows[0].classes || "{}");

		const pupils =
			classData[className.toLowerCase().trim()]?.[
				gender === "male" ? "boys" : "girls"
			] || [];

		const pupilInfo =
			pupils.find(function (pupil: any) {
				return (
					pupil.firstnameInput.toLowerCase().trim() ===
					firstName.toLowerCase().trim()
				);
			}) || false;

		if (!pupilInfo) {
			throw new Error(`pupil with ${firstName} not found`);
		}
		// if (pupilInfo.passport) {
		// 	pupilInfo.passport = await sendPassportStream(
		// 		`${firstName}${middleName}${lastName}${className}${gender}`
		// 	);
		// }
		return pupilInfo;
	} catch (err) {
		console.error("Error fetching pupil:", err);
		throw new Error("Failed to get pupil");
	} finally {
		conn.release();
	}
};
