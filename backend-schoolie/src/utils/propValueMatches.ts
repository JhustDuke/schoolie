const hasProperty = function (pupilProp: any, prop: string) {
	if (pupilProp[prop]) {
		return true;
	}
	return false;
};
export const propValueMatches = function (
	pupilProp: any,
	queryProp: string,
	queryObj: any
) {
	const pupilVal = pupilProp[queryProp]?.toLowerCase();
	const queryVal = queryObj[queryProp]?.toLowerCase();

	if (pupilVal === queryVal) {
		return true;
	}
	return false;
};
