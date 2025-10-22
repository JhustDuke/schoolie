// tabsModel.d.ts
declare module "@models/tabsModel" {
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

	export interface TabsModelInterface {
		getSchoolStats(sessionYear: string): Promise<SchoolStatsInterface>;
		getClassData(sessionYear: string, queriedClass: string): Promise<any>;
		loadClasses(sessionYear: string): Promise<string[]>;
		loadClassesMock(): Promise<string[]>;
		getSchoolStatsMock(): Promise<SchoolStatsInterface>;
		getClassDataMock(queriedClass: string): Promise<ClassDataInterface[]>;
	}

	export const tabsModel: TabsModelInterface;
}
