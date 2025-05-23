class SideNav extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
      <ul class="nav flex-column">
        <li class="nav-item ">
          <a class="nav-link  text-uppercase fw-medium active" href="#">
          overview
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-uppercase fw-medium" href="#">
          timetable/scheduling
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-uppercase fw-medium " href="#">
         about
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-medium text-capitalize " href="#">
         contact
          </a>
        </li>
      </ul>
    `;
	}
}
customElements.define("app-aside-nav", SideNav);
