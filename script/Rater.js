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
      font-family: element-icons!important;
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
    .el-icon-star-off:before {
      content: "\\2606";
    }
    .el-icon-star-on:before {
      content: "\\2605";
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


export class Rater extends HTMLElement {
  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created by parsing HTML, or calling
   * document.createElement("rater-r")
   * The construtor is a good place to create shadow DOM, though you should
   * avoid touching any attributes or light DOM children as they may not
   * be available yet.
   */
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * `connectedCallback()` is called when the element is inserted into the DOM.
   * It's a good place to set the initial attribute values and install event listeners.
   */
  connectedCallback() {
    const shadow = this.shadowRoot;

    var author = shadow.querySelector("p#author");
    var info = shadow.querySelector("p#des");
    var span = shadow.querySelector("span");
    if (this.getAttribute("author")) {
      author.textContent = "Author: " + this.getAttribute("author");
    }
    else { 
      span.removeChild(author);
    }
    if (this.getAttribute("des")) {
      info.textContent = "Description: " + this.getAttribute("des");
    }
    else { 
      span.removeChild(info);
    }

    var imgUrl;
    var img = shadow.querySelector("img");
    if(this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
      img.src = imgUrl;
    } else {
      //imgUrl = "background.jpg";
      span.removeChild(img);
    }

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

    //initialize the star value
    this.updateStars(this.valueModel);

    //TODO4
  }

  /**
   * `onStarClick()` is called when any rating star is clicked
   * It will correctly set the current rate value, or the value model
   */
  onStarClick(event) {
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      rater.valueModel = event.target.id;
    }
  }

  /**
   * `onStarLeave()` is called when cursor moves awayy
   * It will correctly set the value back to current Rate Value
   */
  onStarLeave(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      rater.updateStars(rater.valueModel);
    }
  }

  /**
   * `onStarOver()` is called when any rating star is hovered
   * It will correctly set the start img and text contents
   */
  onStarOver(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      rater.updateStars(event.target.id);
    }
  }

  /**
   * `updateStars()` is a helper method to update the stars based on the mouse action
   * @param {CurrentStar} curr - this is the star that has been clicked or hovered
   */
  updateStars(curr) {
    var stars = this.shadowRoot.querySelectorAll("div i");
    
    //console.log(stars);
    var i;
    for(i = 0; i < this.max; i++) {
      if(i < curr) {
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
    if (curr-1 >= 0 && this.texts[curr-1])
      this.shadowRoot.querySelector("div p").textContent = this.texts[curr-1];
    else
      this.shadowRoot.querySelector("div p").textContent = "";
  }

  static get observedAttributes() {
    return ["v-model", "max", "disabled", "show-score", "text-color", "show-text", "texts", "score-template"]; //TODO1
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * `observedAttributes` array are changed. It's a good place to handle
   * side effects, like setting ARIA attributes.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
  
    switch (name) {
    case "v-model":
      this.handleValueModel(newValue);
      break;
    case "max":
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
    //TODO3
    }
  }

  /**
   * `handleTextColor()` is called when the `text-color` attribute of
   * rater-r is changed
   */
  handleTextColor(newValue) {
    if(newValue == null) {
      newValue = "rgb(247, 186, 42)";
    }
    this.shadowRoot.querySelector("div p").style.color = newValue;
  }

  /**
   * `handleValueModel()` is called when the `v-model` attribute of
   * rater-r is changed
   */
  handleValueModel(newValue) {
    //this.updateStars(newValue);
    // I don't know why but the above statement will return an error
    var stars = this.shadowRoot.querySelectorAll("div i");
    var i;
    for(i = 0; i < stars.length; i++) {
      if(i < newValue) {
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
    if (newValue-1 >= 0 && this.texts[newValue-1] && this.shadowRoot.querySelector("div p"))
      this.shadowRoot.querySelector("div p").textContent = this.texts[newValue-1];
  }

  /**
   * `handleMax()` is called when the `max` attribute of
   * rater-r is changed
   */
  handleMax(oldValue, newValue) {
    const slider = this.shadowRoot.querySelector("div");
    var i;
    if (oldValue < newValue) {
      for (i = oldValue; i < newValue; i++) {
        var newItem = document.createElement("span");
        newItem.className += " el-rate__item";

        var newStar = document.createElement("i");
        newStar.className += " el-rate__icon";
        newStar.className += " el-icon-star-off";
        newStar.id = i+1;
        
        newStar.addEventListener("mouseover", this.onStarOver);
        newStar.addEventListener("click",this.onStarClick);
        newStar.addEventListener("mouseleave",this.onStarLeave);

        newItem.appendChild(newStar);
        slider.appendChild(newItem);
      }
    }
    else {
      var items = this.shadowRoot.querySelectorAll("div span");
      for (i = oldValue; i > newValue; i--) {
        slider.removeChild(items[i]);  
      }
    }
  }
  
  /**
   * `handleDisabled()` is called when the `disabled` attribute of
   * rater-r is changed
   */
  handleDisabled() {
    var items = this.shadowRoot.querySelectorAll("div span");
    var i;
    if (this.disabled) {
      for(i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
        items[i].className += " disabled";
      }
    }
    else {
      for(i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
      }
    }
  }

  /**
   * `handleShowScoreAndText()` is called when the `show-text` attribute 
   * or `show-score` attribute of rater-r is changed
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

  set valueModel(value) {
    this.setAttribute("v-model", value);
  }

  get valueModel() {
    return this.getAttribute("v-model") || 0;
  }

  set max(value) {
    this.setAttribute("max", value);
  }

  get max() {
    return this.getAttribute("max") || 5;
  }

  get currentRate() {
    return this.hasAttribute("currate") || 5;
  }

  set currentRate(value) {
    this.setAttribute("currate",value);
  }

  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled)
      this.setAttribute("disabled", "");
    else
      this.removeAttribute("disabled");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set showScore(value) {
    const scoreShown = Boolean(value);
    if (scoreShown)
      this.setAttribute("show-score", "");
    else
      this.removeAttribute("show-score");
  }

  get showScore() {
    return this.hasAttribute("show-score");
  }

  set showText(value) {
    const testShown = Boolean(value);
    if (testShown)
      this.setAttribute("show-text", "");
    else
      this.removeAttribute("show-text");
  }

  get textColor() {
    return this.getAttribute("text-color");
  }

  set textColor(value) {
    this.setAttribute("text-color", value);
  }

  get showText() {
    return this.hasAttribute("show-text");
  }
  
  set texts(value) {
    this.setAttribute("texts", value);
  }

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
      return ["极差", "失望", "一般", "满意", "惊喜"];
  }

  set scoreTemplate(value) {
    this.setAttribute("score-template", value);
  }

  get scoreTemplate() {
    return this.getAttribute("score-template") || "{value}";
  }

  //TODO2
}
  
customElements.define("rater-r", Rater);
