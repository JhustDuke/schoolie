// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./webComponents";

import {
	sessionModalController,
	tabsController,
	formController,
} from "./controllers";

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		if (document.getElementById("#sessionModal")) {
			sessionModalController;
		}
		if (document.getElementById("#tabsContainer")) {
			tabsController;
		}
		if (document.getElementById("form")) {
			formController;
		}
	});
})();
