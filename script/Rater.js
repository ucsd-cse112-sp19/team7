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
      cursor: default;
    }
    img {
      height: 300px;
    }
    div p {
      display: inline !important;
      margin-left: 10px;
      font: bold 20px "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    div img {
      height: 20px;
    }

  </style>
  <span>
    <img>
    <p id="author"></p>
    <p id="des"></p>
    <div>
    
    </div>
  </span>
`;


class Rater extends HTMLElement {
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
    author.textContent = "Author: " + this.getAttribute("author");
    info.textContent = "Description: " + this.getAttribute("des");

    var imgUrl;
    if(this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "background.jpg";
    }
    var img = shadow.querySelector("img");
    img.src = imgUrl;
    const slider = shadow.querySelector("div");

    // set up the rating bar
    if (slider.querySelectorAll("img"))
      this.handleMax(slider.querySelectorAll("img").length, this.max); //add the stars
    else
      this.handleMax(0, this.max);
 
    // append the text field for the rating bar
    const ratertext = document.createElement("p");
    ratertext.textContent = "";
    slider.appendChild(ratertext);

    // add click events to the rating stars
    this.handleDisabled(false);
    
    // set up the text content, either number or the chinese characters
    this.handleShowScoreAndText(this.showScore, this.showText);

    //initialize the star value
    this.handleValueModel(this.valueModel);

    //TODO4
  }

  /**
   * `onStarClicked()` is called when any rating star is clicked
   * It will correctly set the current rate value
   */
  onStarClicked(event) {
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      var stars = rater.shadowRoot.querySelectorAll("div img");
      var i;
      for(i = 0; i < rater.max; i++) {
        stars[i].currentRate = event.target.id;
      }
      if (rater.texts[this.currentRate - 1])
        rater.shadowRoot.querySelector("div p").textContent = rater.texts[this.currentRate - 1];
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
      var stars = rater.shadowRoot.querySelectorAll("div img");
      var i;
      for(i = 0; i < rater.max; i++) {
        if(i < this.currentRate)
          stars[i].src="starclicked.png";
        else
          stars[i].src="star.png";
      }
      if (rater.texts[this.currentRate - 1])
        rater.shadowRoot.querySelector("div p").textContent = rater.texts[this.currentRate - 1];
    }
  }

  /**
   * `onStarClick()` is called when any rating star is hovered
   * It will correctly set the start img and text contents
   */
  onStarClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      var stars = rater.shadowRoot.querySelectorAll("div img");
      var id = event.target.id;
      var i;
      for(i = 0; i < rater.max; i++) {
        if(i < id)
          stars[i].src="starclicked.png";
        else
          stars[i].src="star.png";
      }
      if (rater.texts[id-1])
        rater.shadowRoot.querySelector("div p").textContent = rater.texts[id-1];
    }
  }

  static get observedAttributes() {
    return ["v-model", "max", "disabled", "show-score", "show-text", "texts", "score-template"]; //TODO1
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
      this.handleDisabled(newValue);
      break;
    case "show-score":
      this.handleShowScoreAndText(this.showScore, this.showText);
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
   * `handleValueModel()` is called when the `v-model` attribute of
   * rater-r is changed
   */
  handleValueModel(newValue) {
    var stars = this.shadowRoot.querySelectorAll("div img");
    var i;
    for(i = 0; i < stars.length; i++) {
      if(i < newValue)
        stars[i].src = "starclicked.png";
      else
        stars[i].src = "star.png";
    }
    this.currentRate = newValue;
    if (this.texts[newValue-1] && this.shadowRoot.querySelector("div p"))
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
        var newStar = document.createElement("img");
        newStar.src = "star.png";
        newStar.id = i+1;
        
        if(!this.disabled) {
          newStar.addEventListener("mouseover", this.onStarClick);
          newStar.addEventListener("click",this.onStarClicked);
          newStar.addEventListener("mouseleave",this.onStarLeave);
        }

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
  handleDisabled(newValue) {
    var stars = this.shadowRoot.querySelectorAll("div img");
    var i;
    if (newValue) {
      for(i = 0; i < this.max; i++) {
        stars[i].removeEventListener("mouseover", this.onStarClick);
        stars[i].removeEventListener("click",this.onStarClicked);
        stars[i].removeEventListener("mouseleave",this.onStarLeave);
      }
    }
    else {
      for(i = 0; i < this.max; i++) {
        stars[i].addEventListener("mouseover", this.onStarClick);
        stars[i].addEventListener("click",this.onStarClicked);
        stars[i].addEventListener("mouseleave",this.onStarLeave);
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
    return this.getAttribute("currate") || 5;
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
