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


var tmpl = document.querySelector('template');

  // Create a prototype for a new element that extends HTMLElement
  var ImgSliderProto = Object.create(HTMLElement.prototype);

  // Setup our Shadow DOM and clone the template
  ImgSliderProto.createdCallback = function() {
    var root = this.createShadowRoot();
    root.appendChild(document.importNode(tmpl.content, true));
  };

  // Register our new element
  var ImgSlider = document.registerElement('img-slider', {
    prototype: ImgSliderProto
  });

<template id="major-template">
 <style></style>
 <p></p>
</template>
*/

  // We define an ES6 class that extends HTMLElement
class AddMajorElement extends HTMLElement {
    constructor() {
        super();
 
        // We attach an open shadow root to the custom element
        const shadowRoot= this.attachShadow({mode: 'open'});

 
 		this.major = this.innerHTML; // string variable storing the major
		if (this.major.length == 0) {
        	this.major = "Computer Science";
        }

        // We provide the shadow root with some HTML 
        shadowRoot.innerHTML = `
            <p>Major: ${this.major}</p>
        `;

         
 
        // We can bind an event which references one of the class methods
        //this.incrementButton.addEventListener("click", this.decrement.bind(this));
        //this.decrementButton.addEventListener("click", this.increment.bind(this));
 
    }
}
 
// This is where the actual element is defined for use in the DOM
customElements.define('test-major', AddMajorElement);