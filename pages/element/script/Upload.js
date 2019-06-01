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

import {storageRef} from "./init_firebase.js";


let selectedFile;
/**
 * `handleFileUploadChange` deals with file selection. NOTE: still trying to figure out how to include it within the class below
 * @param {*} e 
 */
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}



const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }

  </style>
  <div>
  <span>
    <div id="filesubmit">
      <input type="file" class="file-select" accept="image/*" />
      <button class="file-submit">SUBMIT</button>
      <img class = 'imageholder'></img>
    </div>
  </span>
  </div>
`;

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
    //var img = shadow.querySelector("label");
    //var imageholder = shadow.querySelector("imageholder");
    shadow.querySelector(".file-select").addEventListener("change", handleFileUploadChange);
    shadow.querySelector(".file-submit").addEventListener("click", this.handleFileUploadSubmit);
  }

  /**
     * `observedAttributes()` returns an array of attributes whose changes will
     * be handled in `attributeChangedCallback()`
     * @return {string[]} array of attributes whose changes will be handled 
     */
  static get observedAttributes() {
    return [
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
    case "":

      break;
    }
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
  /** 
 * `handleFileUploadSubmit` handles when the user clicks the submit button - it uploads the image to firebase and displays it 
 * @listens {click} listens for the user click on the submit button
 * @throws {error} when upload is unsucessfil
 * @throws {error} when displaying the image is unsucessful
*/
  handleFileUploadSubmit(event) {
    var upload = event.target.getRootNode().host;
    if (upload.disabled)
    return;

    var imageholder = upload.shadowRoot.querySelector('img.imageholder');
    
    let imageRef = storageRef.child(`images/${selectedFile.name}`);
    const uploadTask = imageRef.put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    }, () => {
      // Do something once upload is complete
      console.log("successfully loaded image to firebase");
    });
   
    //var upload = e.target.getRootNode().host
    //display image. It gets the uploaded image's url 
    imageRef.getDownloadURL().then(function(url) {
      // Get the download URL for image
      // This can be inserted into an <img> tag
      //var img = document.createElement("img");
      //img.setAttribute("src", url);
      //document.body.appendChild(img);
      
      //var img = this.shadowRoot.querySelector('imageholder');
      //var img = upload.shadowRoot.querySelector('imageholder');
      imageholder.setAttribute("src", url);
    }).catch(function(error) {
      console.error(error);
    });
  }
}

customElements.define("sds-upload", Upload);

