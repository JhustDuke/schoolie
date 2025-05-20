import { get } from "mongoose";
import { addElemToDom } from "../utils";
import { tabsRefs as refs } from "./";

export const tabsMethods = (function (tabsRefs = refs) {
	const overviewFunc = function () {
		const { overViewTabBtn } = tabsRefs;

		if (!overViewTabBtn) {
			console.log("tab button not found");
		}
	};

	const gradeOneTabFunc = function () {
		const { gradeOneTabBtn } = tabsRefs;

		if (!gradeOneTabBtn) {
			console.log("tab button not found");
		}
	};
	const gradeTwoTabFunc = function () {
		const { gradeTwoTabBtn } = tabsRefs;

		if (!gradeTwoTabBtn) {
			console.log("tab button not found");
		}
	};
	const gradeThreeTabFunc = function () {
		const { gradeThreeTabBtn } = tabsRefs;

		if (!gradeThreeTabBtn) {
			console.log("tab button not found");
		}
	};
	const moreTabFunc = function () {
		const { moreTabBtn, tabsMenu } = tabsRefs;
		if (!moreTabBtn) {
			console.log("more tab button not found");
			return;
		}
		if (!tabsMenu) {
			console.log("tabsMenu not found");
			return;
		}
		addElemToDom({
			typeOfElem: "div",
			parentElem: tabsMenu,
			textContent: "test",
			pluginFunc: function (parent: any, newElem) {
				const referencBtn = parent?.querySelector("#moreTabBtn");
				newElem?.classList.add("btn", "btn-custom", "mx-1");
				newElem!.style.width = "100px";
				if (referencBtn) {
					parent?.insertBefore(newElem, referencBtn);
				}
			},
		});
	};
	return {
		overviewFunc,
		gradeOneTabFunc,
		gradeTwoTabFunc,
		gradeThreeTabFunc,
		moreTabFunc,
	};
})();
