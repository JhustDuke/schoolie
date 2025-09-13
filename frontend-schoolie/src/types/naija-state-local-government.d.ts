declare module "naija-state-local-government" {
	export interface StateLocalGovernmentInterface {
		all(): { [state: string]: string[] };
		states(): string[];
		lgas(state: string): { lgas: string[]; senatorialDistricts?: string[] };
	}

	const naijaStateLocalGovernment: StateLocalGovernmentInterface;
	export default naijaStateLocalGovernment;
}
