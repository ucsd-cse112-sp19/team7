/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of checkbox originally from: 
 * 
 * https://element.eleme.io/#/en-US/component/checkbox
 * 
 * Orinal Code written in Vue.js:
 * 
 * https://github.com/ElemeFE/element/blob/dev/packages/checkbox/src/checkbox.vue
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
        //padding: 5px 0px 5px 0px;
        margin: 0px 0px 10px 0px;
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
  <div>
    <label class="el-checkbox">
      <span class="el-checkbox__input is-focus">
        <span class="el-checkbox__inner"></span>
        <input type="checkbox" class="el-checkbox__original" value="">
      </span>
      <span class="el-checkbox__label" style=""></span>
    </label>
  </div>
`;

/**
 * Checkbox is a custom element that creates a web component.
 * It can be used by the tag <sds-checkbox>
 */
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
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * `connectedCallback()` is called when the element is inserted into the DOM.
   * It's a good place to set the initial attribute values and install event listeners.
   */
  connectedCallback() {
    const shadow = this.shadowRoot;


    var wrapper = shadow.querySelector("div");
    //var img = shadow.querySelector("label");

    var text = "Option";
    if (this.innerHTML != "") {
      text = this.innerHTML;
    }
    this.shadowRoot.querySelector("span.el-checkbox__label").textContent = text;

    //wrapper.appendChild(img);
    shadow.appendChild(wrapper);

    // add click event listener
    var input = this.shadowRoot.querySelector("input");
    input.addEventListener("click", this.onBoxClick);

    this.handleChecked();
    this.updateValueModel();

    this.handleChecked();
    this.handleDisabled();

    this.handleSize();
    this.handleBorder();
  }





  /**
   * `onBoxClick()` is called when any checkbox is clicked
   * It will correctly toggle the checkbox
   * @param {Event} event - the click event
   */
  onBoxClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;

    if (rater.disabled)
      return;

    var label = rater.shadowRoot.querySelector("label");
    var span = rater.shadowRoot.querySelector("label span");

    label.className = label.className.replace(/\bis-checked\b/g, "");
    span.className = span.className.replace(/\bis-checked\b/g, "");
    if (rater.checked) {
      label.className += " is-checked";
      span.className += " is-checked";
      rater.checked = false;
    } else {
      rater.checked = true;
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

  /**
   * `handleBorder()` is called when the `border` attribute is changed
   * and will show or remove the border around the checkbox
   */
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

  /**
   * `updateValueModel()` is called when the `true-label` `false-label`
   * attributes are changed and will update `v-model`
   */
  updateValueModel() {
    this.valueModel = this.checked ? this.trueLabel : this.falseLabel;
  }

  /**
   * `handleChecked()` is called when the `checked` attribute changes and will
   * update the class of the checkbox
   */
  handleChecked() {
    var label = this.shadowRoot.querySelector("label");
    var span = this.shadowRoot.querySelector("label span");
    label.className = label.className.replace(/\bis-checked\b/g, "");
    span.className = span.className.replace(/\bis-checked\b/g, "");
    if (this.checked) {
      label.className += " is-checked";
      span.className += " is-checked";
    }
  }

  /**
   * `handleSize()` is called when the `size` changes and will
   * update the size of the border
   */
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

  /**
   * `insertOutsideClass()` is called to insert css rules of the class names in
   * `class` attribute into the shadowDOM's stylesheet
   */
  insertOutsideClass() {
    var rootStyleSheet = this.getRootNode().styleSheets;
    var classArray = this.className.match(/\S+/g);
    if (!classArray || classArray.length == 0)
      return;

    var k;
    var tagArray = []; // the index corresponds to the index of classArray
    for (k = 0; k < classArray.length; k++) {
      //console.log(everything[k]);
      var class_tag = classArray[k].split("@");
      if (class_tag.length == 1) {
        classArray.splice(k, 1);
        k--;
      }
      else {
        classArray[k] = class_tag[0];
        tagArray.push(class_tag[1]);
      }
    }

    var shadowStyleSheet = this.shadowRoot.querySelector("style").sheet;
    var i, j;
    for (i = 0; i < rootStyleSheet.length; i++) {
      try {
        var rules = rootStyleSheet[i].cssRules;
        
        for (j = 0; j < rules.length; j++) {
          for (k = 0; k < classArray.length; k++) {
            if (rules[j].selectorText 
                && rules[j].selectorText.includes("." + classArray[k])
                && (!rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length]
                    || (rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length] != "-"
                        && !rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length].match(/[a-z]/i)
                    )
                ) 
            ){
              //console.log(rules[j].selectorText);
              shadowStyleSheet.insertRule(rules[j].cssText, shadowStyleSheet.cssRules.length);
            }
          }
        }
      }
      catch (e) {
        //console.log(e);
        break;
      }
    }
 
    //var everything = this.shadowRoot.querySelectorAll("*:not(style)");
    for (k = 0; k < classArray.length; k++) {
      //console.log(everything[k]);
      var items = this.shadowRoot.querySelectorAll(tagArray[k]);
      for (i = 0; i < items.length; i++) {
        if (items[i].tagName == "STYLE")
          continue;
        items[i].className += " " + classArray[k];
      }
    }
  }

  /**
   * `observedAttributes()` returns an array of attributes whose changes will
   * be handled in `attributeChangedCallback()`
   * @return {string[]} array of attributes whose changes will be handled 
   */
  static get observedAttributes() {
    return ["v-model", "disabled", "checked", "true-label", "false-label", "name", "border", "size", "class"]; //TODO1
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * `observedAttributes` array are changed. It's a good place to handle
   * side effects, like setting ARIA attributes.
   * @param {string} name - the name of the changed attribute
   * @param {string} oldValue - the old value of the attribute
   * @param {string} newValue - the new value of the attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes

    switch (name) {
    //case "v-model": no process needed for v-model
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
    case "class":
      this.insertOutsideClass();
      break;
    }
  }

  /** @type {string} */
  set trueLabel(value) {
    this.setAttribute("true-label", value);
  }

  /** @type {string} */
  get trueLabel() {
    return this.getAttribute("true-label") || "";
  }

  /** @type {string} */
  set falseLabel(value) {
    this.setAttribute("false-label", value);
  }

  /** @type {string} */
  get falseLabel() {
    return this.getAttribute("false-label") || "";
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
  set checked(value) {
    const isChecked = Boolean(value);
    if (isChecked)
      this.setAttribute("checked", "");
    else
      this.removeAttribute("checked");
  }

  /** @type {boolean} */
  get checked() {
    return this.hasAttribute("checked");
  }

  /** @type {string} */
  set name(value) {
    this.setAttribute("name", value);
  }

  /** @type {string} */
  get name() {
    return this.getAttribute("name") || "";
  }

  /** @type {boolean} */
  set border(bSelect) {
    const isSelect = Boolean(bSelect);
    if (isSelect)
      this.setAttribute("border", "");
    else
      this.removeAttribute("border");
  }

  /** @type {boolean} */
  get border() {
    return this.hasAttribute("border");
  }

  /** @type {string} */
  set size(newValue) {
    if (newValue == "small")
      this.setAttribute("size", "small");
    else if (newValue == "mini")
      this.setAttribute("size", "mini");
    else
      this.setAttribute("size", "medium");
  }

  /** @type {string} */
  get size() {
    return this.getAttribute("size") || "medium";
  }

}

customElements.define("sds-checkbox", Checkbox);
/*
function getCss() {
  if (document.styleSheets && document.styleSheets.length > 0)
    return document.styleSheets;

  var css = [];
  for (var sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
    var sheet = document.styleSheets[sheeti];
    var rules = ('cssRules' in sheet) ? sheet.cssRules : sheet.rules;
    for (var rulei = 0; rulei < rules.length; rulei++) {
      var rule = rules[rulei];
      if ('cssText' in rule)
        css.push(rule.cssText);
      else
        css.push(rule.selectorText + ' {\n' + rule.style.cssText + '\n}\n');
    }
  }

  return css.join('\n');
}*/