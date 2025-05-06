import { addElemToDom } from "../utils";
import { tabsRefs as refs } from "./";
addElemToDom;

export const tabsMethods = (function (tabsRefs = refs) {
	const test0 = function () {
		const { overViewTabBtn } = tabsRefs;

		if (!overViewTabBtn) {
			console.log("tab button not found");
		}
	};

	const test1 = function () {
		const { gradeOneTabBtn } = tabsRefs;

		if (!gradeOneTabBtn) {
			console.log("tab button not found");
		}
	};
	const test2 = function () {
		const { gradeTwoTabBtn } = tabsRefs;

		if (!gradeTwoTabBtn) {
			console.log("tab button not found");
		}
	};
	const test3 = function () {
		const { gradeThreeTabBtn } = tabsRefs;

		if (!gradeThreeTabBtn) {
			console.log("tab button not found");
		}
	};
	const test4 = function () {
		const { moreTabBtn } = tabsRefs;
		if (!moreTabBtn) {
			console.log("tab button not found");
		}
	};
	return {
		test0,
		test1,
		test2,
		test3,
		test4,
	};
})();
