import { addElemToDom } from "./addToDom";

addElemToDom;
export function addToTabMenuHelper(
	tabsMenuParent: any,
	doubleClickedClassBtn: HTMLElement | null
) {
	addElemToDom({
		typeOfElem: "a",
		parentElem: tabsMenuParent,
		textContent: doubleClickedClassBtn!.textContent as string,
		pluginFunc: function (parent: HTMLElement | undefined, newElem) {
			const referencBtn = parent?.querySelector<any>("#moreTabBtn");
			const tabBtnStyle = ["btn", "btn-custom", "mx-1"];
			const tabBtnWidth = "100px";
			const newDynamicId = (newElem?.textContent as string) + "TabBtn";

			const currentTabs = tabsMenuParent?.querySelectorAll("a");
			const tabIds = new Set<string>();

			currentTabs?.forEach(function (tab: any) {
				if (tab.id) tabIds.add(tab.id);
			});

			if (tabIds.has(newDynamicId)) {
				console.log("removed duplicate class", newDynamicId);
				return;
			}

			newElem!.classList.add(...tabBtnStyle);
			newElem!.style.width = tabBtnWidth;
			newElem!.id = newDynamicId;
			parent?.insertBefore(newElem as Node, referencBtn);
			console.log("added new tab", newElem);
		},
	});
}
