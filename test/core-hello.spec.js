/*const showroom = require("showroom/puppeteer")();
const assert = require("assert");

describe("core-hello", () => {
  before( async () => {
    await showroom.start();
  });
  after( async () => {
    await showroom.stop();
  });
  beforeEach( async () => {
    await showroom.setTestSubject("core-hello");
  });
  /*
  it('Check for english hello world', async () => {
    const intex = await showroom.find('// p');
    const text = await showroom.getTextContent(intex);
    assert.equal(text, 'Hello World - Name');
  });
  it('Check for spanish hello world', async () => {
    await showroom.setAttribute('lang', 'Spanish');
    const inner = await showroom.find('// p');
    const stext = await showroom.getTextContent(inner);
    assert.equal(stext, 'Hola Mundo - Name');
  });
  it('Check for chinese hello world', async () => {
    await showroom.setAttribute('lang', 'Chinese');
    const inn = await showroom.find('// p');
    const ctext = await showroom.getTextContent(inn);
    assert.equal(ctext, '你好,世界 -  Name');
  });
  */
//});