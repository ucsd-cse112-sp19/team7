export class CECoreHello extends HTMLElement {
	constructor() {
		super();
		let shadow = this.attachShadow({ mode: "closed" });

    let coreHelloFrag = document.getElementById("CECoreHelloT").content.cloneNode(true);
    let lang = this.getAttribute("lang");
    let langVal = lang === null ? "en" : lang.valueOf();
    let greeting = langVal === "es" ? "Hola Mundo" : 
      langVal === "pt" ? "Olá Mundo" : 
      "Hello World";
    coreHelloFrag.querySelector("p").innerHTML = `${greeting} ${this.innerHTML}`;
    this.innerHTML = "";

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
