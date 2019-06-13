import { Selector } from "testcafe";

const def = Selector(() => document.querySelector("#def"));
const dis = Selector(() => document.querySelector("#diff"));
const author = Selector(() => def.shadowRoot.querySelector("p#author"));
const description = Selector(() => def.shadowRoot.querySelector("p#des"));
const secStar = Selector(() => def.shadowRoot.querySelector("#\\32"));
const midStar = Selector(() => def.shadowRoot.querySelector("#\\33"));
const maxStar = Selector(() => def.shadowRoot.querySelector("#\\36"));
const afterText = Selector(() => def.shadowRoot.querySelector("div p"));

fixture `Sds Rater Test`
  .page `../rater.html`;

test("Test 1: Check if author is set", async t => {
  await t
    .expect(author.textContent).eql("Author: Christian");
});

test("Test 2: Check if description is set", async t => {
  await t
    .expect(description.textContent).eql("Description: Tester component");
});

test("Test 3: Test that clicking on a star sets text", async t => {
  await t
    .click(midStar)
    .expect(afterText.textContent).eql("So-So");
});

test("Test 4: Test clicking another star", async t => {
  await t
    .click(secStar)
    .expect(afterText.textContent).eql("Disappointing");
});

test("Test 5: Test max and texts attributes", async t => {
  await t
    .click(maxStar)
    .expect(afterText.textContent).eql("Amazing");
});

test("Test 6: Check that rater is disabled", async t => {
  await t
    .expect(dis.hasAttribute("disabled")).eql(true);
});