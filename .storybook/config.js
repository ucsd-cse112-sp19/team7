import { configure } from "@storybook/html";

function loadStories() {
  require("../stories/rater-pixels.js");
  require("../stories/checkbox-pixels.js");
}

configure(loadStories, module);