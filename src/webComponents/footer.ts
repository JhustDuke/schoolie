class AppFooter extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
     <footer class="blue darken-3 text-white text-center py-3">
       &copy; ${new Date().getFullYear()} Your App – All rights reserved
     </footer>
   `;
	}

	connectedCallback() {
		console.log("footer connected ");
	}
}

// Define the custom element
customElements.define("app-footer", AppFooter);
