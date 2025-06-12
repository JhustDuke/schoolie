class navBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<nav class="navbar px-2 py-3 blue darken-3 ">
  <div class="container-fluid justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <span class="nav-link white-text fw-bold fs-5 d-none d-md-inline">Logo Here</span>
      <button class="btn white-text d-inline d-md-none" type="button">
        <i class="fa fa-bars fs-4"></i>
      </button>
    </div>

    <div class="d-none d-md-flex align-items-center gap-2 border px-3 py-1 rounded-pill">
      <input type="text" class="form-control shadow-none white-text" placeholder="Search..."
        style="outline: none; border: none; background-color: transparent;" />
      <span>
        <i class="fa fa-info blue-grey yellow-text text-lighten-4 px-2 py-1 rounded-pill" aria-hidden="true"></i>
      </span>
    </div>

    <div class="d-flex align-items-center gap-3 isRelative">
      <select class="form-select" id="select" style="border-radius: 20px; width: auto">
        <option selected disabled value="chooseSession" id="chooseSession">Choose session</option>
        <option value="addSession" id="addSessionOption">Add Session</option>
      </select>
      <i class="fa fa-cog white-text fs-5" id="settingsCog" style="cursor:pointer;"></i>
    </div>
     <div id="settingsPanel" class="isAbsolute top-100 start-50  mt-2 p-3 bg-white rounded shadow" style="z-index:1000;">
    <h6 class="fw-bold mb-2">Settings</h6>
    <button class="btn btn-sm btn-outline-danger w-100 mb-2">Delete Session</button>
    <button class="btn btn-sm btn-outline-primary w-100 mb-2">Delete Class</button>
    <button class="btn btn-sm btn-outline-success w-100">Other Setting</button>
  </div>
  </div>

 
</nav>
    `;
	}
}

customElements.define("app-navbar", navBar);
