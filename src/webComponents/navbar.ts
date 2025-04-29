export class navBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
     <nav class="navbar px-2 py-3 blue darken-3">
       <div class="container-fluid justify-content-between align-items-center">
         <div class="d-flex gap-3">
           <a href="#" class="nav-link white-text">Home</a>
           <a href="#" class="nav-link white-text">About</a>
         </div>
         <div class="d-none d-md-flex align-items-center gap-2 border px-3 py-1 rounded-pill">
           <input type="text" class="form-control shadow-none white-text" placeholder="Search..." style="outline: none; border: none; background-color: transparent;" />
           <span><i class="fa fa-info blue-grey yellow-text text-lighten-4 px-2 py-1 rounded-pill" aria-hidden="true"></i></span>
         </div>
         <div class="d-flex gap-3 align-items-center">
           <a href="#" class="nav-link white-text d-none d-md-inline">Contact</a>
           <select class="form-select" id="select" style="border-radius: 20px; width: auto">
             <option selected disabled value="chooseSession" id="chooseSession">Choose session</option>
             <option value="addSession" id="addSession">Add Session</option>
           </select>
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
