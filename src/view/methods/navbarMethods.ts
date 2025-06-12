import { navCogRefs } from "../refs/navCogRefs.js";

export const navBarMethods = (function (refs = navCogRefs) {
	function domDefaultState() {
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

	return { toggleCogDisplay, domDefaultState };
})();
