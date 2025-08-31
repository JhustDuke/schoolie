import { domStaticValues as _domStaticValues } from "../view/domStaticValues";
import {
	overviewRefs as _overviewRefs,
	tabsRefs as refs,
	domRefs as _domRefs,
} from "../view/refs";
import {
	domUtils as _domUtils,
	addToTabMenuHelper as _addToTabMenuHelper,
	addElemToDom as _addElemToDom,
	notifyToast as _notifyToast,
	addElemToDom,
} from "../utils";
import { tabsModel as model } from "../model";

interface tabhelper {
	parentElem: HTMLElement | null;
	sessionYear: string;
	className: string;
	fetchClassData: any;
	spinner: string;
	domStaticValues: any;
	notify: Function;
	addElemToDom: Function;
}
const tabHelper = async function ({
	parentElem,
	sessionYear,
	className,
	fetchClassData,
	notify,
	addElemToDom,
	spinner,
	domStaticValues,
}: tabhelper) {
	if (
		sessionYear === domStaticValues.addSession ||
		sessionYear === domStaticValues.chooseSession
	) {
		notify({
			type: "error",
			text: "Please select or add a session year to view data",
			parentElem: document.body.querySelector("#app"),
		});
		return;
	}

	parentElem!.innerHTML = `<div class="fs-3 text-center ">${spinner}</div>`;

	try {
		const classData = await fetchClassData(sessionYear, className);
		parentElem!.innerHTML = "";

		if (!classData || classData.length === 0) {
			addElemToDom({
				parentElem,
				typeOfElem: "div",
				elemAttributes: { class: "red-text p-2" },
				textContent: "No data found",
			});
			return;
		}

		classData.forEach(function (entry: any) {
			addElemToDom({
				parentElem,
				typeOfElem: "div",
				textContent: entry.alias,
			});
		});
	} catch (err: any) {
		parentElem!.innerHTML = "";
		notify({
			type: "error",
			text: err.message,
			parentElem: document.body.querySelector("#app"),
		});
		addElemToDom({
			parentElem,
			typeOfElem: "div",
			elemAttributes: { class: "red-text p-2" },
			textContent: err.message,
		});
	}
};

/**
 * to do
 * search via the search bar
 * switch to vue
 * map the component structure
 */
export const tabsMethods = (function (
	tabsRefs = refs,
	tabsModel = model,
	{
		domStaticValues = _domStaticValues,
		domUtils = _domUtils,
		addToTabMenuHelper = _addToTabMenuHelper,
		fetchData = tabHelper,
		notifyToast = _notifyToast,
		overviewRefs = _overviewRefs,
		domRefs = _domRefs,
	} = {}
) {
	const spinner = `<div class="spinner-border red-text spinner-border-sm " role="status"></div>`;
	const elemDefaultStates = function () {
		const { addClassModal } = tabsRefs;
		addClassModal!.style.display = "none";

		const { femaleGenderTotal, maleGenderTotal, totalClasses, totalPupils } =
			overviewRefs;
		const defaultValue = "<span class='red-text'>N/A</span>";
		femaleGenderTotal!.innerHTML = defaultValue;
		maleGenderTotal!.innerHTML = defaultValue;
		totalClasses!.innerHTML = defaultValue;
		totalPupils!.innerHTML = defaultValue;
	};

	const getTotals = async function () {
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

		femaleGenderTotal!.innerHTML = spinner;
		maleGenderTotal!.innerHTML = spinner;
		totalClasses!.innerHTML = spinner;
		totalPupils!.innerHTML = spinner;

		try {
			const schoolSummary = await tabsModel.getSchoolStats(safeValue);
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

	const gradeOneTabFunc = async function () {
		const { gradeOneTabBtn, gradeOneTabContents } = tabsRefs;
		const { selectElem } = domRefs;

		if (!gradeOneTabBtn) {
			alert(`gradeOneTabBtn not found`);
			console.error("tab button not found");
			return;
		}

		await fetchData({
			parentElem: gradeOneTabContents,
			sessionYear: selectElem!.value,
			className: "primary-5",
			fetchClassData: tabsModel.getClassData,
			notify: notifyToast,
			addElemToDom,
			spinner,
			domStaticValues,
		});
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
