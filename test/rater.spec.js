import {Rater} from "../pages/element/script/Rater.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-rate unit", () => {
  let rater;
  let shadow;

  beforeEach( async () => {
    rater = document.createElement("sds-rate");
    shadow = rater.shadowRoot;
    document.body.appendChild(rater);
  });

  afterEach(() => {
    document.body.removeChild(rater);
  });

  it("Unit test 1: check author attribute is correct", async () => {
    rater.setAttribute("author", "Etsu");
   
    "Author: Etsu".should.equal(shadow.querySelector("p#author").textContent);
  });

  it("Unit test 2: check decription atrribute correct", async () => {
    rater.setAttribute("des", "Oscar is a fucking nice dude");
    
    "Description: Oscar is a fucking nice dude".should.equal(shadow.querySelector("p#des").textContent);
  });

  it("Unit test 3: check default rater has img not displayed", async () => {
    
    "none".should.equal(shadow.querySelector("img").style.display);
  });

  it("Unit test 4: check img can be set via attribute", async () => {
    rater.setAttribute("img", "lol.png");
    
    "lol.png".should.equal(rater.getAttribute("img"));
  });

  it("Unit test 5: check if max is creating more stars", async () => {
    rater.setAttribute("max", "6");
    "6".should.equal(shadow.querySelector("#\\36").id + "");
    
    rater.setAttribute("max", "9");
    "9".should.equal(shadow.querySelector("#\\39").id + "");
    "9".should.equal(shadow.querySelectorAll("div i").length + "");
  });

  it("Unit test 6: check the default class of stars", async () => {
    //first check for original class of star
    rater.setAttribute("max", "6");
    const star2 = shadow.querySelector("#\\32");
    assert(star2.className.includes("el-rate__icon"));
    assert(star2.className.includes("el-icon-star-off"));
  });

  it("Unit test 7: checking if clicking on stars changes class", async () => {
    const star2 = shadow.querySelector("#\\32");
    const star4 = shadow.querySelector("#\\34");
    //click a star further on
    star4.click();
   
    //check to make sure it has changed class
    assert(star2.className.includes("el-rate__icon"));
    assert(star2.className.includes("el-icon-star-on"));

    //check to see if the clicked star changed class as well
    assert(star4.className.includes("el-rate__icon"));
    assert(star4.className.includes("el-icon-star-on"));
  });

  it("Unit test 8: checking if clicking on stars changes text", async () => {
    //check that further along star didn't change at all
    const star4 = shadow.querySelector("#\\34");
    const star5 = shadow.querySelector("#\\35");
    assert(star5.className.includes("el-rate__icon"));
    assert(star5.className.includes("el-icon-star-off"));

    //check to make sure that the after message is set correctly
    "".should.equal(shadow.querySelector("div p").textContent);
    star4.click();
    "Glad".should.equal(shadow.querySelector("div p").textContent);
  });

  it("Unit test 9: checking if v-model correctly sets the stars", async () => {
    const star2 = shadow.querySelector("#\\32");
    rater.setAttribute("v-model", "2");
    assert(star2.className.includes("el-rate__icon"));
    assert(star2.className.includes("el-icon-star-on"));
  
    //move v-model back and check to see that the star isn't set anymore 
    rater.setAttribute("v-model", "1");
    assert(star2.className.includes("el-icon-star-off"));   
  });
  
});