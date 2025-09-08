import { showErrMsg, addElemToDom } from "./index";
export const validateNameField = function <
	stateObjectType extends object,
	keyType extends keyof stateObjectType
>({
	inputElem,
	stateProp,
	elementStateObj,
	errMsg = "Input must be text with/out hyphen",
}: {
	inputElem: HTMLInputElement | HTMLTextAreaElement;
	stateProp: keyType;
	elementStateObj: stateObjectType;
	errMsg?: string;
}) {
	const nameRegex = /^[A-Za-z\s-]+$/;
	const input = inputElem.value;
	const isValid = nameRegex.test(input.trim());

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement,
			typeOfElem: "span",
			textContent: errMsg,
			elemAttributes: { class: "text-danger fw-small" },
			pluginFunc: showErrMsg,
		});
		elementStateObj[stateProp] = false as stateObjectType[keyType];
	} else {
		elementStateObj[stateProp] = true as stateObjectType[keyType];
	}
};
