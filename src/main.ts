// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./webComponents";

import { sessionModalController, tabsController } from "./eventListeners";

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		sessionModalController;
		tabsController;
	});
})();
