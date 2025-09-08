import { addElemToDom, showErrMsg } from "./";

export const validatePhoneField = function <
	S extends object,
	K extends keyof S
>({
	inputElem,
	prop,
	statesObj,
}: {
	inputElem: HTMLInputElement;
	prop: K;
	statesObj: S;
}) {
	const phoneRegex = /^\d{11}$/;
	const isValid = phoneRegex.test(inputElem.value.trim());

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement!,
			typeOfElem: "span",
			textContent: "Invalid phone number",
			elemAttributes: { class: "text-danger mt-1" },
			pluginFunc: showErrMsg,
		});
		statesObj[prop] = false as S[K];
	} else {
		statesObj[prop] = true as S[K];
	}
};
