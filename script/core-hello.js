// import { LitElement, html } from 'lit-element';

// class MyComponent extends LitElement {
//   render() {
//     var lan = this.getAttribute("lang");
//     var hws = "Hello World -";

//     if(lan == "English") {

//     }
//     else if(lan == "Spanish") {
//         hws = "Hola Mundo -";
//     }
//     else if(lan == "Chinese") {
//         hws = "你好,世界 -";
//     }

//     return html`
//       <p>${hws} ${this.textContent} !</p>
//     `;
//   }
// }

// customElements.define('core-hello', MyComponent);


class corehello extends HTMLElement {
  constructor() {
    super();

    var lan = this.getAttribute("lang");
    var name = this.innerHTML;
    const shadowRoot = this.attachShadow({mode: "open"});


    var template = document.getElementById("major-template");
    var clone = document.importNode(template.content, true);
    var td = clone.querySelector("p");
      
    if(lan == "English") {
      td.textContent = "Hello World - "+name;
    }
    else if(lan == "Spanish") {
      td.textContent = "Hola Mundo - "+name;
    }
    else if(lan == "Chinese") {
      td.textContent = "你好,世界 - "+name;
    }
    else if(lan == "Team7") {
      td.textContent = "T*$@%E#*%A@*%M)@#*%7 - "+name;
    }
    shadowRoot.appendChild(clone);
  }
}

window.customElements.define("core-hello", corehello);