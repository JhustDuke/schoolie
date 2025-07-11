import { notifyToast } from "../../utils/notifyToast.js";
import { searchAndCogRefs } from "../refs/searchAndCogRefs.js";

export const navBarMethods = (function (refs = searchAndCogRefs) {
	function DOMDefaultState() {
		const { settingsPanel } = refs;
		settingsPanel!.style.display = "none";
	}

	function toggleCogDisplay() {
		if (!refs.settingsCog || !refs.settingsPanel) {
			console.warn("Navbar refs not found");
			return;
		}
		if (refs.settingsPanel.style.display === "none") {
			refs.settingsPanel.style.display = "block";
		} else if (refs.settingsPanel.style.display === "block") {
			refs.settingsPanel.style.display = "none";
		}
	}
	function validateSearch(input: string): boolean | any {
		const blacklist = /[<>/"'`]|(script|onerror|onload|javascript):?/i;
		if (blacklist.test(input) === true) {
			return false;
		}
		const criteria = /@(\w+)=([\w-]+)/g;
		const inputArr = [...input.matchAll(criteria)];

		const matchedKeyValueObj: Record<string, string> = {};
		inputArr.map(function (entry: any) {
			matchedKeyValueObj[entry[1].toLowerCase()] = entry[2].toLowerCase();
		});
		return matchedKeyValueObj;
	}

	function search() {
		const { searchInput } = refs;
		const searchValue = (searchInput as HTMLInputElement)?.value;
		let safeValue: any = validateSearch(searchValue);

		if (safeValue === false) {
			notifyToast({
				type: "error",
				text: "Input must match @key=value format (letters, digits, hyphens allowed)",
				parentElem: document.getElementById("app") as any,
			});
		}

		console.log(safeValue);
	}

	return { toggleCogDisplay, DOMDefaultState, search };
})();
