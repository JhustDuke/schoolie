import { searchAndCogRefs as navRefs } from "../view/refs/searchAndCogRefs";
import { navBarMethods as methods } from "../view";

export const navBarController = (function (
	domRefs = navRefs,
	navBarMethods = methods
) {
	const { settingsCog, settingsPanel, searchInput } = domRefs;
	console.log("navBar controller initialized");

	// hide settings panel by default
	navBarMethods.DOMDefaultState();

	// toggle settings panel when cog is clicked
	settingsCog?.addEventListener("click", navBarMethods.toggleCogDisplay);

	domRefs.closeSettingsIcon?.addEventListener(
		"click",
		navBarMethods.toggleCogDisplay
	);

	searchInput?.addEventListener("keyup", function (e: KeyboardEvent) {
		if (e.key === "Enter") {
			navBarMethods.search();
		}
	});
})();
