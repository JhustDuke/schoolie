export class TabsSection extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<section id="tabsWrapper">
  <div class="nav justify-content-start flex-wrap gap-2" id="tabsMenu">
    <a class="btn btn-custom mx-1 active" style="width: 100px" id="overViewTabBtn" data-bs-target="#overViewTabContents" data-bs-toggle="tab">Overview</a>
    <a class="btn btn-custom mx-1" style="width: 100px" id="gradeOneTabBtn" data-bs-target="#gradeOneTabContents" data-bs-toggle="tab">Grade-1</a>
    <a class="btn btn-custom mx-1" style="width: 100px" id="gradeTwoTabBtn" data-bs-target="#gradeTwoTabContents" data-bs-toggle="tab">Grade-2</a>
    <a class="btn btn-custom mx-1" style="width: 100px" id="gradeThreeTabBtn" data-bs-target="#gradeThreeTabContents" data-bs-toggle="tab">Grade-3</a>
    <button class="btn btn-custom mx-1" style="width: 120px" type="button" id="moreTabBtn">More+</button>
  </div>

  <div class="tab-content" id="tabsContentsWrapper">
    <!-- Overview Tab -->
    <div class="active tab-pane mt-4 p-3 rounded blue-grey lighten-5 shadow text-center text-md-start" id="overViewTabContents">
      <div class="row g-4 justify-content-center">
        <div class="col-md">
          <div class="p-3 rounded white">
            <h5>Total Classes</h5>
            <p class="fs-4 fw-bold" id="totalClasses">12</p>
          </div>
        </div>
        <div class="col-md">
          <div class="p-3 rounded white">
            <h5>Gender summary</h5>
            <div class="d-flex justify-content-center gap-4 mt-2">
              <div><i class="fa fa-male blue-text fa-2x"></i><div class="fw-bold" id="maleGenderTotal">99</div></div>
              <div><i class="fa fa-female pink-text fa-2x"></i><div class="fw-bold" id="femaleGenderTotal">98</div></div>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="p-3 rounded white">
            <h5>Total Pupils</h5>
            <p class="fs-4 fw-bold" id="totalPupils">385</p>
          </div>
        </div>
        <div class="col-12">
          <div class="p-3 rounded white">
            <h5>Recently Added Pupil</h5>
            <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-around align-items-center align-items-md-start p-3 flex-wrap text-center text-md-start">
              <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
              <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
              <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="p-3 rounded z-depth-1 white">
            <h5>Class Summary</h5>
            <div class="row g-3 justify-content-center">
              <div class="col-md-3">
                <div class="p-2 border rounded">
                  <h6>Grade 1</h6>
                  <p id="gradeOneTotal">Total: 120</p>
                  <p id="gradeOneBoysTotal">Boys: 60</p>
                  <p id="gradeOneGirlsTotal">Girls: 60</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-2 border rounded">
                  <h6>Grade 2</h6>
                  <p id="gradeTwoTotal">Total: 130</p>
                  <p id="gradeTwoBoysTotal">Boys: 65</p>
                  <p id="gradeTwoGirlsTotal">Girls: 65</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="p-2 border rounded">
                  <h6>Grade 3</h6>
                  <p id="gradeThreeTotal">Total: 135</p>
                  <p id="gradeThreeBoysTotal">Boys: 70</p>
                  <p id="gradeThreeGirlsTotal">Girls: 65</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 rounded z-depth-1 white">
            <h5>Recently Updated </h5>
            <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
            <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
            <student-card name="Aisha Bello" age="13" mother-phone="0802 456 7890" father="Mr. Bello" contact="23 Unity Rd" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
          </div>
        </div>
      </div>
    </div>

    <div id="gradeOneTabContents" class="tab-pane fade" style="height: 200px">
      <div>grade 1 tab contents</div>
      <student-card name="Jane Doe" age="14" mother-phone="0801 234 5678" father="John Doe" contact="1234 Maple Street" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
    </div>

    <div id="gradeTwoTabContents" class="tab-pane fade">
      <div><div> grade 2 tab contents </div></div>
      <section class="d-flex flex-wrap justify-content-around gap-1">
        <student-card name="Jane Doe" age="14" mother-phone="0801 234 5678" father="John Doe" contact="1234 Maple Street" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
        <student-card name="Jake Smith" age="15" mother-phone="0802 345 6789" father="Robert Smith" contact="5678 Oak Avenue" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
        <student-card name="Lily Adams" age="13" mother-phone="0803 456 7890" father="Michael Adams" contact="9102 Pine Street" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
      </section>
    </div>

    <div id="gradeThreeTabContents" class="tab-pane fade">
      <div>grade 3 tab contents</div>
      <section class="d-flex flex-wrap gap-2" style="height: 150px !important">
        <student-card name="Jane Doe" age="14" mother-phone="0801 234 5678" father="John Doe" contact="1234 Maple Street" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
        <student-card name="Jake Smith" age="15" mother-phone="0802 345 6789" father="Robert Smith" contact="5678 Oak Avenue" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
        <student-card name="Lily Adams" age="13" mother-phone="0803 456 7890" father="Michael Adams" contact="9102 Pine Street" image="/490473425_1221928799315994_7573465244633480520_n.jpg"></student-card>
      </section>
    </div>

    <div id="moreTabContents" class="fade" data-bs-keyboard="false" tabindex="-1" data-bs-backdrop="static">more tab contents</div>
    <add-class-modal></add-class-modal>
  </div>
</section>
		`;
	}
}
customElements.define("app-tabs-section", TabsSection);
