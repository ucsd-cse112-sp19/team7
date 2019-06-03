import { storiesOf } from "@storybook/html";
import "../pages/element/script/Rater.js";

storiesOf('Rater', module)
  .add("almost default rater", () => "<sds-rate author='Christian' des='Tester component'></sds-rate>")
  .add("rater with max 10, numbers, and vmodel", () => "<sds-rate author='Christian' des='Another test comp' max='10' v-model='9' show-score></sds-rate>");