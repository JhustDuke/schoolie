import { navBarRefs } from "./navBarRefs.js";

export const navBarMethods = (function (refs = navBarRefs) {
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
