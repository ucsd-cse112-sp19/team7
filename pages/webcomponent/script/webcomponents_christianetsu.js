/*
// Polyfill support
HTMLElement.prototype.createShadowRoot = 
  HTMLElement.prototype.createShadowRoot ||
  HTMLElement.prototype.webkitCreateShadowRoot ||
  function() {};

// Add the template to the Shadow DOM
var template = document.getElementById("test-major");
templateContent = template.content;
var host = document.querySelector('.img-slider');
var root = host.createShadowRoot();
root.appendChild(document.importNode(tmpl.content, true));
*/

class AddMajorElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: "open"});
    this.major = this.innerHTML; // string variable storing the major
    if (this.major.length == 0) {
      this.major = "Computer Science";
    }
    var template = document.getElementById("major-template");
    var clone = document.importNode(template.content, true);
    var td = clone.querySelector("p");
    td.textContent = "Major: " + this.major;
    shadowRoot.appendChild(clone);
        
    // if not using template
    /*
            shadowRoot.innerHTML = `
                <p>Major: ${this.major}</p>
            `;
        */
            
  }
}

customElements.define("test-major", AddMajorElement);


// for ES6 module
/*
export {
  AddMajorElement as AddMajorElementClass
  // can export multiple class/var; separate by commas
};
*/