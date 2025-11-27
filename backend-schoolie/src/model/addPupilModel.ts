import { appPool } from ".";
import { PupilPersonalInfoInterface } from "../interfaces";
import { sanitizeTableName } from "../utils";

interface newPupilInterface {
	sessionYear: string;
	className: string;
	gender: "male" | "female";
	alias?: string;
	pupilPersonalInfo: PupilPersonalInfoInterface;
}

// --- DB HELPERS -------------------------------------------------------------

// --- MAIN METHOD ------------------------------------------------------------

export async function addPupilModel({
	sessionYear,
	className,
	gender,
	alias = className,
	pupilPersonalInfo,
}: newPupilInterface): Promise<boolean> {
	const table = sanitizeTableName(sessionYear);

	// 1. LOAD DB DATA
	const { total_boys, total_girls, classes } = await fetchSessionData(table);

	let newTotalBoys = total_boys;
	let newTotalGirls = total_girls;

	// 2. CLASS MUST ALREADY EXIST
	if (!classes[className]) {
		throw new Error("class does not exist in this session year");
	}

	const genderKey = gender === "female" ? "girls" : "boys";
	const pupilList = classes[className][genderKey];

	// 3. DUPLICATE CHECK
	if (!isDuplicatePupil(pupilList, pupilPersonalInfo)) {
		pupilList.push(pupilPersonalInfo);

		// SINGLE SOURCE OF TRUTH FOR INCREMENTS
		if (gender === "male") newTotalBoys += 1;
		if (gender === "female") newTotalGirls += 1;
	} else {
		throw new Error("duplicate pupil");
	}

	// 4. WRITE BACK
	await updateSessionData(
		table,
		JSON.stringify(classes),
		newTotalBoys,
		newTotalGirls
	);
	console.log({ newTotalBoys, newTotalGirls, classes });
	return true;
}

// --- UTIL -------------------------------------------------------------------

function isDuplicatePupil(arr: any[], pupil: any): boolean {
	return arr.some(function (item) {
		return JSON.stringify(item) === JSON.stringify(pupil);
	});
}
async function fetchSessionData(table: string) {
	const conn = await appPool.getConnection();

	try {
		const [rows]: any = await conn.query(
			`SELECT total_boys, total_girls, classes FROM \`${table}\``
		);

		if (!rows.length) {
			throw new Error("session year table has no rows");
		}

		return {
			total_boys: Number(rows[0].total_boys),
			total_girls: Number(rows[0].total_girls),
			classes: rows[0].classes ? JSON.parse(rows[0].classes) : {},
		};
	} finally {
		conn.release();
	}
}

async function updateSessionData(
	table: string,
	classesJson: string,
	total_boys: number,
	total_girls: number
) {
	const conn = await appPool.getConnection();

	try {
		await conn.query(
			`UPDATE \`${table}\` SET classes=?, total_boys=?, total_girls=?`,
			[classesJson, total_boys, total_girls]
		);
	} finally {
		conn.release();
	}
}
