import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  render: h => h(App)
});

export class CECoreHello extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "closed" });
  
    // clone the template to create a fragment
    let coreHelloFrag = document.getElementById("CECoreHelloT").content.cloneNode(true);
    let lang = this.getAttribute("lang");
    // default to English
    let langVal = lang === null ? "en" : lang.valueOf();
    let greeting = langVal === "es" ? "Hola Mundo" : 
      langVal === "pt" ? "Olá Mundo" : 
        "Hello World";
      // set paragraph text to the greeting and whatever HTML was originally inside the <ce-core-hello> tag
    coreHelloFrag.querySelector("p").innerHTML = `${greeting} ${this.innerHTML}`;
    // this isn't necessary, but it gets rid of the original HTML because it is now in the p element
    this.innerHTML = "";
  
    // cycle through colors of rainbow every 200 ms
    let colorI = 0;
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    if(this.getAttribute("rainbow") !== null) {
      setInterval(() => {
        this.style.color = colors[colorI];
        colorI = (colorI + 1) % colors.length;
      }, 200);
    }
      
    shadow.appendChild(coreHelloFrag);
  }
}
customElements.define("ce-core-hello", CECoreHello);
  