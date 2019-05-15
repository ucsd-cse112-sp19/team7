const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    img {
      height: 300px;
    }
    div img {
      height: 20px;
    }

    .el-rate__icon {
      font-size: 18px;
      margin-right: 6px;
      color: #c0c4cc;
      transition: .3s;
    }
    .el-rate__icon, .el-rate__item {
      display: inline-block;
      position: relative;
    }
    [class*=" el-icon-"], [class^=el-icon-] {
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    i {
      font-style: italic;
    }
    .el-rate__item {
        font-size: 0;
        vertical-align: middle;
        cursor: pointer;
    }
    .el-rate {
        height: 20px;
        line-height: 1;
    }
    .el-icon-star-off:before {
      content: "\\e717";
    }
    .el-icon-star-on:before {
      content: "\\e797";
    }
    .el-rate__item:not(.disabled) .el-rate__icon:hover {
      transform: scale(1.15);
    }
    .el-rate__item.disabled {
        cursor: default;
    }

  </style>
  <span>
    <img>
    <p id="author"></p>
    <p id="des"></p>
    <div class="el-rate">
    
    </div>
  </span>
`;


class Rater extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const shadow = this.shadowRoot;

    var author = shadow.querySelector("p#author");
    var info = shadow.querySelector("p#des");
    author.textContent = "Author: " + this.getAttribute("author");
    info.textContent = "Description: " + this.getAttribute("des");

    var imgUrl;
    if(this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "background.jpg";
    }
    var img = shadow.querySelector("img");
    img.src = imgUrl;

    const slider = shadow.querySelector("div");

    // set up the rating bar
    if (slider.querySelectorAll("span"))
      this.handleMax(slider.querySelectorAll("span").length, this.max); //add the stars
    else
      this.handleMax(0, this.max);
 
    // append the text field for the rating bar
    const ratertext = document.createElement("p");
    ratertext.textContent = "";
    slider.appendChild(ratertext);

    // disable the rate buttons if necessary
    this.handleDisabled();
    
    // set up the text content, either number or the chinese characters
    this.handleShowScoreAndText(this.showScore, this.showText);

    //initialize the star value
    this.handleValueModel(this.valueModel);

    //TODO4
  }

  onStarClick(event) {
    // cannot use this as the this in event listener is the target
    var rater = event.target.getRootNode().host;
    if(!rater.disabled) {
      var stars = rater.shadowRoot.querySelectorAll("div i");
      var id = event.target.id;
      var i;
      for(i = 0; i < rater.max; i++) {
        if(i < id) {
          stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
          stars[i].className += " el-icon-star-on";
          stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
        }
        else {
          stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
          stars[i].className += " el-icon-star-off";
          stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
        }
      }
      if (rater.texts[id-1])
        rater.shadowRoot.querySelector("div p").textContent = rater.texts[id-1];
    }
  }

  static get observedAttributes() {
    return ["v-model", "max", "disabled", "show-score", "show-text", "texts", "score-template"]; //TODO1
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
  
    switch (name) {
    case "v-model":
      this.handleValueModel(newValue);
      break;
    case "max":
      this.handleMax(oldValue, newValue);
      break;
    case "disabled":
      this.handleDisabled();
      break;
    case "show-score":
      this.handleShowScoreAndText(this.showScore, this.showText);
      break;
    case "show-text":
      this.handleShowScoreAndText(this.showScore, this.showText);
      break;
    case "texts":
      // no need to handle since "get texts" is updated
      break;
    case "score-template":
      // no need to handle since "get texts" is updated
      break;
    //TODO3
    }
  }

  handleValueModel(newValue) {
    var stars = this.shadowRoot.querySelectorAll("div i");
    var i;
    for(i = 0; i < stars.length; i++) {
      if(i < newValue) {
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
        stars[i].className += " el-icon-star-on";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
      }
      else {
        stars[i].className = stars[i].className.replace(/\bel-icon-star-off\b/g, "");
        stars[i].className += " el-icon-star-off";
        stars[i].className = stars[i].className.replace(/\bel-icon-star-on\b/g, "");
      }
    }
    if (this.texts[newValue-1] && this.shadowRoot.querySelector("div p"))
      this.shadowRoot.querySelector("div p").textContent = this.texts[newValue-1];
  }

  handleMax(oldValue, newValue) {
    const slider = this.shadowRoot.querySelector("div");
    var i;
    if (oldValue < newValue) {
      for (i = oldValue; i < newValue; i++) {
        var newItem = document.createElement("span");
        newItem.className += " el-rate__item";

        var newStar = document.createElement("i");
        newStar.className += " el-rate__icon";
        newStar.className += " el-icon-star-off";
        newStar.id = i+1;
        
        //if(!this.disabled) {
        newStar.addEventListener("click", this.onStarClick);
        //}

        newItem.appendChild(newStar);
        slider.appendChild(newItem);
      }
    }
    else {
      var items = this.shadowRoot.querySelectorAll("div span");
      for (i = oldValue; i > newValue; i--) {
        slider.removeChild(items[i]);  
      }
    }
  }
  
  handleDisabled() {
    var items = this.shadowRoot.querySelectorAll("div span");
    var i;
    if (this.disabled) {
      for(i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
        items[i].className += " disabled";
      }
    }
    else {
      for(i = 0; i < this.max; i++) {
        items[i].className = items[i].className.replace(/\bdisabled\b/g, "");
      }
    }
  }

  handleShowScoreAndText(scoreVal, textVal) {
    if (!this.shadowRoot.querySelector("div p"))
      return;
    if (Boolean(scoreVal) || Boolean(textVal)) {
      this.shadowRoot.querySelector("div p").style.display = "block";
    }
    else {
      this.shadowRoot.querySelector("div p").style.display = "none";
    }
  } 

  set valueModel(value) {
    this.setAttribute("v-model", value);
  }

  get valueModel() {
    return this.getAttribute("v-model") || 0;
  }

  set max(value) {
    this.setAttribute("max", value);
  }

  get max() {
    return this.getAttribute("max") || 5;
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

  set showScore(value) {
    const scoreShown = Boolean(value);
    if (scoreShown)
      this.setAttribute("show-score", "");
    else
      this.removeAttribute("show-score");
  }

  get showScore() {
    return this.hasAttribute("show-score");
  }

  set showText(value) {
    const testShown = Boolean(value);
    if (testShown)
      this.setAttribute("show-text", "");
    else
      this.removeAttribute("show-text");
  }

  get showText() {
    return this.hasAttribute("show-text");
  }
  
  set texts(value) {
    this.setAttribute("texts", value);
  }

  get texts() {
    if (this.showScore) {
      var textArray = [];
      var correctTemplate = this.scoreTemplate.includes("{value}");
      var i;
      for (i = 1; i <= this.max; i++) {
        if (correctTemplate)
          textArray.push(this.scoreTemplate.replace("{value}", i));
        else 
          textArray.push(i);
      }
      return textArray;
    }
    else if (this.getAttribute("texts"))
      return this.getAttribute("texts").split(",");
    else 
      return ["极差", "失望", "一般", "满意", "惊喜"];
  }

  set scoreTemplate(value) {
    this.setAttribute("score-template", value);
  }

  get scoreTemplate() {
    return this.getAttribute("score-template") || "{value}";
  }

  //TODO2
}
  
customElements.define("rater-r", Rater);
