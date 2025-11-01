// navBarModel.d.ts
declare module "@models/navBarModel" {
	export interface AuthPayloadInterface {
		email: string;
		password: string;
	}

	export interface AuthResponseInterface {
		success: boolean;
		message: string;
	}

	export interface NavBarModelInterface {
		searchModel(params: Record<string, string>): Promise<any>;
		login(payload: AuthPayloadInterface): Promise<AuthResponseInterface>;
		loginMock(payload: AuthPayloadInterface): Promise<AuthResponseInterface>;
		signUp(payload: AuthPayloadInterface): Promise<AuthResponseInterface>;
		signUpMock(payload: AuthPayloadInterface): Promise<AuthResponseInterface>;
	}

	export const navBarModel: NavBarModelInterface;
}
