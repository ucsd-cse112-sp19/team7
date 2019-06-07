import {Comment} from "../pages/element/script/Comment.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-comment unit", () => {
  let comment;
  let shadow;

  beforeEach( async () => {
    comment = document.createElement("sds-comment");
    shadow = comment.shadowRoot;
    document.body.appendChild(comment);
  });

  afterEach(() => {
    document.body.removeChild(comment);
  });

  it("Unit test 1: check color attribute is correct", async () => {
    // change the color
    comment.setAttribute("color", "rgb(1, 35, 69)");
    
    var styleSheet = shadow.querySelector("style").sheet;
    var i;
    var flag = false;
    for (i = 0; i < styleSheet.cssRules.length; i++) {
      var rule = styleSheet.cssRules[i];
      if (rule.selectorText === "#entry") {
        "rgb(1, 35, 69)".should.equal(rule.style.background);
        flag = true;
      }
    }
    assert(flag); // always false
  });
});
