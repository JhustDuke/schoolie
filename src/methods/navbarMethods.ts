import { navBarModel } from "../model/navBarModel.js";
import { notifyToast } from "../utils/notifyToast.js";
import { searchAndCogRefs } from "../view/refs/searchAndCogRefs.js";

export const navBarMethods = (function (
	refs = searchAndCogRefs,
	model = navBarModel
) {
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

	async function search() {
		const { searchInput } = refs;
		const searchValue = (searchInput as HTMLInputElement)?.value;
		let safeValues: any = validateSearch(searchValue);

		if (safeValues === false) {
			return notifyToast({
				type: "error",
				text: "Input must match @key=value format (letters, digits, hyphens allowed)",
				parentElem: document.getElementById("app") as any,
			});
		}

		try {
			const data = await model.searchModel(safeValues);
			console.log(data);
		} catch (error: unknown) {
			console.error("something went wrong");
			throw new Error((error as Error).message);
		}
	}

	return { toggleCogDisplay, DOMDefaultState, search };
})();
