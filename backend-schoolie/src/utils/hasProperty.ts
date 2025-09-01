export const hasProperty = function (pupilProp: any, prop: string) {
	if (pupilProp[prop]) {
		return true;
	}
	return false;
};
