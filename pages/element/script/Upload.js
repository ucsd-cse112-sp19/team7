/**
 * Author: Team7, CSE112 Spring 2019
 * 
 * Description: This is a ported version of rater originally from: 
 * 
 * https://element.eleme.io/#/en-US/component/upload
 * 
 * Orinal Code written in Vue.js:
 * 
 * https://github.com/ElemeFE/element/blob/dev/packages/upload/src/upload.vue
 * 
 */

/**
 * Cloning contents from a &lt;template&gt; element is more performant
 * than using innerHTML because it avoids addtional HTML parse costs.
 */

import {storageRef} from "./init_firebase.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    .demo-block .upload-demo {
      width: 360px;
    }
    div {
      display: block;
    }
    .el-upload {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      outline: none;
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .el-button--small {
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
    }
    button, input, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
    }
    button {
      border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
      border-style: solid;
      border-width: 1px;
      padding: 1px 7px 2px;
    }
    button {
      align-items: flex-start;
      text-align: center;
      cursor: default;
      color: buttontext;
      background-color: buttonface;
      box-sizing: border-box;
      padding: 2px 6px 3px;
      border-width: 2px;
      border-style: outset;
      border-color: buttonface;
      border-image: initial;
    }
    button {
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
    .el-button--primary:focus, .el-button--primary:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    .el-button--primary.is-active, .el-button--primary:active {
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
    }
    .el-upload__input {
      display: none;
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
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;
    }
    input[type="file" i] {
      align-items: baseline;
      color: inherit;
      text-align: start !important;
    }
    input[type="file" i] {
      -webkit-appearance: initial;
      background-color: initial;
      cursor: default;
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
    .el-upload-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      width: 360px;
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
    .el-upload-list__item.is-success:active, .el-upload-list__item.is-success:not(.focusing):focus {
      outline-width: 0;
    }
    .el-upload-list__item:hover {
      background-color: #f5f7fa;
    }
    .el-upload-list__item:hover .el-icon-close {
      display: block;
    }
    .el-upload-list__item:hover .el-upload-list__item-status-label {
      display: none !important;
    }
    .el-upload-list__item:first-child {
      margin-top: 10px;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
    .el-upload-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .el-upload-list__item-name {
      color: #606266;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      transition: color .3s;
      white-space: nowrap;
    }
    a {
      color: #409eff;
      text-decoration: none;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    .el-upload-list__item-name [class^=el-icon] {
      height: 100%;
      margin-right: 7px;
      color: #909399;
      line-height: inherit;
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
      webkit-font-smoothing: antialiased;
      moz-osx-font-smoothing: grayscale;
    }
    .el-upload-list__item-name {
      color: #606266;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      transition: color .3s;
      white-space: nowrap;
    }
    i {
      font-style: italic;
    }
    .el-icon-document:before {
      content: "\\e785";
    }
    .el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: block;
    }
    .el-upload-list__item.is-success:active .el-icon-close-tip, .el-upload-list__item.is-success:focus .el-upload-list__item-status-label, .el-upload-list__item.is-success:hover .el-upload-list__item-status-label, .el-upload-list__item.is-success:not(.focusing):focus .el-icon-close-tip {
      display: none;
    }
    .el-upload-list__item-status-label {
      position: absolute;
      right: 5px;
      top: 0;
      line-height: inherit;
      display: none;
    }
    label {
      cursor: default;
    }
    .el-upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
    }
    .el-upload-list__item .el-icon-upload-success {
      color: #67c23a;
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
      webkit-font-smoothing: antialiased;
      moz-osx-font-smoothing: grayscale;
    }
    i {
      font-style: italic;
    }
    .el-upload-list__item .el-icon-close {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: .75;
      color: #606266;
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
    .el-upload-list__item .el-icon-close-tip {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      cursor: pointer;
      opacity: 1;
      color: #409eff;
    }
    .el-upload-list__item.is-success .el-upload-list__item-name:focus, .el-upload-list__item.is-success .el-upload-list__item-name:hover {
      color: #409eff;
      cursor: pointer;
    }
    .el-icon-circle-check:before {
      content: "\\e720";
    }
    .el-icon-close:before {
      content: "\\e6db";
    }
    .el-upload-list__item .el-icon-close:hover {
      opacity: 1;
    }
    .el-upload-list__item:hover .el-icon-close {
      display: inline-block;
    }
    .el-upload-dragger {
      background-color: #fff;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      box-sizing: border-box;
      width: 360px;
      height: 180px;
      text-align: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    div {
      display: block;
    }
    .el-upload-dragger .el-icon-upload {
      font-size: 67px;
      color: #c0c4cc;
      margin: 40px 0 16px;
      line-height: 50px;
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
    .el-upload-dragger .el-upload__text {
      color: #606266;
      font-size: 14px;
      text-align: center;
    }
    .el-upload-dragger:hover {
      border-color: #409eff;
    }
    .el-icon-upload:before {
      content: "\\e7c3";
    }
    .el-upload-dragger .el-upload__text em {
      color: #409eff;
      font-style: normal;
    }
    .el-upload-dragger.is-dragover {
      background-color: rgba(32,159,255,.06);
      border: 2px dashed #409eff;
    }
    .el-upload-list--picture .el-upload-list__item-thumbnail {
      vertical-align: middle;
      display: inline-block;
      width: 70px;
      height: 70px;
      float: left;
      position: relative;
      z-index: 1;
      margin-left: -80px;
      background-color: #fff;
    }
    .el-upload-list--picture .el-upload-list__item {
      overflow: hidden;
      z-index: 0;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px 10px 10px 90px;
      height: 92px;
  }
  
  
  </style>
  
  <div class="demo-block upload-demo">
    <div tabindex="0" class="el-upload el-upload--text">
      <button type="button" class="el-button el-button--primary el-button--small">
        <!---->
        <!---->
        <span>Click to upload</span>
      </button>

      <div class="el-upload-dragger">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div> 
      </div>

      <input type="file" name="file" multiple class="el-upload__input">
    </div>
    <ul class="el-upload-list el-upload-list--text">
      
    </ul>
  </div>
`;

const listTemplate = document.createElement("template");
listTemplate.innerHTML = `
      <li tabindex="0" class="el-upload-list__item is-success">
      <img style="display:none;" alt="" class="el-upload-list__item-thumbnail">
        <!---->
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i><!-- file name goes here -->
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-circle-check"></i>
        </label>
        <i class="el-icon-close"></i>
        <!--
        <i class="el-icon-close-tip">按 delete 键可删除</i>
        -->
        <!---->
      </li>
`;

/*const listTemplateThumbnail = document.createElement("template");
listTemplateThumbnail.innerHTML = `
  <li tabindex="0" class="el-upload-list__item is-success">
    <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" alt="" class="el-upload-list__item-thumbnail">
      <a class="el-upload-list__item-name">
        <i class="el-icon-document"></i>food.jpeg
      </a>  
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label><i class="el-icon-close"></i>
      <i class="el-icon-close-tip">按 delete 键可删除</i><!----><!---->
  </li>
`;*/

/**
 * Upload is a custom element that creates a web component.
 * It can be used by the tag <sds-upload>
 */
export class Upload extends HTMLElement {
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
    //TODO4
    var wrapper = shadow.querySelector("div");
    shadow.appendChild(wrapper);

    // add click event listener
    
    var button = this.shadowRoot.querySelector("button.el-button");
    button.addEventListener("click", this.onButtonClick);

    var input = this.shadowRoot.querySelector("input.el-upload__input");
    input.addEventListener("change", this.onClickUpload);

    var dragger = this.shadowRoot.querySelector("div.el-upload-dragger");
    dragger.addEventListener("click", this.onButtonClick);
    dragger.addEventListener("dragover", this.onDragOver);
    dragger.addEventListener("dragleave", this.onDragLeave);
    dragger.addEventListener("drop", this.onDrop);

    this.handleDrag();

  }

  /**
   * `onClickUpload(event)` gets called when the user clicks upload. It calls `handleFileUpload(files)` 
   * to deal with the files that got uploaded. That file is in event.tartget.files. Note: it's an array of files
   * @param {event} event - the click event
   */
  onClickUpload(event) {
    var upload = event.target.getRootNode().host;
    upload.handleFileUpload(event.target.files);
  }

  /**
   * `handleFileUpload(files)` gets called by `onClickUpload(event)`. It's responsible for uploading the file to firebase.
   * it calls `addFileListItem(file)` to show the user that the file got uploaded in a list directly below the upload button
   * @param {files} files - files that got uploaded
   * @throws {error} -throws error if uploading to firebase goes wrong
   */
  handleFileUpload(files) {
    var upload = this;
    var selectedFile = files[0]; //take the first file

    if (!selectedFile)
      return;

    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // eslint-disable-next-line no-console
      console.log(snapshot);
    }, (error) => {
      // Handle unsuccessful uploads
      // eslint-disable-next-line no-console
      console.log(error);
      window.alert("Upload failed, please try again");
    }, () => {
      // Do something once upload is complete
      // eslint-disable-next-line no-console
      console.log("success");
      upload.addFileListItem(selectedFile);
    });
  }

  /**
   * `addFileListItem(file)` This function adds this file to the list and is called by `handleFileUpload(files)`.
   * It appends the file to the end of the list and adds the appropriate template (if we display the thumbnail or not) to the shadow DOM
   * It adds the click listener to the cancel upload (the "x") icon
   * @param {file} file - the file that the user has uploaded.
   */
  addFileListItem(file) {
    var fileName = file.name;
    var upload = this;
    var list = upload.shadowRoot.querySelector("ul.el-upload-list");
    list.appendChild(listTemplate.content.cloneNode(true));

    // add item to list
    var listItems = upload.shadowRoot.querySelectorAll("ul.el-upload-list li");
    var lastItem = listItems[listItems.length - 1];
    lastItem.querySelector("a.el-upload-list__item-name").innerHTML += fileName;
    
    //check if we have the display-thumbnail attribute on
    if(this.displayThumbnail){
      lastItem.querySelector("img").src = URL.createObjectURL(file);
      lastItem.querySelector("img").style.display = "block";
      //list.className = "el-upload-list--picture";
      list.classList.add("el-upload-list--picture");
    }


    // add click listener to the cancel icon
    lastItem.querySelector("i.el-icon-close").addEventListener("click", function() {
      // delete from list
      list.removeChild(lastItem);

      // delete from firebase
      var desertRef = storageRef.child(`images/${fileName}`); // create a reference to the file to delete
      desertRef.delete().then(function() {
        // File deleted successfully
        // eslint-disable-next-line no-console
        console.log("deleted " + fileName);
      }).catch(function(error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // Uh-oh, an error occurred!
      });
    });
  }

  onDragOver(event){
    event.preventDefault();
    event.stopPropagation();
    var select = event.target.getRootNode().host;
    var dragger = select.shadowRoot.querySelector("div.el-upload-dragger");
    dragger.className = "el-upload-dragger is-dragover";
  }
  onDragLeave(event){
    event.preventDefault();
    event.stopPropagation();
    var select = event.target.getRootNode().host;
    var dragger = select.shadowRoot.querySelector("div.el-upload-dragger");
    dragger.className = "el-upload-dragger";
  }
  onDrop(event){
    event.preventDefault();
    event.stopPropagation();

    var upload = event.target.getRootNode().host;
    //var input = upload.shadowRoot.querySelector("input.el-upload__input");
    upload.handleFileUpload(event.dataTransfer.files);
    
    var select = event.target.getRootNode().host;
    var dragger = select.shadowRoot.querySelector("div.el-upload-dragger");
    dragger.className = "el-upload-dragger";
  }
  
  /**
   * `onButtonClick()` is called when upload button is clicked
   * It will correctly trigger the upload action
   * @param {Event} event - the click event
   */
  onButtonClick(event) {
    // cannot use this as the this in event listener is the target
    var button = event.target.getRootNode().host;
    var input = button.shadowRoot.querySelector("input.el-upload__input");
    input.click();

    /*selectedFile = input.value;//event.target.files[0];
    console.log(selectedFile);
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log("success");
    });*/
    
  }
  

  /**
   * `handleDragger()` is called when the `dragger` attribute changes and will
   * update the class of the checkbox
   */
  handleDrag() {
    var dragger = this.shadowRoot.querySelector("div.el-upload-dragger");
    var button = this.shadowRoot.querySelector("button.el-button");
    if (this.drag){
      dragger.style.display = "";
      button.style.display = "none";
    } else {
      dragger.style.display = "none";
      button.style.display = "";
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
                && (!rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1]
                    || (rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1] != "-"
                        && !rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1].match(/[a-z]/i)
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
    return [ "hide-file-list", "drag", "display-thumbnail", "class"
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
    case "hide-file-list":
      this.shadowRoot.querySelector("ul.el-upload-list").style.display
        = this.hideFileList ? "none" : "";
      break;
    case "drag":
      this.handleDrag();
      break;
    case "display-thumbnail":
      //don't need anything for this
      break;
    case "class":
      this.insertOutsideClass();
      break;
    case "placeholder-to-avoid-linting-error":
      oldValue = newValue;
      break;
    }
  }

  /** @type {boolean} */
  set hideFileList(value) {
    const showList = Boolean(value);
    if (showList)
      this.setAttribute("hide-file-list", "");
    else
      this.removeAttribute("hide-file-list");
  }

  /** @type {boolean} */
  get hideFileList() {
    return this.hasAttribute("hide-file-list");
  }

  /** @type {boolean} */
  set drag(value) {
    const showList = Boolean(value);
    if (showList)
      this.setAttribute("drag", "");
    else
      this.removeAttribute("drag");
  }

  /** @type {boolean} */
  get drag() {
    return this.hasAttribute("drag");
  }
  
  /** @type {boolean} */
  get displayThumbnail(){
    return this.hasAttribute("display-thumbnail");
  }
  set displayThumbnail(value) {
    const showList = Boolean(value);
    if (showList)
      this.setAttribute("display-thumbnail", "");
    else
      this.removeAttribute("display-thumbnail");
  }
  //TODO2
}

customElements.define("sds-upload", Upload);

