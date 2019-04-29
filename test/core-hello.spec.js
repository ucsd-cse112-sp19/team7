const showroom = require('showroom/puppeteer')();
const assert = require('assert');

describe('core-hello', () => {
  before( async () => {
    await showroom.start();
  });
  after( async () => {
    await showroom.stop();
  });
  beforeEach( async () => {
    await showroom.setTestSubject('my-component');
  });
  it('This will pass', async () => {
    assert.equal(1,1);
  });
});