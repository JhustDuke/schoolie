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
			`SELECT classes, total_boys, total_girls FROM \`${table}\` `
		);

		if (!rows.length) throw new Error("No data found");

		const { total_boys, total_girls } = rows[0];
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
				fatherContact: p.fatherPhoneInput || p.fatherPhone || null,
				passport: cleanedPassport
					? `${
							process.env.BASE_URL || "http://localhost:3333"
					  }/${cleanedPassport}`
					: null,
				totalBoys: total_boys,
				totalGirls: total_girls,
			};
		});

		return processed;
	} catch (err: any) {
		throw new Error(err.message || "Failed to get class data");
	} finally {
		conn.release();
	}
};
