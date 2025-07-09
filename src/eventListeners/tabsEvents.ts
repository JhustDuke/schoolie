import { tabsRefs as refs } from "../view";
import { tabsMethods as methods } from "../view";

export const tabsController = (function (
	tabsRefs = refs,
	tabsMethods = methods
) {
	console.log("tabs controllers ran");
	const {
		overViewTabBtn,
		gradeOneTabBtn,
		gradeTwoTabBtn,
		gradeThreeTabBtn,
		moreTabBtn,
		addClassModal,
		closeAddClassIcon,
	} = tabsRefs;

	window.addEventListener("change", async function () {
		await tabsMethods.getTotals();
	});

	if (window.location.pathname === "/") {
		tabsMethods.elemDefaultStates();
	}

	overViewTabBtn?.addEventListener("click", tabsMethods.overviewFunc);

	gradeOneTabBtn?.addEventListener("click", tabsMethods.gradeOneTabFunc);

	gradeTwoTabBtn?.addEventListener("click", tabsMethods.gradeTwoTabFunc);

	gradeThreeTabBtn?.addEventListener("click", tabsMethods.gradeThreeTabFunc);

	moreTabBtn?.addEventListener("click", tabsMethods.moreTabFunc);

	addClassModal?.addEventListener("dblclick", tabsMethods.addPresetClassFunc);

	closeAddClassIcon?.addEventListener("click", tabsMethods.closeAddClassModal);
})();
