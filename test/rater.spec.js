import {Rater} from "../pages/element/script/Rater.js";

var expect = require("chai").expect;
var should = require("chai").should();

/* please use "" instead of '' */

describe("sds-rate", () => {
  let rater;
  let shadow;

  beforeEach( async () => {
    rater = document.createElement("sds-rate");
    shadow = rater.shadowRoot;
    document.body.appendChild(rater);
  });

  it("Unit test 1: check author attribute is correct", async () => {
    rater.setAttribute("author", "Etsu");
    /*
    const intex = await showroom.find("// #author" );
    const text = await showroom.getTextContent(intex);
    assert.equal("Author: stupidEtsu", text);*/
    //"Etsu".should.equal(rater.getAttribute("author"));
    "Author: Etsu".should.equal(shadow.querySelector("p#author").textContent);
  });

  it("Unit test 2: check decription atrribute correct", async () => {
    rater.setAttribute("des", "Oscar should do more works");
    /*
    const intex = await showroom.find("// #des" );
    const text = await showroom.getTextContent(intex);
    assert.equal("Description: Etsu is dumb", text);*/
    //"Oscar should do more works".should.equal(rater.getAttribute("des"));
    "Description: Oscar should do more works".should.equal(shadow.querySelector("p#des").textContent);
  });

  it("Unit test 3: check default rater has img not displayed", async () => {
    //const intex = await showroom.find("// img" );
    //const text = await showroom.getProperty("src",intex);
    "none".should.equal(shadow.querySelector("img").style.display);
  });

  it("Unit test 4: check img can be set via attribute", async () => {
    rater.setAttribute("img", "lol.png");
    /*
    await showroom.setAttribute("img","lol.png");
    assert.equal("lol.png", await showroom.getAttribute("img"));*/
    "lol.png".should.equal(rater.getAttribute("img"));
  });

  it("Unit test 5: check if max is creating more stars", async () => {
    rater.setAttribute("max", "6");
    "6".should.equal(shadow.querySelector("#\\36").id + "");
    /*
    const instar = await showroom.find("// #\\36");
    const other = await showroom.getProperty("id", instar);
    assert.equal("6", other);*/
    rater.setAttribute("max", "9");
    "9".should.equal(shadow.querySelector("#\\39").id + "");
    "9".should.equal(shadow.querySelectorAll("div i").length + "");
    /*
    await showroom.setAttribute("max", 9);
    const inst = await showroom.find("// #\\39");
    assert.equal("9", await showroom.getProperty("id", inst));*/
  });

  it("Unit test 6: check if clicking on stars is working", async () => {
    //first check for original class of star
    rater.setAttribute("max", "6");
    const star2 = shadow.querySelector("#\\32");
    " el-rate__icon  el-icon-star-off".should.equal(star2.className);
    /*
    const start = await showroom.find("// #\\32");
    const startext = await showroom.getProperty("className", start);
    assert.equal(" el-rate__icon  el-icon-star-off", startext);*/

    //click a star further on
    const star4 = shadow.querySelector("#\\34");
    star4.click();
    /*
    await showroom.page.evaluate(() => {
      showroom.find("// #\\34").click(); 
    });*/

    //check to make sure it has changed class
    " el-rate__icon   el-icon-star-on".should.equal(star2.className);
    /*
    const star = await showroom.find("// #\\32");
    const tex = await showroom.getProperty("className", star);
    assert.equal(" el-rate__icon   el-icon-star-on", tex);*/

    //check to see if the clicked star changed class as well
    " el-rate__icon   el-icon-star-on".should.equal(star4.className);
    /*
    const clicked = await showroom.find("// #\\34");
    const clickedtext = await showroom.getProperty("className", clicked);
    assert.equal(" el-rate__icon   el-icon-star-on", clickedtext);
    */

    //check that further along star didn't change at all
    const star5 = shadow.querySelector("#\\35");
    " el-rate__icon   el-icon-star-off".should.equal(star5.className);
    /*
    const nochan = await showroom.find("// #\\35");
    const nochantext = await showroom.getProperty("className", nochan);
    assert.equal(" el-rate__icon   el-icon-star-off", nochantext);*/

    //check to make sure that the after message is set correctly
    "满意".should.equal(shadow.querySelector("div p").textContent);
    /*
    const textp = await showroom.find("// div p");
    const text = await showroom.getTextContent(textp);
    assert.equal("满意", text);*/
  });

  it("Unit test 7: checking if v-model correctly sets the stars", async () => {
    rater.setAttribute("v-model", "2");
    " el-rate__icon   el-icon-star-on".should.equal(shadow.querySelector("#\\32").className);
    /*
    await showroom.setAttribute("v-model", "2");
    const secstar = await showroom.find("// #\\32");
    const text = await showroom.getProperty("className", secstar);
    assert.equal(" el-rate__icon   el-icon-star-on", text);
    */

    //move v-model back and check to see that the star isn't set anymore 
    rater.setAttribute("v-model", "1");
    " el-rate__icon    el-icon-star-off".should.equal(shadow.querySelector("#\\32").className);
    /*
    await showroom.setAttribute("v-model", "1");
    const newsecstar = await showroom.find("// #\\32");
    const newtext = await showroom.getProperty("className", secstar);
    assert.equal(" el-rate__icon    el-icon-star-off", newtext);*/
  });
  
});