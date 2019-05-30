/*const showroom = require("showroom/puppeteer")();
const assert = require("assert");

describe("sds-checkbox", () => {

  before( async() => {
    await showroom.start();
  });

  after( async () => {
    await showroom.stop(); 
  });

  beforeEach( async () => {
    await showroom.setTestSubject("sds-checkbox");
  });

  it("Unit test 1: check clicking", async () => {
    //check class name before clicking to see that it isn't checked yet
    const inlabel = await showroom.find("// label");
    const text = await showroom.getProperty("className", inlabel);
    assert.equal("el-checkbox", text);

    //click on the label to check the checkbox
    await showroom.page.evaluate(() => {
      showroom.find("// label").click(); 
    });

    //check to see if class name changed to clicked
    const ninlabel = await showroom.find("// label");
    const ntext = await showroom.getProperty("className", ninlabel);
    assert.equal("el-checkbox is-checked", ntext);

    //check to see if attribute for checked has been set
    const checkedatt = await showroom.getAttribute("checked");
    assert.equal("", checkedatt);

    //click to uncheck
    await showroom.page.evaluate(() => {
      showroom.find("// label").click(); 
    });

    //check to see if checkbox is unchecked
    const endinlabel = await showroom.find("// label");
    const endtext = await showroom.getProperty("className", endinlabel);
    assert.equal("el-checkbox  ", endtext);
  });
});*/