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

      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyAWQ3Vi-7CTKYVgS1yQ7WHA7S0vShJCgZs",
        authDomain: "team7-element.firebaseapp.com",
        databaseURL: "https://team7-element.firebaseio.com",
        projectId: "team7-element",
        storageBucket: "team7-element.appspot.com",
        messagingSenderId: "860166313157",
        appId: "1:860166313157:web:59ab005177ad2f01"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

const storageService = firebase.database();
const storageRef = storageService.ref();


document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let selectedFile;
function handleFileUploadChange(e){
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
  const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     console.log('success');
  });
}

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    
 
  </style>
 
`;

/**
 * Rater is a custom element that creates a web component.
 * It can be used by the tag <sds-rate>
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
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  /**
     * `connectedCallback()` is called when the element is inserted into the DOM.
     * It's a good place to set the initial attribute values and install event listeners.
     */
  connectedCallback() {
    const shadow = this.shadowRoot;
    //TODO4
  
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
}
  
customElements.define("sds-upload", Upload);

