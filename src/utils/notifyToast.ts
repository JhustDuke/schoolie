import { addElemToDom } from "./";

addElemToDom;
export function notifyToast({
	text,
	type = "success", // "success" | "error"
	timeout = 5000,
	parentElem = document.body,
}: {
	text: string;
	type?: "success" | "error";
	timeout?: number;
	parentElem?: HTMLElement;
}) {
	const classMap = {
		success: "green green-darken-4 white-text mt-2",
		error: "red red-darken-4 white-text mt-2",
	};

	addElemToDom({
		parentElem,
		typeOfElem: "div",
		textContent: text,
		elemAttributes: {
			class: `mx-auto p-3 w-50 isAbsolute text-center ${classMap[type]}`,
			style: "left:30%;",
		},
		pluginFunc: function (parentElem, newElem) {
			if (!newElem || !parentElem) return;
			parentElem.append(newElem);
			setTimeout(() => newElem.remove(), timeout);
		},
	});
}
