import { storiesOf } from "@storybook/html";
import "../pages/element/script/Checkbox.js";

storiesOf("Checkbox", module)
  .add("default checkbox", () => "<sds-checkbox></sds-checkbox>")
  .add("checkbox with different inner html", () => {
    const checker = document.createElement("sds-checkbox");
    checker.innerHTML = "Different Option";
    return checker;
  });