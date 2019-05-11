class Rater extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }
  static get observedAttributes() {
    return ["valuemodel", "max", "disabled", "show-text", "texts"];
  }
  connectedCallback() {
    const shadow = this.shadowRoot;
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    var author = document.createElement("p");
    var info = document.createElement("p");

    var authortext = "Author: " + this.getAttribute("author");
    var text = "Description: " + this.getAttribute("des");
    info.textContent = text;
    author.textContent = authortext;
    var imgUrl;
    if(this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "background.jpg";
    }
    var img = document.createElement("img");
    img.src = imgUrl;
    img.height="300";

    var value = this.getAttribute("valuemodel");
    var max = this.getAttribute("max");
    var disabled = this.getAttribute("disabled");
    var showtext = this.getAttribute("show-text");
    //var showscore = this.getAttribute("show-score");
    var texts = this.getAttribute("texts");



    //Default Values setter
    var items = [];
    var stars = [];
    var textArray = [];

    var i;
    if(max == null || max <= 0) max = 5;
    if(value == null || value <= 0) value = 0;
    if(showtext == 1) {
      if(texts == null || texts.length == 0) {
        for(i = 0; i < max; i++) {
          textArray.push(i+1);
        }
      }
      else {
        textArray = texts.split(",");
      }
    }
    //Element Creating
    const slider = document.createElement("div");
    for(i = 0; i < max; i++) {
      items.push(document.createElement("span"));
      stars.push(document.createElement("img"));
      if(i < value)
        stars[i].src = "starclicked.png";
      else
        stars[i].src = "star.png";
      stars[i].id = i+1;
      stars[i].height = "20";
    }

    const ratertext = document.createElement("p");
    var ratetext = "";
    ratertext.textContent = ratetext;

    //Shadow DOM appending
    for(i = 0; i < max; i ++) {
      items[i].appendChild(stars[i]);
      slider.appendChild(items[i]);
    }

    slider.appendChild(ratertext);

    //Handle Click Events
    if(disabled == null) {
      var j;
      for(i = 0; i < max; i ++) {
        const id = stars[i].id;
        stars[i].addEventListener("click", function() {
          for(j = 0; j < max; j++) {
            if(j < id)
              stars[j].src="starclicked.png";
            else
              stars[j].src="star.png";
          }
          ratetext = textArray[id-1];
          ratertext.textContent = ratetext;
        });
      }
    }

    //Final Append
    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(author);
    wrapper.appendChild(info);
    wrapper.appendChild(slider);
  }

  set max(value) {
    const isChecked = Boolean(value);
    if (isChecked)
      this.setAttribute("checked", "");
    else
      this.removeAttribute("checked");
  }

  get max() {
    return this.hasAttribute("checked");
  }

  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled)
      this.setAttribute("disabled", "");
    else
      this.removeAttribute("disabled");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

}
  
customElements.define("rater-r", Rater);
