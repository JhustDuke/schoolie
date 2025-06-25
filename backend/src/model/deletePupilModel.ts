import { appPool } from "./createDBModel";

interface deletePupilData {
	sessionYear: string;
	className: string;
	firstName: string;
	gender: "male" | "female";
}

export const deletePupilModel = async function ({
	sessionYear = "3000/3333",
	className,
	firstName,
	gender,
}: deletePupilData) {
	const conn = await appPool.getConnection();
	const table = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");

	try {
		const [rows]: any = await conn.query(
			`SELECT classes FROM \`${table}\` WHERE id=1`
		);
		if (!rows.length) throw new Error("Session not found");

		const parsedClasses = JSON.parse(rows[0].classes || "{}");
		const genderKey = gender === "male" ? "boys" : "girls";
		const pupilArr = parsedClasses[className.toLowerCase()]?.[genderKey];

		if (!Array.isArray(pupilArr)) throw new Error("Class not found");

		const index = pupilArr.findIndex(
			(p: any) =>
				p.firstnameInput?.toLowerCase().trim() ===
				firstName.toLowerCase().trim()
		);

		if (index === -1) throw new Error("Pupil not found");

		pupilArr.splice(index, 1);

		const updated = JSON.stringify(parsedClasses);
		await conn.query(`UPDATE \`${table}\` SET classes=? WHERE id=1`, [updated]);

		return {
			success: true,
			message: `pupil ${firstName} successfully deleted`,
		};
	} catch (err: any) {
		throw new Error(err.message);
	} finally {
		conn.release();
	}
};
