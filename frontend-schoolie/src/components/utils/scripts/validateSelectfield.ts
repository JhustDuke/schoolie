import { addElemToDom, showErrMsg } from "./";

export const validateSelectField = function <
	stateObjType extends object,
	Keytype extends keyof stateObjType
>({
	selectElem,
	prop,
	stateObj,
	invalidValue,
	errorMsg = "select or reselect an option",
}: {
	selectElem: HTMLSelectElement;
	prop: Keytype;
	stateObj: stateObjType;
	invalidValue: string;
	errorMsg?: string;
}) {
	const value = selectElem.value.trim();

	if (!value || value === invalidValue) {
		const parentElem = selectElem.parentElement;
		if (parentElem) {
			addElemToDom({
				parentElem: parentElem,
				typeOfElem: "span",
				textContent: errorMsg,
				elemAttributes: { class: "text-danger mt-1" },
				pluginFunc: showErrMsg,
			});
		}
		stateObj[prop] = false as stateObjType[Keytype];
	} else {
		stateObj[prop] = true as stateObjType[Keytype];
	}
};
