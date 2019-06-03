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
    checkbox.trueLabel = "Some Label"
    "Some Label".should.equal(checkbox.trueLabel)
    // attribute should be changed as well
    checkbox.getAttribute("true-label").should.equal("Some Label")
  });

  it("Unit test 2: check the getters and setters for False labels", async () => {
    checkbox.falseLabel = "Some False Label"
    "Some False Label".should.equal(checkbox.falseLabel)
    // attribute should be changed as well
    checkbox.getAttribute("false-label").should.equal("Some False Label")
  });

  it("Unit test 3: check the functionality disable", async () => {
    checkbox.disabled = true
    let t = true
    t.should.equal(checkbox.disabled)
    // attribute should be removed correctly
    checkbox.hasAttribute("disabled")
  });

  it("Unit test 4: check the default label class name", async () => {
    let lb = shadow.querySelector("label")
    "el-checkbox".should.equal(lb.className);
  });

  
});