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


class Checkbox extends HTMLElement {
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

    //var wrapper = document.createElement("div");
    //var img = document.createElement("img");
    var wrapper = shadow.querySelector("div");
    var img = shadow.querySelector("img");

    var text = document.createElement("p");
    text.textContent = this.innerHTML;

    wrapper.appendChild(img);
    wrapper.appendChild(text);
    shadow.appendChild(wrapper);

    
    this.handleValueModel(this.valueModel);

    this.handleDisabled(false);
  }

  /**
   * `onStarClick()` is called when any rating star is clicked
   * It will correctly set the start img and text contents
   */
  onBoxClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    var box = rater.shadowRoot.querySelector("img");
    if(this.valueModel == "true"){
      box.src = "unchecked.png";
      this.valueModel = "false";
    }
    else{
      box.src = "checked.png";
      this.valueModel = "true";
    }
  }

  static get observedAttributes() {
    return ["v-model"]; //TODO1
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute of
   * rater-r is changed
   */
  handleDisabled(newValue) {
    var box = this.shadowRoot.querySelector("img");
    if (newValue) {
      box.removeEventListener("click", this.onBoxClick);
    }
    else {
      box.addEventListener("click", this.onBoxClick);
    }
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
    }
  }

  /**
   * `handleValueModel()` is called when the `v-model` attribute of
   * rater-r is changed
   */
  handleValueModel(newValue) {
    var box = this.shadowRoot.querySelector("img");
    if(newValue == "true")
      box.src = "checked.png";
    else
      box.src = "unchecked.png";
  }

  set valueModel(value) {
    this.setAttribute("v-model", value);
  }

  get valueModel() {
    return this.getAttribute("v-model");
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

}
  
customElements.define("checkbox-r", Checkbox);
