// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./webComponents";

import {
	sessionModalController,
	tabsController,
	formController,
} from "./formController";

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		sessionModalController;

		tabsController;

		formController;
	});
})();
