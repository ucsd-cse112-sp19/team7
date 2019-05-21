export class CECoreHello extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "closed" });

    // clone the template to create a fragment
    let coreHelloFrag = document.getElementById("CECoreHelloT").content.cloneNode(true);
    //let lang = this.getAttribute("lang");
    // default to English
    // let langVal = lang === null ? "en" : lang.valueOf();
    // let greeting = langVal === "es" ? "Hola Mundo" : 
    //   langVal === "pt" ? "Olá Mundo" : 
    //     "Hello World";
    // set paragraph text to the greeting and whatever HTML was originally inside the <ce-core-hello> tag
    coreHelloFrag.querySelector("p").innerHTML = `${this.innerHTML}`;
    // this isn't necessary, but it gets rid of the original HTML because it is now in the p element
    this.innerHTML = "";

    // cycle through colors of rainbow every 200 ms
    let colorI = 0;
    let colors = ["#ff0000", "#ff4000", "#ff8000", "#ffbf00", "#ffff00", "#bfff00", "#80ff00"
      ,"#40ff00", "#00ff00", "#00ff40", "#00ff80", "#00ffbf", "#00ffff", "#00bfff",
      "#0080ff", "#0040ff", "#0000ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff",
      "#ff00bf", "#ff0080", "#ff0040", "#ff0000"];
    if(this.getAttribute("rainbow") !== null) {
      setInterval(() => {
        this.style.color = colors[colorI];
        colorI = (colorI + 1) % colors.length;
      }, 100);
    }
    
    shadow.appendChild(coreHelloFrag);
  }
}
customElements.define("ce-core-hello", CECoreHello);
