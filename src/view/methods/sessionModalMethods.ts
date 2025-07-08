import {
	isValidYearFormat,
	addElemToDom as addToSelectOption,
	domUtils as modalUtils,
	insertBeforeAddSession,
	notifyToast,
} from "../../utils";
import { domRefs as domElements } from "..";
import { sessionModel as ssModel } from "../../model";

export const sessionModalMethods = (function (
	domRefs = domElements,
	sessionModel = ssModel
) {
	const DOMDefaultState = async function () {
		await Promise.all([elementDefaultState(), populateSessionSelect()]);
	};
	const elementDefaultState = async function () {
		const modalDiv = domRefs.sessionModal;
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const modalSelectElem = domRefs.selectElem;

		if (!modalDiv || !modalSelectElem || !modalSubmitBtn) return;

		//disabled elements
		modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: false });
		modalSubmitBtn!.disabled = true;

		const sessionDataFromDb = await sessionModel.loadSessionYears();
		if (!sessionDataFromDb) {
			addToSelectOption({
				parentElem: modalSelectElem,
				typeOfElem: "option",
				textContent: "no sessions registered click addSession to register",
				elemAttributes: {
					disabled: true,
					id: "noSession",
				},
				pluginFunc: insertBeforeAddSession,
			});
			return;
		}
	};
	const populateSessionSelect = async function () {
		const selectElem = domRefs.selectElem;
		if (!selectElem) {
			console.error("selectElem not found");
			return;
		}

		const data = await sessionModel.loadSessionYears();
		if (!data || data.length === 0) {
			console.log("No session years available");
			return;
		}
		console.log(selectElem);
		data.forEach(function (sessionYear) {
			addToSelectOption({
				parentElem: selectElem,
				typeOfElem: "option",
				textContent: sessionYear,
				elemAttributes: { value: sessionYear },
				pluginFunc: insertBeforeAddSession,
			});
		});
	};

	const displayModal = function (): void {
		const modalSelectElem = domRefs.selectElem;
		const modalDiv = domRefs.sessionModal;

		if (!modalSelectElem || modalSelectElem.selectedIndex < 0) {
			console.log("error: element is null");
			return;
		}

		if (!modalDiv) {
			console.log("modal div not found");
			return;
		}

		// //there are no stored session in the db
		// if (!sessionModel.loadSessionYears()) {
		// 	modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: true });
		// }
		//the user selected the addSession value
		modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: true });
	};

	const updateModalUI = function (): void {
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const userInputs = domRefs.sessionModalInput?.value.trim();
		const userInputIsValid = isValidYearFormat(userInputs as string);
		const modalHelp = domRefs.modalHelp;

		if (!modalHelp) return;

		if (userInputIsValid) {
			modalSubmitBtn!.disabled = false;
			modalUtils.toggleVisibility({ targetElem: modalHelp });
		} else {
			modalSubmitBtn!.disabled = true;

			// Only update hintText if it's empty or different
			const newHint = "input must be in the format YYYY/YYYY";
			if (modalHelp.textContent?.trim() !== newHint) {
				modalUtils.inputHintHelper({
					hintText: newHint,
					classListStyling: "+text-capitalize",
					targetElem: modalHelp,
				});
			}
		}
	};

	const watchModal = function (): void {
		console.log(" ran watch modal");
		//displayModal();
		updateModalUI();
	};
	const addNewSession = function (): void {
		const sessionValue = domRefs.sessionModalInput?.value;
		const parentElem = domRefs.selectElem;
		const modalHelp = domRefs.modalHelp;
		const submitBtn = domRefs.modalSubmitBtn;

		if (!parentElem || !sessionValue || !submitBtn) {
			console.log("missing elements");
			return;
		}

		const initialBtnTextContent = submitBtn.innerHTML;

		submitBtn.innerHTML =
			'<span class="spinner-border spinner-border-sm"></span> Adding...';

		sessionModel
			.addNewSessionYear(sessionValue)
			.then(function () {
				addToSelectOption({
					textContent: sessionValue,
					parentElem,
					typeOfElem: "option",
					elemAttributes: { value: sessionValue },
					pluginFunc: insertBeforeAddSession,
				});
				removeNoSessionOption();
				clearModalInputs();
				hideModal();
				notifyToast({
					text: `session ${sessionValue} added succesfull`,
					type: "success",
					parentElem: <any>document.getElementById("app"),
				});
			})
			.catch(function (err) {
				notifyToast({
					text: `error adding ${sessionValue} reason:${err.message}`,
					type: "error",
					timeout: 15000,
					parentElem: <any>document.getElementById("app"),
				});
				hideModal();
				console.error("Failed to add session year", err);
			})
			.finally(function () {
				submitBtn.innerHTML = initialBtnTextContent;
			});
	};

	const hideModal = function (): void {
		const modalDiv = domRefs.sessionModal;
		if (!modalDiv) {
			console.log("modalDiv not found");
			return;
		}
		modalUtils.toggleVisibility({
			targetElem: modalDiv,
			shouldShow: false,
		});
		console.log("modal closed");
	};
	const clearModalInputs = function (): void {
		const userInputs = domRefs.sessionModalInput;
		const helpText = domRefs.modalHelp;
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		if (!userInputs || !helpText || !modalSubmitBtn) {
			console.log("either userInputs,helpText, modalSubmitBtn mising");
			return;
		}

		modalUtils.clearInputs({
			targetElem: domRefs.sessionModalInput,
			hintElem: domRefs.modalHelp,
			submitBtn: domRefs.modalSubmitBtn,
		});
	};
	const removeNoSessionOption = function () {
		// Remove the default noSession option
		const selectElem = domRefs.selectElem;
		const noSessionOption = selectElem?.querySelector("#noSession");

		noSessionOption ? noSessionOption.remove() : null;
	};

	return {
		DOMDefaultState,

		hideModal,
		displayModal,
		updateModalUI,
		watchModal,
		addNewSession,
	};
})();
