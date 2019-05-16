/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of checkbox originally from: 
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
.el-checkbox:last-child {
    margin-right: 0;
}
.el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    margin-right: 30px;
}
.el-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    border-top-color: rgb(64, 158, 255);
    border-right-color: rgb(64, 158, 255);
    border-bottom-color: rgb(64, 158, 255);
    border-left-color: rgb(64, 158, 255);
}
.el-checkbox__input.is-checked .el-checkbox__inner:after {
    transform: rotate(45deg) scaleY(1);
}
.el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.el-checkbox__inner:after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform .15s ease-in .05s;
    transform-origin: center;
}
.el-checkbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #409eff;
}
input {
    cursor: pointer;
}
button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
}
input[type="checkbox" i] {
    -webkit-appearance: checkbox;
    box-sizing: border-box;
}
input[type="checkbox" i] {
    background-color: initial;
    cursor: default;
    margin: 3px 0.5ex;
    padding: initial;
    border: initial;
}
input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 1px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
}
input {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 11px system-ui;
}
.el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
}
  </style>
  <span>
    <img>
    <p id="author"></p>
    <p id="des"></p>
    <div>

    <div>
      <label class="el-checkbox">
        <span class="el-checkbox__input is-focus">
        <span class="el-checkbox__inner"></span>
          <input type="checkbox" class="el-checkbox__original" value="">
        </span>
        <span class="el-checkbox__label" style="">Option<!----></span>
      </label>
      </div>
    </div>

  </span>
`;

/*<div><label role="checkbox" class="el-checkbox"><span aria-checked="mixed" class="el-checkbox__input is-focus"><span class="el-checkbox__inner"></span><input type="checkbox" aria-hidden="true" class="el-checkbox__original" value=""></span><span class="el-checkbox__label" style="
">Option<!----></span></label></div>
    </div>*/

class Checkbox extends HTMLElement {
  /**
   * The element's constructor is run anytime a new instance is created.
   * Instances are created by parsing HTML, or calling
   * document.createElement("checkbox-r")
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
    var img = shadow.querySelector("label");

    var text = document.createElement("p");
    text.textContent = this.innerHTML;

    wrapper.appendChild(img);
    wrapper.appendChild(text);
    shadow.appendChild(wrapper);

    
    this.handleCheckValue(this.checkValue);
    this.updateValueModel();

    this.handleDisabled();
    this.handleChecked();
  }

  /**
   * `onStarClick()` is called when any rating star is clicked
   * It will correctly set the start img and text contents
   */
  onBoxClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    var label = rater.shadowRoot.querySelector("label");
    var span = rater.shadowRoot.querySelector("label span");
    //var bool = label.getAttribute("aria-checked");
    if(this.checkValue){
      label.className = "el-checkbox is-checked";

      span.className = "el-checkbox__input is-checked";

      this.checkValue = false;
    }else{
      label.className = "el-checkbox";

      span.className = "el-checkbox__input is-focus";
      this.checkValue = true;
    }
  }

  static get observedAttributes() {
    return ["check-value", "v-model", "disabled", "checked", "true-label", "false-label", "name"]; //TODO1
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute of
   * checbox-r is changed
   */
  handleDisabled(newValue) {
    var box = this.shadowRoot.querySelector("input");
    if (newValue) {
    //if (this.disabled) {
      box.removeEventListener("click", this.onBoxClick);
    }
    else {
      box.addEventListener("click", this.onBoxClick);
    }
  }

  updateValueModel() {
    this.valueModel = this.checked ? this.trueLabel : this.falseLabel;
  }

  /**
   * `handleDisabled()` is called when the `checked` attribute of
   * rater-r is changed
   */
  handleChecked() {
    //TODO ryan add the clicking behavior code here so that the checkbox get checked when this attribute is added
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * `observedAttributes` array are changed. It's a good place to handle
   * side effects, like setting ARIA attributes.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
  
    switch (name) {
    case "check":
      this.handleCheckValue(newValue);
      break;
    case "true-label":
      this.updateValueModel();
      break;
    case "false-label":
      this.updateValueModel();
      break;
    case "disabled":
      this.handleDisabled(newValue);
      break;
    case "name":
      break;
    }
  }

  /**
   * `handleCheckValue()` is called when the `v-model` attribute of
   * rater-r is changed
   */
  handleCheckValue(newValue) {
    var label = this.shadowRoot.querySelector("label");
    var span = this.shadowRoot.querySelector("label span");
    if(newValue == "true"){
      label.className = "el-checkbox is-checked";
      span.className = "el-checkbox__input is-checked";
    }
    this.checkValue = newValue;
  }
  handleValueModel(newValue) {
    newValue + ""; // to pass the husky check
  }

  set checkValue(value) {
    this.setAttribute("check-value", value);
  }

  get checkValue() {
    return this.getAttribute("check-value");
  }
  
  set trueLabel(value) {
    this.setAttribute("true-label", value);
  }

  get trueLabel() {
    return this.getAttribute("true-label") || "";
  }

  set falseLabel(value) {
    this.setAttribute("false-label", value);
  }

  get falseLabel() {
    return this.getAttribute("false-label") || "";
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

  set checked(value) {
    const isChecked = Boolean(value);
    if (isChecked)
      this.setAttribute("checked", "");
    else
      this.removeAttribute("checked");
  }

  get checked() {
    return this.hasAttribute("checked");
  }
  
  set name(value) {
    this.setAttribute("name", value);
  }

  get name() {
    return this.getAttribute("name") || "";
  }
  
}
  
customElements.define("checkbox-r", Checkbox);
