const showroom = require('showroom/puppeteer')();
const assert = require('assert');

//let root;

describe('rater-r', () => {
  before( async () => {
    await showroom.start();
  });
  after( async () => {
    await showroom.stop();
  });
  beforeEach( async () => {
    await showroom.setTestSubject('rater-r');
    //root = await showroom.page.$('showroom-app');
    //await showroom.page.waitFor(300);
  });

  it('Unit test 1: check author attribute is correcr', async () => {
    const intex = await showroom.find('// #author' );
    const text = await showroom.getTextContent(intex);
    assert.equal('Author: stupidEtsu', text);
  });

  it('Unit test 2: check decription atrribute correct', async () => {
    const intex = await showroom.find('// #info' );
    const text = await showroom.getTextContent(intex);
    assert.equal('Description: Etsu is dumb', text);
  });

  it('Unit test 3: check default img can be set correctly', async () => {
    const intex = await showroom.find('// img' );
    const text = await showroom.getProperty( 'src',intex);
    assert.equal(text.includes('background.jpg'),true);
  });

  it('Unit test 4: check img can be set via attribute', async () => {
    await showroom.setAttribute('img','lol.png')
    assert.equal('lol.png', await showroom.getAttribute('img'));
  });
  
});