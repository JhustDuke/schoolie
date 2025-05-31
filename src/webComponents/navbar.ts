class navBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
      <nav class="navbar px-2 py-3 blue darken-3">
        <div class="container-fluid justify-content-between align-items-center">
          <!-- Left: Logo or Accordion -->
          <div class="d-flex align-items-center">
            <span class="nav-link white-text fw-bold fs-5 d-none d-md-inline">Logo Here</span>
            <button class="btn white-text d-inline d-md-none" type="button">
              <i class="fa fa-bars fs-4"></i>
            </button>
          </div>

          <!-- Center: Search bar -->
          <div class="d-none d-md-flex align-items-center gap-2 border px-3 py-1 rounded-pill">
            <input 
              type="text" 
              class="form-control shadow-none white-text" 
              placeholder="Search..." 
              style="outline: none; border: none; background-color: transparent;" 
            />
            <span>
              <i class="fa fa-info blue-grey yellow-text text-lighten-4 px-2 py-1 rounded-pill" aria-hidden="true"></i>
            </span>
          </div>

          <!-- Right: Session Select + Cog -->
          <div class="d-flex align-items-center gap-3">
            <select class="form-select" id="select" style="border-radius: 20px; width: auto">
              <option selected disabled value="chooseSession" id="chooseSession">Choose session</option>
              <option value="addSession" id="addSession">Add Session</option>
            </select>
            <i class="fa fa-cog white-text fs-5" aria-hidden="true"></i>
          </div>
        </div>
      </nav>
    `;
	}

	connectedCallback() {
		console.log("NavBar connected to the DOM");
	}
}

customElements.define("app-navbar", navBar);
