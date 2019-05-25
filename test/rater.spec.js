const showroom = require('showroom/puppeteer')();
const assert = require('assert');

//let root;

describe('sds-rate', () => {
  before( async () => {
    await showroom.start();
  });
  after( async () => {
    await showroom.stop();
  });
  beforeEach( async () => {
    await showroom.setTestSubject('sds-rate');
    //root = await showroom.page.$('showroom-app');
    //await showroom.page.waitFor(300);
  });

  it('Unit test 1: check author attribute is correct', async () => {
    const intex = await showroom.find('// #author' );
    const text = await showroom.getTextContent(intex);
    assert.equal('Author: stupidEtsu', text);
  });

  it('Unit test 2: check decription atrribute correct', async () => {
    const intex = await showroom.find('// #des' );
    const text = await showroom.getTextContent(intex);
    assert.equal('Description: Etsu is dumb', text);
  });

  it('Unit test 3: check default rater has no img', async () => {
    //const intex = await showroom.find('// img' );
    //const text = await showroom.getProperty('src',intex);
    assert.fail("Please implement test that checks for null object");
  });

  it('Unit test 4: check img can be set via attribute', async () => {
    await showroom.setAttribute('img','lol.png');
    assert.equal('lol.png', await showroom.getAttribute('img'));
  });

  it('Unit test 5: check if max is creating more stars', async () => {
    const instar = await showroom.find('// #\\36');
    const other = await showroom.getProperty('id', instar);
    assert.equal('6', other);
    await showroom.setAttribute('max', 9);
    const inst = await showroom.find('// #\\39');
    assert.equal('9', await showroom.getProperty('id', inst));
  });

  it('Unit test 6: check if clicking on stars is working', async () => {
    //first check for original class of star
    const start = await showroom.find('// #\\32');
    const startext = await showroom.getProperty('className', start);
    assert.equal(' el-rate__icon  el-icon-star-off', startext);

    //click a star further on
    await showroom.page.evaluate(() => {
      showroom.find('// #\\34').click(); 
    });

    //check to make sure it has changed class
    const star = await showroom.find('// #\\32');
    const tex = await showroom.getProperty('className', star);
    assert.equal(' el-rate__icon   el-icon-star-on', tex);

    //check to see if the clicked star changed class as well
    const clicked = await showroom.find('// #\\34');
    const clickedtext = await showroom.getProperty('className', clicked);
    assert.equal(' el-rate__icon   el-icon-star-on', clickedtext);

    //check that further along star didn't change at all
    const nochan = await showroom.find('// #\\35');
    const nochantext = await showroom.getProperty('className', nochan);
    assert.equal(' el-rate__icon   el-icon-star-off', nochantext);

    //check to make sure that the after message is set correctly
    const textp = await showroom.find('// div p');
    const text = await showroom.getTextContent(textp);
    assert.equal('满意', text);
  });

  it('Unit test 7: checking if v-model correctly sets the stars', async () => {
    await showroom.setAttribute('v-model', '2');
    const secstar = await showroom.find('// #\\32');
    const text = await showroom.getProperty('className', secstar);
    assert.equal(' el-rate__icon   el-icon-star-on', text);

    //move v-model back and check to see that the star isn't set anymore
    await showroom.setAttribute('v-model', '1');
    const newsecstar = await showroom.find('// #\\32');
    const newtext = await showroom.getProperty('className', secstar);
    assert.equal(' el-rate__icon    el-icon-star-off', newtext);
  });
  
});