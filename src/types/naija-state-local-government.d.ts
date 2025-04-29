declare module "naija-state-local-government" {
	export interface StateLocalGovernmentInterface {
		all(): { [state: string]: string[] };
		states(): string[];
		lgas(state: string): string[] | undefined;
	}

	const naijaStateLocalGovernment: StateLocalGovernmentInterface;
	export default naijaStateLocalGovernment;
}
