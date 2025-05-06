export class StudentRegistrationForm extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
			<form class="container bg-light p-4 rounded shadow-sm">
				<slot></slot>
    
					<!-- Submit Button -->
				<center>
					<div
						id="errorFields"
						class="d-none px-1 my-2"
						style="text-overflow: clip"></div>
					<button
						id="studentSubmitBtn"
						style="width: 40% !important"
						type="button"
						class="btn btn-primary"
						>Submit</button
					>
				</center>	<center>
					<button type="submit" class="btn btn-primary mt-3">Submit</button>
				</center>
			</form>
		`;
	}
}
customElements.define("student-registration-form", StudentRegistrationForm);
