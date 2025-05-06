class StudentCard extends HTMLElement {
	connectedCallback() {
		const name = this.getAttribute("name") || "";
		const age = this.getAttribute("age") || "";
		const motherPhone = this.getAttribute("mother-phone") || "";
		const father = this.getAttribute("father") || "";
		const contact = this.getAttribute("contact") || "";
		const image = this.getAttribute("image") || "";

		this.innerHTML = `
     <div class="card p-2" style="width: 12rem; min-height: 300px;">
       <img src="${image}" class="card-img-top w-100" alt="student info" />
       <div class="card-body p-2">
         <h6 class="card-title text-primary mb-1">${name}</h6>
         <p class="card-text mb-1">Age: ${age}</p>
         <p class="card-text mb-1">Mother: ${motherPhone}</p>
         <p class="card-text mb-1">Father: ${father}</p>
         <p class="card-text mb-2">Contact: ${contact}</p>
         <button class="btn btn-outline-secondary w-100 btn-sm">Update</button>
       </div>
     </div>
   `;
	}
}

customElements.define("student-card", StudentCard);
