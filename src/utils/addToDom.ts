function createElem(typeOfElem: keyof HTMLElementTagNameMap): HTMLElement {
	return document.createElement(typeOfElem);
}
function applyAttributes(
	elem: HTMLElement,
	attributes: { [key: string]: any }
): void {
	for (const [key, value] of Object.entries(attributes)) {
		if (typeof value === "boolean") {
			// Use property assignment for boolean attributes
			(elem as any)[key] = value;
		} else {
			elem.setAttribute(key, value);
		}
	}
}

interface AddElemToDomOptions {
	parentElem?: HTMLElement | null;
	typeOfElem: keyof HTMLElementTagNameMap;
	textContent?: string;
	elemAttributes?: { [key: string]: any };
	pluginFunc?: (parentElem?: HTMLElement, newElem?: HTMLElement) => void;
}

/**
 * Dynamically creates and inserts an HTML element into the DOM.
 * See detailed docs in previous response.
 */
export function addElemToDom({
	parentElem = document.body,
	typeOfElem,
	textContent = "placeholder",
	elemAttributes = {},
	pluginFunc,
}: AddElemToDomOptions) {
	if (!(parentElem instanceof HTMLElement)) {
		console.log(`${parentElem} is not a valid HTML element`);
		return;
	}

	const createdElem = createElem(typeOfElem);
	createdElem.textContent = textContent;

	if (elemAttributes) {
		applyAttributes(createdElem, elemAttributes);
	}

	if (typeof pluginFunc === "function") {
		pluginFunc(parentElem, createdElem);
	} else {
		parentElem.appendChild(createdElem);
	}
}
