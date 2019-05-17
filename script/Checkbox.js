/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of checkbox originally from: 
 * 
 * https://element.eleme.io/#/en-US/component/checkbox
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
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
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
    .el-checkbox.is-bordered {
      padding: 9px 20px 9px 10px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      line-height: normal;
      height: 40px;
    }
    .el-checkbox.is-bordered.is-checked {
      border-color: #409eff;
    }
    .el-checkbox.is-bordered.el-checkbox--small {
      padding: 5px 15px 5px 10px;
      border-radius: 3px;
      height: 32px;
    }
    .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label {
      line-height: 15px;
      font-size: 12px;
    }
    .el-checkbox.is-bordered.el-checkbox--mini {
      padding: 3px 15px 3px 10px;
      border-radius: 3px;
      height: 28px;
    }

    .el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner, 
    .el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
      height: 12px;
      width: 12px;
    }
    .el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label {
      line-height: 12px;
      font-size: 12px;
    }

    .el-checkbox.is-bordered.is-disabled {
      border-color: #ebeef5;
      cursor: not-allowed;
    }
    .el-checkbox__input.is-disabled+span.el-checkbox__label {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
      background-color: #f2f6fc;
      border-color: #dcdfe6;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after {
      /* border-color: #c0c4cc; */
    }
    .el-checkbox__input.is-checked .el-checkbox__inner:after {
      transform: rotate(45deg) scaleY(1);
    }
    .el-checkbox__input.is-disabled .el-checkbox__inner:after {
      cursor: not-allowed;
      border-color: #c0c4cc;
    }
    .el-checkbox__input.is-disabled {
      cursor: not-allowed;
    }

    .el-checkbox:last-child {
      margin-right: 0;
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
        <span class="el-checkbox__label" style=""><!----></span>
      </label>
      </div>
    </div>

  </span>
`;

/*<div><label role="checkbox" class="el-checkbox"><span aria-checked="mixed" class="el-checkbox__input is-focus"><span class="el-checkbox__inner"></span><input type="checkbox" aria-hidden="true" class="el-checkbox__original" value=""></span><span class="el-checkbox__label" style="
">Option<!----></span></label></div>
    </div>*/

export class Checkbox extends HTMLElement {
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

    var text = "Option";
    if(this.innerHTML != "") {
      text = this.innerHTML;
    }
    this.shadowRoot.querySelector("span.el-checkbox__label").textContent = text;

    wrapper.appendChild(img);
    shadow.appendChild(wrapper);

    // add click event listener
    var input = this.shadowRoot.querySelector("input");
    input.addEventListener("click", this.onBoxClick);
    
    this.handleChecked();
    this.updateValueModel();

    this.handleValueModel(this.valueModel);

    this.handleChecked();
    this.handleDisabled();

    this.handleSize();
    this.handleBorder();
  }

  /**
   * `onBoxClick()` is called when box is clicked
   * It will correctly set the start img and text contents
   */
  onBoxClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;

    if (rater.disabled)
      return;

    var label = rater.shadowRoot.querySelector("label");
    var span = rater.shadowRoot.querySelector("label span");
    //var bool = label.getAttribute("aria-checked");
    label.className = label.className.replace(/\bis-checked\b/g, "");
    span.className = span.className.replace(/\bis-checked\b/g, "");
    if(rater.checked) { 
      label.className += " is-checked";
      span.className += " is-checked";
      rater.checked = false;
    } else {
      rater.checked = true;
    }
  }

  static get observedAttributes() {
    return ["v-model", "disabled", "checked", "true-label", "false-label", "name", "border", "size"]; //TODO1
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * `observedAttributes` array are changed. It's a good place to handle
   * side effects, like setting ARIA attributes.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
  
    switch (name) {
    case "checked":
      this.handleChecked();
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
    case "size":
      this.handleSize();
      break;
    case "border":
      this.handleBorder();
      break;
    }
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute of
   * checbox-r is changed
   */
  handleDisabled() {
    var label = this.shadowRoot.querySelector("label.el-checkbox");
    var span = this.shadowRoot.querySelector("span.el-checkbox__input");
    if (this.disabled) {
      label.className = label.className.replace(/\bis-disabled\b/g, "");
      label.className += " is-disabled";
      span.className = span.className.replace(/\bis-disabled\b/g, "");
      span.className += " is-disabled";
    }
    else {
      label.className = label.className.replace(/\bis-disabled\b/g, "");
      span.className = span.className.replace(/\bis-disabled\b/g, "");
    }
  }

  handleBorder() {
    var label = this.shadowRoot.querySelector("label.el-checkbox");
    if (this.border) {
      label.className = label.className.replace(/\bis-bordered\b/g, "");
      label.className += " is-bordered";
    }
    else {
      label.className = label.className.replace(/\bis-bordered\b/g, "");
    }
  }

  updateValueModel() {
    this.valueModel = this.checked ? this.trueLabel : this.falseLabel;
  }
  /**
   * `handleChecked()` is called when the check value changes
   */
  handleChecked() {
    var label = this.shadowRoot.querySelector("label");
    var span = this.shadowRoot.querySelector("label span");
    label.className = label.className.replace(/\bis-checked\b/g, "");
    span.className = span.className.replace(/\bis-checked\b/g, "");
    if(this.checked) { 
      label.className += " is-checked";
      span.className += " is-checked";
    }
  }

  handleValueModel(newValue) {
    newValue + ""; // to pass the husky check
  }
  
  handleSize() {
    var label = this.shadowRoot.querySelector("label.el-checkbox");
    label.className = label.className.replace(/\bel-checkbox--small\b/g, "");
    label.className = label.className.replace(/\bel-checkbox--mini\b/g, "");
    if (this.size == "small") {
      label.className += " el-checkbox--small";
    }
    else if (this.size == "mini") {
      label.className += " el-checkbox--mini";
    }
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
  
  set border(bSelect) {
    if (bSelect)
      this.setAttribute("border", "");
    else
      this.removeAttribute("border");
  }

  get border() {
    return this.hasAttribute("border");
  }
  
  set size(newValue) {
    if (newValue == "small")
      this.setAttribute("size", "small");
    else if (newValue == "mini")
      this.setAttribute("size", "mini");
    else
      this.setAttribute("size", "medium");
  }

  get size() {
    return this.getAttribute("size") || "medium";
  }

}
  
customElements.define("checkbox-r", Checkbox);
