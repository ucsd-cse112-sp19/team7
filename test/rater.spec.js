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

  it("Unit test 6: check if clicking on stars is working", async () => {
    //first check for original class of star
    rater.setAttribute("max", "6");
    const star2 = shadow.querySelector("#\\32");
    " el-rate__icon  el-icon-star-off".should.equal(star2.className);

    //click a star further on
    const star4 = shadow.querySelector("#\\34");
    star4.click();
   
    //check to make sure it has changed class
    " el-rate__icon   el-icon-star-on".should.equal(star2.className);

    //check to see if the clicked star changed class as well
    " el-rate__icon   el-icon-star-on".should.equal(star4.className);

    //check that further along star didn't change at all
    const star5 = shadow.querySelector("#\\35");
    " el-rate__icon   el-icon-star-off".should.equal(star5.className);

    //check to make sure that the after message is set correctly
    "Glad".should.equal(shadow.querySelector("div p").textContent);
  
  });

  it("Unit test 7: checking if v-model correctly sets the stars", async () => {
    rater.setAttribute("v-model", "2");
    " el-rate__icon   el-icon-star-on".should.equal(shadow.querySelector("#\\32").className);
  
    //move v-model back and check to see that the star isn't set anymore 
    rater.setAttribute("v-model", "1");
    " el-rate__icon    el-icon-star-off".should.equal(shadow.querySelector("#\\32").className);
   
  });

  it("Unit test 7: check disabled attribute is correct", async () => {
    rater.setAttribute("disabled", "");
    var items = shadow.querySelectorAll("div span");
    var i;
    
    for(i = 0; i < rater.max; i++) {
      expect(items[i].className).to.include('disabled')
    }
  });

  it("Unit test 8: check disabled attribute is correct", async () => {
    rater.setAttribute("disabled", "");
    var items = shadow.querySelectorAll("div span");
    var i;
    
    for(i = 0; i < rater.max; i++) {
      expect(items[i].className).to.include('disabled')
    }
  });
  
});