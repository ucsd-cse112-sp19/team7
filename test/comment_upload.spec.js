import {Comment} from "../pages/element/script/Comment.js";
import {Upload} from "../pages/element/script/Upload.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-comment unit", () => {
  let comment;
  let commentShadow;

  beforeEach( async () => {
    comment = document.createElement("sds-comment");
    commentShadow = comment.shadowRoot;
    document.body.appendChild(comment);
  });

  afterEach(() => {
    document.body.removeChild(comment);
  });

  it("Unit test 1: check color attribute is correct", async () => {
    // change the color
    comment.setAttribute("color", "rgb(1, 35, 69)");
    
    var styleSheet = commentShadow.querySelector("style").sheet;
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

  it("Unit test 2: check the disable attribute", async () => {
    comment.disabled = true;
    let t = true;
    t.should.equal(comment.disabled);
    // attribute should be removed correctly
    comment.hasAttribute("disabled").should.equal(true);
    comment.disabled = false;
    comment.hasAttribute("disabled").should.equal(false);
  });

  it("Unit test 3: check the show-rating attribute", async () => {
    comment.showRating = true;
    let t = true;
    t.should.equal(comment.showRating);
    // attribute should be removed correctly
    comment.hasAttribute("show-rating").should.equal(true);
    comment.showRating = false;
    comment.hasAttribute("show-rating").should.equal(false);
  });

  it("Unit test 4: check the hide-comment attribute", async () => {
    comment.hideComment = true;
    let t = true;
    t.should.equal(comment.hideComment);
    // attribute should be removed correctly
    comment.hasAttribute("hide-comment").should.equal(true);
    comment.hideComment = false;
    comment.hasAttribute("hide-comment").should.equal(false);
  });
  
  it("Unit test 5: check the show-tags attribute", async () => {
    comment.showTags = true;
    let t = true;
    t.should.equal(comment.showTags);
    // attribute should be removed correctly
    comment.hasAttribute("show-tags").should.equal(true);
    comment.showTags = false;
    comment.hasAttribute("show-tags").should.equal(false);
  });
 
  it("Unit test 6: check the all-disabled attribute", async () => {
    comment.allDisabled = true;
    let t = true;
    t.should.equal(comment.allDisabled);
    // attribute should be removed correctly
    comment.hasAttribute("all-disabled").should.equal(true);
    comment.allDisabled = false;
    comment.hasAttribute("all-disabled").should.equal(false);
  });

});

describe("sds-upload unit", () => {
  let upload;
  let uploadShadow;


  beforeEach( async () => {

    upload = document.createElement("sds-upload");
    uploadShadow = upload.shadowRoot;
    document.body.appendChild(upload);
  });

  afterEach(() => {
    document.body.removeChild(upload);
  });

  it("Unit test 1: check the getters and setters for drag label", async () => {

    upload.setAttribute("drag", "");
    "".should.equal(upload.shadowRoot.querySelector("div.el-upload-dragger").style.display);
    
  });

  it("Unit test 2: check the getters and setters for hide-file-list", async () => {
    upload.setAttribute("hide-file-list", "");
    "none".should.equal(uploadShadow.querySelector("ul.el-upload-list").style.display);
    let t = true;
    t.should.equal(upload.hasAttribute("hide-file-list"));

    upload.removeAttribute("hide-file-list");
    "".should.equal(uploadShadow.querySelector("ul.el-upload-list").style.display);
    t = false;
    t.should.equal(upload.hasAttribute("hide-file-list"));
  });


  it("Unit test 3: check the getters and setters for display-thumbnail", async () => {
    var list = uploadShadow.querySelector("ul.el-upload-list");
    var item = document.createElement("li");
    item.className += " el-upload-list__item";
    var image = document.createElement("img");
    image.className += " el-upload-list__item-thumbnail";
    item.appendChild(image);
    list.appendChild(item);
    upload.setAttribute("display-thumbnail", "");

    "block".should.equal(uploadShadow.querySelector("ul.el-upload-list li img").style.display);
    let t = true;
    t.should.equal(uploadShadow.querySelector("ul.el-upload-list").className.includes("el-upload-list--picture"));
    t.should.equal(upload.hasAttribute("display-thumbnail"));

    upload.removeAttribute("display-thumbnail");
    "none".should.equal(uploadShadow.querySelector("ul.el-upload-list li img").style.display);
    t = false;
    t.should.equal(uploadShadow.querySelector("ul.el-upload-list").className.includes("el-upload-list--picture"));
    t.should.equal(upload.hasAttribute("display-thumbnail"));
  });

});
