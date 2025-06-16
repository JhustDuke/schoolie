// src/modules/addPupilToClass.ts
import { v4 as uuidv4 } from "uuid";
import * as time from "dayjs";
import { appPool } from ".";

function sanitizeTableName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, "_");
}

interface newPupilInterface {
	sessionYear: string;
	className: string;
	gender: "male" | "female";
	alias?: string;
	pupil: {
		[key: string]: any;
	};
}

export async function addPupilModel({
	sessionYear,
	className,
	gender,
	alias = "",
	pupil,
}: newPupilInterface) {
	const sanitizedTableName = sanitizeTableName(sessionYear);
	console.log(sanitizedTableName);
	const conn = await appPool.getConnection();
	const query = `SELECT id,classes,total_boys,total_girls,total_pupils,newly_added_pupils FROM \`${sanitizedTableName}\` WHERE id=1`;
	const execQuery = conn.query(query) as any;
	try {
		const [queryOutcome] = await execQuery;
		if (!queryOutcome.length) {
			console.log("table not found");
			return false;
		}
		return queryOutcome;
	} catch (err: any) {
		return err.message;
	}

	// try {
	// 	const [rows]: any = await conn.query(
	// 		`SELECT id, classes, total_boys, total_girls, total_pupils, newly_added_pupils
	//       FROM \`${sanitizedTableName}\`,
	//       WHERE id = 1`
	// 	);

	// 	if (!rows.length) {
	// 		throw new Error("Session-year table not initialized");
	// 	}

	// 	const currentSessionRow = rows[0];
	// 	const parsedClasses = JSON.parse(currentSessionRow.classes);

	// 	if (!parsedClasses[className]) {
	// 		parsedClasses[className] = { alias, boys: [], girls: [] };
	// 	}

	// 	const newPupil = {
	// 		id: uuidv4(),
	// 		createdAt: new Date().toISOString(),
	// 		...pupil,
	// 	};

	// 	parsedClasses[className][gender].push(newPupil);

	// 	const updatedTotalBoys =
	// 		gender === "boys"
	// 			? currentSessionRow.total_boys + 1
	// 			: currentSessionRow.total_boys;
	// 	const updatedTotalGirls =
	// 		gender === "girls"
	// 			? currentSessionRow.total_girls + 1
	// 			: currentSessionRow.total_girls;
	// 	const updatedTotalPupils = updatedTotalBoys + updatedTotalGirls;

	// 	let recentlyAddedPupils: any[] = currentSessionRow.newly_added_pupils
	// 		? JSON.parse(currentSessionRow.newly_added_pupils)
	// 		: [];

	// 	recentlyAddedPupils.unshift(newPupil);

	// 	const thresholdDateForNewPupils = time.default().subtract(30, "day");

	// 	recentlyAddedPupils = recentlyAddedPupils
	// 		.filter(function (pupilEntry: any) {
	// 			const createdAtDate = time.default(pupilEntry.createdAt);
	// 			return createdAtDate.isAfter(thresholdDateForNewPupils);
	// 		})
	// 		.slice(0, 10);

	// 	await conn.query(
	// 		`UPDATE \`${sanitizedTableName}\`
	//         SET classes             = ?,
	//             total_boys          = ?,
	//             total_girls         = ?,
	//             total_pupils        = ?,
	//             newly_added_pupils  = ?
	//       WHERE id = 1`,
	// 		[
	// 			JSON.stringify(parsedClasses),
	// 			updatedTotalBoys,
	// 			updatedTotalGirls,
	// 			updatedTotalPupils,
	// 			JSON.stringify(recentlyAddedPupils),
	// 		]
	// 	);
	// } finally {
	// 	conn.release();
	// }
}
