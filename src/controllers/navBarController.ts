import { navCogRefs as navRefs } from "../view/refs/navCogRefs";
import { navBarMethods } from "../view";

export const navBarController = (function (domRefs = navRefs) {
	const { settingsCog, settingsPanel } = domRefs;
	console.log("navBar controller initialized");

	// hide settings panel by default
	navBarMethods.domDefaultState();
	// toggle settings panel when cog is clicked
	settingsCog?.addEventListener("click", navBarMethods.toggleCogDisplay);

	domRefs.closeSettingsIcon?.addEventListener(
		"click",
		navBarMethods.toggleCogDisplay
	);

	// you can add more listeners here if needed
	console.log("ran navbar controller ");
})();
