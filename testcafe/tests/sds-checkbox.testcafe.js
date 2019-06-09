import { Selector } from "testcafe";

const tru = Selector(() => document.querySelector('#tru'));
const fal = Selector(() => document.querySelector('#fal'));
const dis = Selector(() => document.querySelector('#dis'));

fixture `Sds Checkbox Test`
  .page `../checkbox.html`;

test('Test 1: Check the getters and setters for True labels', async t => {
  tru.trueLabel = "Some Label";
  await t
    .expect(tru.trueLabel).eql('Some Label')
});

test('Test 2: check the getters and setters for False labels', async t => {
  fal.falseLabel = 'Some False Label';
  await t
    .expect(fal.falseLabel).eql('Some False Label')
});

test('Test 3: Check disabled checkbox', async t => {
  await t
    .expect(dis.hasAttribute('disabled')).eql(true);
});