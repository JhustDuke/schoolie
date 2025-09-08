import { addElemToDom, showErrMsg } from "./";

export const validateAddressField = function <
	S extends object,
	K extends keyof S
>({
	inputElem,
	prop,
	statesObj,
	errMsg = "Address must be at least 10 characters long",
}: {
	inputElem: HTMLTextAreaElement;
	prop: K;
	statesObj: S;
	errMsg?: string;
}) {
	const input = inputElem.value.trim();
	const isValid = input.length >= 10;

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement!,
			typeOfElem: "span",
			textContent: errMsg,
			elemAttributes: { class: "text-danger fw-small" },
			pluginFunc: showErrMsg,
		});
		statesObj[prop] = false as S[K];
	} else {
		statesObj[prop] = true as S[K];
	}
};
