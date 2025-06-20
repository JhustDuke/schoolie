import { appPool } from "./createDBModel";

interface getPupilInterface {
	sessionYear: string;
	firstName: string;
	className: string;
	gender: "male" | "female";
}

export const getPupilByClassModel = async function ({
	firstName,
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

		return (
			pupils.find(function (pupil: any) {
				return (
					pupil.firstnameInput.toLowerCase().trim() ===
					firstName.toLowerCase().trim()
				);
			}) || null
		);
	} catch (err) {
		console.error("Error fetching pupil:", err);
		throw new Error("Failed to get pupil");
	} finally {
		conn.release();
	}
};
