/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of rater originally from: 
 * 
 * https://element.eleme.io/#/en-US/component/rate
 * 
 * Orinal Code written in Vue.js:
 * 
 * https://github.com/ElemeFE/element/blob/dev/packages/rate/src/main.vue
 * 
 * Parts of comments copied and modified from:
 * 
 * https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-checkbox/howto-checkbox.js
 */

/**
 * Cloning contents from a &lt;template&gt; element is more performant
 * than using innerHTML because it avoids addtional HTML parse costs.
 */
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    img {
      height: 300px;
    }
    div p {
      display: inline !important;
      margin-left: 5px;
      font: bold 20px "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    div img {
      height: 20px;
      background-color: white;
    }

    .el-rate__icon {
      font-size: 18px;
      margin-right: 4px;
      color: #c0c4cc;
      transition: .3s;
    }
    .el-rate__icon, .el-rate__item {
      display: inline-block;
      position: relative;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      //font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    i {
      font-style: italic;
    }
    .el-rate__item {
        font-size: 0;
        vertical-align: middle;
        cursor: pointer;
    }
    .el-rate {
        height: 20px;
        line-height: 1;
    }
    .el-icon-star-on {
      color: rgb(247, 186, 42);
    }
    .el-rate__item:not(.disabled) .el-rate__icon:hover {
      transform: scale(1.2);
    }
    .el-rate__item.disabled {
        cursor: default;
    }
    .el-rate__text {
      font-size: 14px;
      vertical-align: middle;
    }
    
    .el-icon-star-on.low-level {
    }
    .el-icon-star-on.medium-level {
    }
    .el-icon-star-on.high-level {
    }
    .el-icon-star-off {
    }
    .disabled .el-icon-star-off {
    }
    
    .el-icon-star-on.low-level::before {
    }
    .el-icon-star-on.medium-level::before { 
    }
    .el-icon-star-on.high-level::before {
    }
    .el-icon-star-off::before{
    }
    .disabled .el-icon-star-off::before {
    }
    
  </style>
  <span>
    <img>
    <p id="author"></p>
    <p id="des"></p>
    <div class="el-rate">
    
    </div>
  </span>
`;

/*
The following can be used but might get sued by element since they will use elemet's icon,
which can be downloaded through: https://unpkg.com/element-ui@2.8.2/lib/theme-chalk/fonts/
    @font-face {
      font-family: element-icons;
      src: url(fonts/element-icons.woff) format("woff"),
           url(fonts/element-icons.ttf) format("truetype");
      font-weight: 400;font-style:normal}
      
    .el-icon-star-off:before {
      content: "\\e717";
    }
    .el-icon-star-on:before {
      content: "\\e797";
    }
*/

/**
 * Rater is a custom element that creates a web component.
 * It can be used by the tag <sds-rate>
 */
export class Rater extends HTMLElement {
  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created by parsing HTML, or calling
   * document.createElement("7ds-rate")
   * The construtor is a good place to create shadow DOM, though you should
   * avoid touching any attributes or light DOM children as they may not
   * be available yet.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * `connectedCallback()` is called when the element is inserted into the DOM.
   * It's a good place to set the initial attribute values and install event listeners.
   */
  connectedCallback() {
    const shadow = this.shadowRoot;

    var author = shadow.querySelector("p#author");  //Author text
    var info = shadow.querySelector("p#des"); //Description text
    //var span = shadow.querySelector("span");  
    if (this.getAttribute("author")) {
      author.textContent = "Author: " + this.getAttribute("author");
    }
    else {
      author.style.display = "none";
    }
    if (this.getAttribute("des")) {
      info.textContent = "Description: " + this.getAttribute("des");
    }
    else {
      info.style.display = "none";
    }
    //Handle image
    var imgUrl;
    var img = shadow.querySelector("img");
    if (this.hasAttribute("img")) {
      img.style.display = "block";
      imgUrl = this.getAttribute("img");
      img.src = imgUrl;
    } else {
      //imgUrl = "background.jpg";
      img.style.display = "none";
    }

    //Wrapper for rater
    const slider = shadow.querySelector("div");

    // set up the rating bar
    if (slider.querySelectorAll("span"))
      this.handleMax(slider.querySelectorAll("span").length, this.max); //add the stars
    else
      this.handleMax(0, this.max);

    // append the text field for the rating bar
    const ratertext = document.createElement("p");
    ratertext.textContent = "";
    ratertext.className += " el-rate__text";
    slider.appendChild(ratertext);

    // disable the rate buttons if necessary
    this.handleDisabled();

    this.handleTextColor(this.textColor);

    // set up the text content, either number or the chinese characters
    this.handleShowScoreAndText(this.showScore, this.showText);

    // set the colors & icons
    this.updateColors();
    this.updateIcons();

    //initialize the star value
    this.updateStars(this.valueModel);
    //TODO4

    //var event = new CustomEvent("onchange", { "detail": this.valueModel });
  }





  /**
   * `onStarClick()` is called when any rating star is clicked and will correctly
   * set the current rate value, or the value model
   * @param {Event} event - the click event
   */
  onStarClick(event) {
    var rater = event.target.getRootNode().host;
    if (!rater.disabled) {
      rater.valueModel = event.target.id;
    }
  }

  /**
   * `onStarLeave()` is called when cursor moves away and will correctly set
   * the value back to current rate value
   * @param {Event} event - the leave event
   */
  onStarLeave(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if (!rater.disabled) {
      rater.updateStars(rater.valueModel);
    }
  }

  /**
   * `onStarOver()` is called when any rating star is hovered and will correctly 
   * set the start img and text contents
   * @param {Event} event - the hover event
   */
  onStarOver(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if (!rater.disabled) {
      var id = event.target.id ? event.target.id : event.target.querySelector(".el-rate__icon").id;
      rater.updateStars(id);
    }
  }





  /**
   * `updateStars()` is a helper method to update the stars based on the mouse action
   * @param {CurrentStar} curr - this is the star that has been clicked or hovered
   */
  updateStars(curr) {
    var stars = this.shadowRoot.querySelectorAll("div i");

    var level;
    // + sign is used to convert curr to int so that comparison is done correctly
    if (+curr <= +this.lowThreshold) {
      level = " low-level";
    }
    else if (+curr < +this.highThreshold) {
      level = " medium-level";
    }
    else {
      level = " high-level";
    }

    var i;
    for (i = 0; i < this.max; i++) {
      stars[i].className = stars[i].className.replace(/\blow-level\b/g, "");
      stars[i].className = stars[i].className.replace(/\bmedium-level\b/g, "");
      stars[i].className = stars[i].className.replace(/\bhigh-level\b/g, "");

      if (i < curr) {
        stars[i].className += level;
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
        stars[i].className += " el-icon-star-on";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
      }
      else {
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
        stars[i].className += " el-icon-star-off";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
      }
    }
    if (curr - 1 >= 0 && this.texts[curr - 1])
      this.shadowRoot.querySelector("div p").textContent = this.texts[curr - 1];
    else if (this.shadowRoot.querySelector("div p"))
      this.shadowRoot.querySelector("div p").textContent = "";
  }

  /**
   * `handleTextColor()` is called when the `text-color` attribute is changed
   * and will update the text color
   * @param {string} newValue - new color 
   */
  handleTextColor(newValue) {
    if (newValue == null) {
      newValue = "rgb(247, 186, 42)";
    }
    if (this.shadowRoot.querySelector("div p"))
      this.shadowRoot.querySelector("div p").style.color = newValue;
  }

  /**
   * `handleValueModel()` is called when the `v-model` attribute is changed
   * and will update the number of selected icons accordingly
   * @param {number} newValue - new value model number 
   */
  handleValueModel(newValue) {
    //this.updateStars(newValue);
    // I don't know why but the above statement will return an error
    var stars = this.shadowRoot.querySelectorAll("div i");
    var i;
    for (i = 0; i < stars.length; i++) {
      if (i < newValue) {
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
        stars[i].className += " el-icon-star-on";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
      }
      else {
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
        stars[i].className += " el-icon-star-off";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
      }
    }
    if (newValue - 1 >= 0 && this.texts[newValue - 1] && this.shadowRoot.querySelector("div p"))
      this.shadowRoot.querySelector("div p").textContent = this.texts[newValue - 1];
  }

  /**
   * `handleMax()` is called when the `max` attribute is changed and will
   * update the number of icons accordingly
   * @param {number} oldValue - old max, default is 5 
   * @param {number} newValue - new max 
   */
  handleMax(oldValue, newValue) {
    const slider = this.shadowRoot.querySelector("div");
    var items = this.shadowRoot.querySelectorAll("div span");
    if (items.length != this.max) // which would happen before connectedCallBack
      oldValue = items.length;
    var i;
    if (oldValue < newValue) {
      for (i = oldValue; i < newValue; i++) {
        var newItem = document.createElement("span");
        newItem.className += " el-rate__item";

        var newStar = document.createElement("i");
        newStar.className += " el-rate__icon";
        newStar.className += " el-icon-star-off";
        newStar.id = i + 1;

        newItem.addEventListener("mouseover", this.onStarOver);
        newStar.addEventListener("click", this.onStarClick);
        newStar.addEventListener("mouseleave", this.onStarLeave);

        newItem.appendChild(newStar);
        slider.appendChild(newItem);
      }
      var text = this.shadowRoot.querySelector("div p");
      if (text) {
        slider.removeChild(text);
        slider.appendChild(text);
      }
    }
    else {
      for (i = oldValue; i > newValue; i--) {
        slider.removeChild(items[i]);
      }
    }
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute is changed
   * and will disable the rater accordingly
   */
  handleDisabled() {
    var items = this.shadowRoot.querySelectorAll("div span");
    var i;
    if (this.disabled) {
      for (i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
        items[i].className += " disabled";
      }
    }
    else {
      for (i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
      }
    }
  }

  /**
   * `handleShowScoreAndText()` is called when the `show-text` attribute 
   * or `show-score` attribute is changed and will update the display of the text
   * @param {string} scoreVal - the score value 
   * @param {string} textVal - the text content
   */
  handleShowScoreAndText(scoreVal, textVal) {
    if (!this.shadowRoot.querySelector("div p"))
      return;
    if (Boolean(scoreVal) || Boolean(textVal)) {
      this.shadowRoot.querySelector("div p").style.display = "block";
    }
    else {
      this.shadowRoot.querySelector("div p").style.display = "none";
    }
  }

  /**
   * `updateColors()` is called when the `colors` `void-color` `disabled-void-color`
   * attributes are changed and will update the color of the icons accordingly
   */
  updateColors() {
    var styleSheet = this.shadowRoot.querySelector("style").sheet;
    var i;
    for (i = 0; i < styleSheet.cssRules.length; i++) {
      var rule = styleSheet.cssRules[i];
      switch (rule.selectorText) {
      case ".el-icon-star-on.low-level":
        rule.style.color = this.colors[0];
        break;
      case ".el-icon-star-on.medium-level":
        rule.style.color = this.colors[1];
        break;
      case ".el-icon-star-on.high-level":
        rule.style.color = this.colors[2];
        break;
      case ".el-icon-star-off":
        rule.style.color = this.voidColor;
        break;
      case ".disabled .el-icon-star-off":
        rule.style.color = this.disabledVoidColor;
        break;
      }
    }
    /*
    styleSheet.deleteRule(".el-icon-star-on.low-level", 0);
    styleSheet.deleteRule(".el-icon-star-on.medium-level", 0);
    styleSheet.deleteRule(".el-icon-star-on.high-level", 0);
    //use insertRule(".eg{}", index) instead if less browser is supporting
    styleSheet.addRule(".el-icon-star-on.low-level", "color: " + this.colors[0] + ";", 0);
    styleSheet.addRule(".el-icon-star-on.medium-level",  "color: " + this.colors[1] + ";", 0);
    styleSheet.addRule(".el-icon-star-on.high-level", "color: " + this.colors[2] + ";", 0);
  */
  }

  /**
   * `updateIcons()` is called when the `icons` `void-icon` `disabled-void-icon`
   * attributes are changed and it will update the icons accordingly
   */
  updateIcons() {
    var styleSheet = this.shadowRoot.querySelector("style").sheet;
    var i;

    for (i = 0; i < styleSheet.cssRules.length; i++) {
      var rule = styleSheet.cssRules[i];
      switch (rule.selectorText) {
      case ".el-icon-star-on.low-level::before":
        styleSheet.deleteRule(i);
        styleSheet.insertRule(`
        .el-icon-star-on.low-level::before {
          content: "` + this.icons[0] + `";
        }`, i);
        break;
      case ".el-icon-star-on.medium-level::before":
        styleSheet.deleteRule(i);
        styleSheet.insertRule(`
        .el-icon-star-on.medium-level::before {
          content: "` + this.icons[1] + `";
        }`, i);
        break;
      case ".el-icon-star-on.high-level::before":
        styleSheet.deleteRule(i);
        styleSheet.insertRule(`
        .el-icon-star-on.high-level::before {
          content: "` + this.icons[2] + `";
        }`, i);
        break;
      case ".el-icon-star-off::before":
        styleSheet.deleteRule(i);
        styleSheet.insertRule(`
        .el-icon-star-off::before {
          content: "` + this.voidIcon + `";
        }`, i);
        break;
      case ".disabled .el-icon-star-off::before":
        styleSheet.deleteRule(i);
        styleSheet.insertRule(`
        .disabled .el-icon-star-off::before {
          content: "` + this.disabledVoidIcon + `";
        }`, i);
        break;
      }
    }
  }





  /**
   * `observedAttributes()` returns an array of attributes whose changes will
   * be handled in `attributeChangedCallback()`
   * @return {string[]} array of attributes whose changes will be handled 
   */
  static get observedAttributes() {
    return [
      "v-model", "max", "disabled", "show-score", "text-color",
      "show-text", "texts", "score-template", "low-threshold",
      "high-threshold", "colors", "void-color", "disabled-void-color",
      "icons", "void-icon", "disabled-void-icon", "img", "author", "des"
    ]; //TODO1
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * returned array of `observedAttributes()` are changed. It's a good place to 
   * handle side effects
   * @param {string} name - the name of the changed attribute
   * @param {string} oldValue - the old value of the attribute
   * @param {string} newValue - the new value of the attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
    switch (name) {
    case "v-model":
      this.handleValueModel(newValue);
      break;
    case "max":
      if (!oldValue)
        oldValue = 5;
      this.handleMax(oldValue, newValue);
      break;
    case "disabled":
      this.handleDisabled();
      break;
    case "show-score":
      this.handleShowScoreAndText(this.showScore, this.showText);
      break;
    case "text-color":
      this.handleTextColor(newValue);
      break;
    case "show-text":
      this.handleShowScoreAndText(this.showScore, this.showText);
      break;
    case "texts":
      // no need to handle since "get texts" is updated
      break;
    case "score-template":
      // no need to handle since "get texts" is updated
      break;
    case "low-threshold":
      this.updateStars(this.valueModel);
      break;
    case "high-threshold":
      this.updateStars(this.valueModel);
      break;
    case "colors":
      this.updateColors();
      break;
    case "void-color":
      this.updateColors();
      break;
    case "disabled-void-color":
      this.updateColors();
      break;
    case "icons":
      this.updateIcons();
      break;
    case "void-icon":
      this.updateIcons();
      break;
    case "disabled-void-icon":
      this.updateIcons();
      break;
    case "img":
      var img = this.shadowRoot.querySelector("img");
      if (newValue) {
        img.style.display = "block";
        img.src = newValue;
      } else {
        img.style.display = "none";
      }
      break;
    case "author":
      var author = this.shadowRoot.querySelector("p#author");  //Author text
      if (newValue) {
        author.style.display = "block";
        author.textContent = "Author: " + newValue;
      }
      else {
        author.style.display = "none";
      }
      break;
    case "des":
      var info = this.shadowRoot.querySelector("p#des"); //Description text
      if (newValue) {
        info.style.display = "block";
        info.textContent = "Description: " + newValue;
      }
      else {
        info.style.display = "none";
      }
      break;
      //TODO3
    }
  }

  /** @type {number} */
  set valueModel(value) {
    this.setAttribute("v-model", value);
  }

  /** @type {number} */
  get valueModel() {
    return this.getAttribute("v-model") || 0;
  }

  /** @type {number} */
  set max(value) {
    this.setAttribute("max", value);
  }

  /** @type {number} */
  get max() {
    return this.getAttribute("max") || 5;
  }

  /** @type {number} */
  get currentRate() {
    return this.hasAttribute("currate") || 5;
  }

  /** @type {number} */
  set currentRate(value) {
    this.setAttribute("currate", value);
  }

  /** @type {boolean} */
  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled)
      this.setAttribute("disabled", "");
    else
      this.removeAttribute("disabled");
  }

  /** @type {boolean} */
  get disabled() {
    return this.hasAttribute("disabled");
  }

  /** @type {boolean} */
  set showScore(value) {
    const scoreShown = Boolean(value);
    if (scoreShown)
      this.setAttribute("show-score", "");
    else
      this.removeAttribute("show-score");
  }

  /** @type {boolean} */
  get showScore() {
    return this.hasAttribute("show-score");
  }

  /** @type {string} */
  get textColor() {
    return this.getAttribute("text-color");
  }

  /** @type {string} */
  set textColor(value) {
    this.setAttribute("text-color", value);
  }

  /** @type {boolean} */
  set showText(value) {
    const testShown = Boolean(value);
    if (testShown)
      this.setAttribute("show-text", "");
    else
      this.removeAttribute("show-text");
  }

  /** @type {boolean} */
  get showText() {
    return this.hasAttribute("show-text");
  }

  /** @type {string[]} */
  set texts(value) {
    this.setAttribute("texts", value);
  }

  /** @type {string[]} */
  get texts() {
    if (this.showScore) {
      var textArray = [];
      var correctTemplate = this.scoreTemplate.includes("{value}");
      var i;
      for (i = 1; i <= this.max; i++) {
        if (correctTemplate)
          textArray.push(this.scoreTemplate.replace("{value}", i));
        else
          textArray.push(i);
      }
      return textArray;
    }
    else if (this.getAttribute("texts"))
      return this.getAttribute("texts").split(",");
    else
      return ["Worst", "Disappointing", "So-So", "Glad", "Surprised"];
  }

  /** @type {string} */
  set scoreTemplate(value) {
    this.setAttribute("score-template", value);
  }

  /** @type {string} */
  get scoreTemplate() {
    return this.getAttribute("score-template") || "{value}";
  }

  /** @type {number} */
  set lowThreshold(value) {
    this.setAttribute("low-threshold", value);
  }

  /** @type {number} */
  get lowThreshold() {
    return this.getAttribute("low-threshold") || 2;
  }

  /** @type {number} */
  set highThreshold(value) {
    this.setAttribute("high-threshold", value);
  }

  /** @type {number} */
  get highThreshold() {
    return this.getAttribute("high-threshold") || 4;
  }

  /** @type {string[]} */
  set colors(value) {
    this.setAttribute("colors", value);
  }

  /** @type {string[]} */
  get colors() {
    if (this.getAttribute("colors")) {
      if (this.getAttribute("colors").split(",").length > 3)
        return this.getAttribute("colors").split(";");
      return this.getAttribute("colors").split(",");
    }
    else
      return ["#F7BA2A", "#F7BA2A", "#F7BA2A"];
  }

  /** @type {string} */
  set voidColor(value) {
    this.setAttribute("void-color", value);
  }

  /** @type {string} */
  get voidColor() {
    return this.getAttribute("void-color") || "#C6D1DE";
  }

  /** @type {string} */
  set disabledVoidColor(value) {
    this.setAttribute("disabled-void-color", value);
  }

  /** @type {string} */
  get disabledVoidColor() {
    return this.getAttribute("disabled-void-color") || "#EFF2F7";
  }

  /** @type {string[]} */
  set icons(value) {
    this.setAttribute("icons", value);
  }

  /** @type {string[]} */
  get icons() {
    if (this.getAttribute("icons")) {
      return this.getAttribute("icons").split(",");
    }
    else
      return ["\\2605", "\\2605", "\\2605"];
  }

  /** @type {string} */
  set voidIcon(value) {
    this.setAttribute("void-icon", value);
  }

  /** @type {string} - void icon */
  get voidIcon() {
    return this.getAttribute("void-icon") || "\\2606";
  }

  /** @type {string} */
  set disabledVoidIcon(value) {
    this.setAttribute("disabled-void-icon", value);
  }

  /** @type {string} */
  get disabledVoidIcon() {
    return this.getAttribute("disabled-void-icon") || "\\2605";
  }



  //TODO2
}

customElements.define("sds-rate", Rater);
