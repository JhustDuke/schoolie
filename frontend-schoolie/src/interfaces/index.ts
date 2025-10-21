export interface PupilInterface {
	name: string;
	className: string;
	parentPhone: string;
	image?: string;
}

export interface ClassDetailsInterface {
	totalBoys: string;
	totalGirls: string;
	pupils: PupilInterface[];
}
