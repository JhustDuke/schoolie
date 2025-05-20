class sessionModal extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<section>
				<div
					class="center px-2 py-1 w-50 text-center mx-auto isRelative grey darken-3"
					id="addSessionModal"
					style="z-index: 4">
					<!-- Close Modal Button -->
					<span
						class="red-text isAbsolute hover"
						style="right: 8px; top: 0"
						id="closeModalBtn">
						<i
							class="fa fa-window-close"
							aria-hidden="true"></i>
					</span>

					<div>
						<!-- Modal Instruction -->
						<p class="form-text white-text fw-medium text-capitalize">
							Please register a session year <br />
							<span id="modalHelp">YYYY/YYYY</span>
						</p>
						<!-- Input Field for Session Name -->
						<input
							type="text"
							class="form-control my-0"
							id="sessionModalInput" />
						<br />
						<!-- Submit Button -->
						<button
							disabled
							class="btn btn-primary w-100"
							id="addSessionBtn"
							>Add Session</button
						>
					</div>
				</div>
			</section>`;
	}
	connectedCallback() {
		console.log("sessionModal added to the dom");
	}
}

customElements.define("app-add-session-modal", sessionModal);
