import { Selector } from 'testcafe';

const author = Selector(() => document.querySelector('#def').shadowRoot.querySelector('p#author'));
const description = Selector(() => document.querySelector('#def').shadowRoot.querySelector('p#des'));
const secStar = Selector(() => document.querySelector('#def').shadowRoot.querySelector('#\\32'));
const midStar = Selector(() => document.querySelector('#def').shadowRoot.querySelector('#\\33'));
const maxStar = Selector(() => document.querySelector('#def').shadowRoot.querySelector('#\\36'));
const afterText = Selector(() => document.querySelector('#def').shadowRoot.querySelector('div p'));

fixture `Sds Rater Test`
  .page `./test.html`

test('Test 1: Check if author is set', async t => {
  await t
    .expect(author.textContent).eql('Author: Christian');
});

test('Test 2: Check if description is set', async t => {
  await t
    .expect(description.textContent).eql('Description: Tester component');
});

test('Test 3: Test that clicking on a star sets text', async t => {
  await t
    .click(midStar)
    .expect(afterText.textContent).eql('So-So');
});

test('Test 4: Test clicking another star', async t => {
  await t
    .click(secStar)
    .expect(afterText.textContent).eql('Disappointing');
});

test('Test 5: Test max and texts attributes', async t => {
  await t
    .click(maxStar)
    .expect(afterText.textContent).eql('Amazing');
});

