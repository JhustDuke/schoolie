// import { v4 as uuidv4 } from "uuid";
// import * as time from "dayjs";

import { appPool } from ".";
import { sanitizeTableName, getTotalStats } from "../utils";
import { PupilPersonalInfoInterface } from "../interfaces";

interface newPupilInterface {
	sessionYear: string;
	className: string;
	gender: "male" | "female";
	alias?: string;
	pupilPersonalInfo: PupilPersonalInfoInterface;
}

/**
 * Adds a new pupil to the class list for the given session year.
 * Updates totals if the pupil is not a duplicate.
 */
export async function addPupilModel({
	sessionYear,
	className,
	gender,
	alias = "test_alias",
	pupilPersonalInfo,
}: newPupilInterface): Promise<boolean> {
	const table = sanitizeTableName(sessionYear);
	const sessionYearStats = await getTotalStats(table);

	let { total_boys, total_girls, classes: existingClasses } = sessionYearStats;

	const classExists = existingClasses[className] !== undefined;
	const genderKey = gender === "female" ? "girls" : "boys";

	if (!classExists) {
		existingClasses[className] = {
			alias,
			boys: [],
			girls: [],
		};
		existingClasses[className][genderKey].push(pupilPersonalInfo);
		if (gender === "female") total_girls += 1;
		if (gender === "male") total_boys += 1;
	} else {
		const pupilList = existingClasses[className][genderKey];
		if (!isPupilDuplicate(pupilList, pupilPersonalInfo)) {
			pupilList.push(pupilPersonalInfo);
			if (gender === "female") total_girls += 1;
			if (gender === "male") total_boys += 1;
		}
	}

	const classDataToJson = JSON.stringify(existingClasses);

	const conn = await appPool.getConnection();
	try {
		const insertQuery = `UPDATE \`${table}\` SET classes=?, total_boys=?, total_girls=? WHERE id=1`;
		await conn.query(insertQuery, [classDataToJson, total_boys, total_girls]);
		console.log("insert success");
		return true;
	} catch (err: any) {
		console.log("insert data failure");
		throw new Error(err.message);
	} finally {
		conn.release();
	}
}

/**
 * Checks if a pupil already exists in the provided array.
 */
function isPupilDuplicate(arr: any[], pupil: any): boolean {
	return arr.some(function (item) {
		return JSON.stringify(item) === JSON.stringify(pupil);
	});
}
