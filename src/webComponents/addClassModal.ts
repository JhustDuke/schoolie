export class addClassModal extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
  			<center
							id="addClassModal"
							class="p-3 isAbsolute grey lighten-3 w-75 d-none"
							style="
								z-index: 44444;
								top: 0;
								left: 50%;
								transform: translate(-50%, 10%);
								opacity: 0.911343;
							">
							<!-- close addClass btn -->
							<span class="p-1 float-end text-danger">
								<i
									id="closeAddClassIcon"
									class="fa fa-window-close"
									aria-hidden="true"></i>
							</span>
							<div class="mt-3 d-flex justify-content-evenly">
								<div class="row mt-3 justify-content-center">
									<!-- jss1 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="jss1Btn"
											>jss1</button
										>
									</div>
									<!-- jss2 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="jss2Btn"
											>jss2</button
										>
									</div>
									<!-- jss3 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="jss3Btn"
											>jss3</button
										>
									</div>
									<!-- ss1 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="ss1Btn"
											>ss1</button
										>
									</div>
									<!-- ss2 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="ssTwoBtn"
											>ss2</button
										>
									</div>
									<!-- ss3 -->
									<div class="col-6 col-md-auto mb-2">
										<button
											class="btn btn-primary w-100 text-uppercase"
											id="ss3Btn"
											>ss3</button
										>
									</div>
								</div>
							</div>
							<div class="mx-auto mt-3">
								<label
									for="#addCustomClass"
									class="form-label text-left fw-bold text-uppercase red-text text-darken-4"
									>add Custom class</label
								>
								<!-- add custom class -->
								<input
									id="addCustomClassInput"
									type="text"
									class="form-control w-50" />
								<button
									class="btn btn-primary mt-2 text-uppercase w-50"
									id="addCustomClassBtn"
									>add</button
								>
							</div>
						</center>
  `;
	}
}
customElements.define("add-class-modal", addClassModal);
