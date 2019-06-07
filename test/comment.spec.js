import {Comment} from "../pages/element/script/Comment.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-rate unit", () => {
  let comment;
  let shadow;

  beforeEach( async () => {
    comment = document.createElement("sds-commenter");
    shadow = comment.shadowRoot;
    document.body.appendChild(comment);
  });

  afterEach(() => {
    document.body.removeChild(comment);
  });

  it("Unit test 1: check color attribute is correct", async () => {
    rater.setAttribute("color", "#012345");
   
    "#012345".should.equal(shadow.querySelectorAll("span#entry").background);
  });