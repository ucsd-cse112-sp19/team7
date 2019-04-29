import { LitElement, html } from "lit-element";

class WebcomponentsDan extends LitElement { 
    
  render() {
    var lang = this.getAttribute("lang");
    if (lang == "eng"){
      return html`
            <p>Hello World ${this.textContent}</p>
            `;
    }
    if (lang == "spa"){
      return html`
            <p>Hola Mundo ${this.textContent}</p>
            `;
    }
    if (lang == "ger"){
      return html`
            <p>Hallo Welt ${this.textContent}</p>
        `;
    }
    return html`
        <p>Hello World ${this.textContent}</p>
        `;
  }
}

customElements.define("webcomponents-dan", WebcomponentsDan);