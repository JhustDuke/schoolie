import { appPool } from "./DBinit";

interface getPupilInterface {
	sessionYear: string;
	classname: string;
}

export const getPupilByClassModel = async function ({
	sessionYear = "3000/3333",
	classname,
}: getPupilInterface) {
	const conn = await appPool.getConnection();
	const table: string = sessionYear.replace(/[^a-zA-Z0-9_]/g, "_");

	try {
		const [rows]: any = await conn.query(
			`SELECT classes FROM \`${table}\` WHERE id=1`
		);

		if (!rows.length) throw new Error("No data found");

		const classData: Record<string, any> = JSON.parse(rows[0].classes || "{}");

		const classKey: string | undefined = Object.keys(classData).find(function (
			k
		) {
			return k.toLowerCase() === classname.toLowerCase();
		});

		if (!classKey) throw new Error("Classname does not exist");

		const classEntry = classData[classKey];

		const boys: any[] = Array.isArray(classEntry.boys) ? classEntry.boys : [];
		const girls: any[] = Array.isArray(classEntry.girls)
			? classEntry.girls
			: [];

		const allPupils: any[] = [...boys, ...girls];

		if (allPupils.length === 0) throw new Error("Class is empty");

		const processed = allPupils.map(function (p) {
			const rawPassport: string = p.passport || "";

			const cleanedPassport: string = rawPassport
				.replace(/\\/g, "/") // fix Windows paths
				.replace("src/uploads/", "uploads/"); // expose static folder

			return {
				firstname: p.firstnameInput || p.firstname || null,
				surname: p.surnameInput || p.surname || null,
				dob: p.dobInput || null,
				passport: cleanedPassport ? `/${cleanedPassport}` : null,
			};
		});

		return processed;
	} catch (err: any) {
		throw new Error(err.message || "Failed to get class data");
	} finally {
		conn.release();
	}
};
