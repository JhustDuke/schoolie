import { domUtils, addToTabMenuHelper } from "../../utils";
import { tabsRefs as refs } from "../";

export const tabsMethods = (function (tabsRefs = refs) {
	const elemDefaultStates = function () {
		const { addClassModal } = tabsRefs;

		addClassModal!.style.display = "none";
	};
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
		/**
		 * what do i want
		 * when i click the more tab i need modal to appear
		 * when any preset class is clicked i want it to be added to the tabs menu
		 * if a custom class is choosen i need to perform validation
		 * so the more tab function should just toggle the modal display
		 */
		const { moreTabBtn, tabsMenu, addClassModal } = tabsRefs;
		if (!moreTabBtn) {
			console.log("more tab button not found");
			return;
		}
		if (!tabsMenu) {
			console.log("tabsMenu not found");
			return;
		}

		domUtils.toggleVisibility({ targetElem: addClassModal, shouldShow: true });

		// addElemToDom({
		// 	typeOfElem: "div",
		// 	parentElem: tabsMenu,
		// 	textContent: "test",
		// 	pluginFunc: function (parent: any, newElem) {
		// 		const referencBtn = parent?.querySelector("#moreTabBtn");
		// 		newElem?.classList.add("btn", "btn-custom", "mx-1");
		// 		newElem!.style.width = "100px";
		// 		if (referencBtn) {
		// 			parent?.insertBefore(newElem, referencBtn);
		// 		}
		// 	},
		// });
	};

	const addPresetClassFunc = function (elem: Event) {
		const doubleClickedElem = elem.target as HTMLElement;
		const { jss1Btn, jss2Btn, jss3Btn, ss1Btn, ss2Btn, ss3Btn, tabsMenu } =
			tabsRefs; //check if element already exist in tabsMenu
		switch (doubleClickedElem) {
			case jss1Btn:
				addToTabMenuHelper(tabsMenu, jss1Btn);
				break;
			case jss2Btn:
				addToTabMenuHelper(tabsMenu, jss2Btn);
				break;
			case jss3Btn:
				addToTabMenuHelper(tabsMenu, jss3Btn);
				break;
			case ss1Btn:
				addToTabMenuHelper(tabsMenu, ss1Btn);
				break;
			case ss2Btn:
				addToTabMenuHelper(tabsMenu, ss2Btn);
				break;
			case ss3Btn:
				addToTabMenuHelper(tabsMenu, ss3Btn);
				break;
		}
	};
	const closeAddClassModal = function () {
		const { addClassModal } = tabsRefs;
		domUtils.toggleVisibility({ targetElem: addClassModal });
	};
	return {
		elemDefaultStates,
		overviewFunc,
		gradeOneTabFunc,
		gradeTwoTabFunc,
		gradeThreeTabFunc,
		moreTabFunc,
		addPresetClassFunc,
		closeAddClassModal,
	};
})();
