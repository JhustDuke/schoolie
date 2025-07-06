import { sessionModalMethods } from "../view";
import { domRefs as refs } from "../view";

export const sessionModalController = (async function (domRefs = refs) {
	const modalSelectElem = domRefs.selectElem;
	const userInputs = domRefs.sessionModalInput;
	const modalSubmitBtn = domRefs.modalSubmitBtn;
	const closeModalIcon = domRefs.closeModalBtn;
	const { addSessionOption } = domRefs;

	// load default state
	await sessionModalMethods.DOMDefaultState();

	modalSelectElem!.addEventListener("change", sessionModalMethods.watchModal);

	addSessionOption!.addEventListener("click", sessionModalMethods.displayModal);

	// modal input field
	userInputs!.addEventListener("input", sessionModalMethods.updateModalUI);

	closeModalIcon!.addEventListener("click", sessionModalMethods.hideModal);
	modalSubmitBtn?.addEventListener("click", sessionModalMethods.addNewSession);
})();
