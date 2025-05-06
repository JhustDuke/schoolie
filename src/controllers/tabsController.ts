import { tabsRefs as refs } from "../view";
import { tabsMethods } from "../view";
tabsMethods;
export const tabsController = (function (tabsRefs = refs) {
	console.log("tabs controllers ran");
	const {
		overViewTabBtn,
		gradeOneTabBtn,
		gradeTwoTabBtn,
		gradeThreeTabBtn,
		moreTabBtn,
	} = tabsRefs;

	overViewTabBtn?.addEventListener("click", tabsMethods.test0);

	gradeOneTabBtn?.addEventListener("click", tabsMethods.test1);

	gradeTwoTabBtn?.addEventListener("click", tabsMethods.test2);

	gradeThreeTabBtn?.addEventListener("click", tabsMethods.test3);

	moreTabBtn?.addEventListener("click", tabsMethods.test4);
})();
