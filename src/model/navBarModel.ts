interface searchModelInterface {
	sessionyear: string | null;
	classname: string | null;
	gender: string | null;
	[key: string]: unknown;
}

export const navBarModel = (function () {
	const searchModel = function () {};

	return {
		searchModel,
	};
})();
