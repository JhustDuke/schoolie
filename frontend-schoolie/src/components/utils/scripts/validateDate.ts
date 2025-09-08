import { addElemToDom, showErrMsg } from "./";

export function validateDob<S extends object, K extends keyof S>({
	statesObj,
	prop,
	inputElem,
}: {
	inputElem: HTMLInputElement;
	statesObj: S;
	prop: K;
}) {
	const dobValue = inputElem?.value.trim();
	const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!dobValue || !dobRegex.test(dobValue)) {
		addElemToDom({
			parentElem: inputElem!.parentElement!,
			typeOfElem: "span",
			textContent: "Please enter a valid date (YYYY-MM-DD)",
			elemAttributes: { class: "text-danger mt-1" },
			pluginFunc: showErrMsg,
		});
		statesObj[prop] = false as S[K];
	} else {
		statesObj[prop] = true as S[K];
	}
}
