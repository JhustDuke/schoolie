class SideNav extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Trending</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Subscriptions</a></li>
      </ul>
    `;
	}
}
customElements.define("app-aside-nav", SideNav);
