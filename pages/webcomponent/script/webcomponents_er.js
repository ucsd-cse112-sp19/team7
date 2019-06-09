class TestWebComponent extends HTMLElement {
  constructor() {
    super();

    var clicked = false;

    var body = document.createElement("body");

    this.appendChild(body);

    body.innerHTML = "Click to Hide Major";

    document.querySelector("test-er").addEventListener("click", function() {
      clicked = !clicked;
      if (!clicked) {
        body.innerHTML = "Click to Hide Major";
      }
      else {
        body.innerHTML = "Click to Display Major";
      }
    });
  }
}

window.customElements.define("test-er", TestWebComponent);