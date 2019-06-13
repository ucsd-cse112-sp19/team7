import { Selector } from "testcafe";

const comment = Selector(() => document.querySelector("#def"));

fixture `Sds Comment Test`
  .page `../comment.html`;

test("Test 1: Check if attribute is set", async t => {
  await t
    .expect(comment.getAttribute("color")).eql("white");
});

test("Test 2: Check if comment has show rating set", async t => {
  await t
    .expect(comment.hasAttribute("show-rating")).eql(false);
});