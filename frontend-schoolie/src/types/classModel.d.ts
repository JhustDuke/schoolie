// classModel.d.ts
declare module "@models/classModel" {
	export interface SchoolStatsInterface {
		total_boys: number;
		total_girls: number;
		total_classes: number;
	}

	export interface ClassDataInterface {
		name: string;
		className: string;
		parentPhone: string;
	}

	export interface AddClassesResponseInterface {
		success: boolean;
		added: string[];
		message?: string;
	}

	export interface ClassModelInterface {
		getSchoolStats(sessionYear: string): Promise<SchoolStatsInterface>;
		getClassData(sessionYear: string, queriedClass: string): Promise<any>;
		loadClasses(sessionYear: string): Promise<string[]>;
		loadClassesMock(): Promise<string[]>;
		getSchoolStatsMock(): Promise<SchoolStatsInterface>;
		getClassDataMock(queriedClass: string): Promise<ClassDataInterface[]>;

		// 👇 Added endpoints
		addClasses(
			sessionYear: string,
			classes: string[]
		): Promise<AddClassesResponseInterface>;
		addClassesMock(
			sessionYear: string,
			classes: string[]
		): Promise<AddClassesResponseInterface>;

		forgotPassword({ email: string }): any;
		forgotPassWordMock({ email: string }): any;
	}

	export const classModel: ClassModelInterface;
}
