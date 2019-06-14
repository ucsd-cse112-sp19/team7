/**
 * A web component that adds "Random Hello World" to the content
 */
class corehello extends HTMLElement {

  /**
   * Construct core-hello with rainbow effect and translation
   * @constructor
   */
  constructor() {
    super();

    var lan = this.getAttribute("lang"); //Get lang Attribute
    var name = this.innerHTML; //Get the name after text "Hello World - "
    const shadowRoot = this.attachShadow({mode: "open"}); //shadow DOM


    var template = document.getElementById("major-template");
    var clone = document.importNode(template.content, true);
    var td = clone.querySelector("p");
      
    //Language texts cases
    if(lan == "English") {
      td.textContent = "Random Hello - "+name;
    }
    else if(lan == "Spanish") {
      td.textContent = "Hola Mundo - "+name;
    }
    else if(lan == "Chinese") {
      td.textContent = "你好,世界 - "+name;
    }
    else if(lan == "Team7") {
      td.textContent = "We love "+name;
    }
    shadowRoot.appendChild(clone);
  }
}
//Define Component
window.customElements.define("core-hello", corehello);