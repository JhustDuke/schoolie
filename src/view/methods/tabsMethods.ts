import { domStaticValues as _domStaticValues } from "../domStaticValues";
import { overviewRefs as _overviewRefs, tabsRefs as refs } from "../refs";
import {
	domUtils as _domUtils,
	addToTabMenuHelper as _addToTabMenuHelper,
	addElemToDom as _addElemToDom,
	notifyToast as _notifyToast,
} from "../../utils";
import { tabsModel as model } from "../../model";

export const tabsMethods = (function (
	tabsRefs = refs,
	tabsModel = model,
	{
		domStaticValues = _domStaticValues,
		domUtils = _domUtils,
		addToTabMenuHelper = _addToTabMenuHelper,
		//	addElemToDom = _addToTabMenuHelper,
		notifyToast = _notifyToast,
		overviewRefs = _overviewRefs,
	} = {}
) {
	const elemDefaultStates = function () {
		const { addClassModal } = tabsRefs;
		addClassModal!.style.display = "none";
	};

	const getTotals = async function () {
		const { domRefs } = await import("../refs/sessnModRefs");
		const selectElem = domRefs.selectElem;

		if (!selectElem) {
			console.error(`element with id selectElem not found`);
			return;
		}

		const selectValue = selectElem.value;
		if (
			selectValue === domStaticValues.chooseSession ||
			selectValue === domStaticValues.addSession
		) {
			return;
		}

		const safeValue = selectValue.replace("/", "_");

		const { femaleGenderTotal, maleGenderTotal, totalClasses, totalPupils } =
			overviewRefs;

		const spinner = `<div class="spinner-border red-text spinner-border-sm " role="status"></div>`;
		femaleGenderTotal!.innerHTML = spinner;
		maleGenderTotal!.innerHTML = spinner;
		totalClasses!.innerHTML = spinner;
		totalPupils!.innerHTML = spinner;

		try {
			const schoolSummary = await tabsModel.getTotals(safeValue);
			if (schoolSummary) {
				femaleGenderTotal!.innerHTML = schoolSummary.total_girls as any;
				maleGenderTotal!.innerHTML = schoolSummary.total_boys as any;
				totalClasses!.innerHTML = schoolSummary.classes as any;
				totalPupils!.innerHTML = (schoolSummary.total_boys +
					schoolSummary.total_girls) as any;
			}
		} catch (err: any) {
			notifyToast({ type: "error", text: err.message });
		}
	};

	const overviewFunc = function () {
		const { overViewTabBtn } = tabsRefs;
		if (!overViewTabBtn) console.log("tab button not found");
	};

	const gradeOneTabFunc = function () {
		const { gradeOneTabBtn } = tabsRefs;
		if (!gradeOneTabBtn) console.log("tab button not found");
	};

	const gradeTwoTabFunc = function () {
		const { gradeTwoTabBtn } = tabsRefs;
		if (!gradeTwoTabBtn) console.log("tab button not found");
	};

	const gradeThreeTabFunc = function () {
		const { gradeThreeTabBtn } = tabsRefs;
		if (!gradeThreeTabBtn) console.log("tab button not found");
	};

	const moreTabFunc = function () {
		const { moreTabBtn, tabsMenu, addClassModal } = tabsRefs;
		if (!moreTabBtn || !tabsMenu) {
			console.log("more tab button or tabsMenu not found");
			return;
		}
		domUtils.toggleVisibility({ targetElem: addClassModal, shouldShow: true });
	};

	const addPresetClassFunc = function (elem: Event) {
		const doubleClickedElem = elem.target as HTMLElement;
		const { jss1Btn, jss2Btn, jss3Btn, ss1Btn, ss2Btn, ss3Btn, tabsMenu } =
			tabsRefs;

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
		getTotals,
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
