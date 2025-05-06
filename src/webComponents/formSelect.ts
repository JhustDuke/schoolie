export class FormSelect extends HTMLElement {
	constructor() {
		super();
		const label = this.getAttribute("label") || "";
		const id = this.getAttribute("id") || "";
		const rawOptions = this.getAttribute("options") || "[]";
		let options = [];

		try {
			options = JSON.parse(rawOptions);
		} catch (e) {
			console.error("Invalid JSON for options attribute:", e);
		}

		this.innerHTML = `
			<div class="mb-3">
				<label for="${id}" class="form-label">${label}</label>
				<select class="form-select" id="${id}">
					${options
						.map((opt: any) => {
							const label = opt.label || opt.value;
							const value = opt.value || "";
							const disabled = opt.disabled ? "disabled" : "";
							const selected = opt.selected ? "selected" : "";
							return `<option value="${value}" ${disabled} ${selected}>${label}</option>`;
						})
						.join("")}
				</select>
			</div>
		`;
	}
}
customElements.define("form-select", FormSelect);
