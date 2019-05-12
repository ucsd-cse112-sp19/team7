const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      cursor: default;
    }
    img {
      height: 300px;
    }
    div img {
      height: 20px;
    }
  </style>
  <span>
    <img>
    <p id="author"></p>
    <p id="des"></p>
    <div>
    
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
    if (slider.querySelectorAll("img"))
      this.handleMax(slider.querySelectorAll("img").length, this.max); //add the stars
    else
      this.handleMax(0, this.max);
 
    // append the text field for the rating bar
    const ratertext = document.createElement("p");
    ratertext.textContent = "";
    slider.appendChild(ratertext);

    // add click events to the rating stars
    this.handleDisabled(false);
    
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
      var stars = rater.shadowRoot.querySelectorAll("div img");
      var id = event.target.id;
      var i;
      for(i = 0; i < rater.max; i++) {
        if(i < id)
          stars[i].src="starclicked.png";
        else
          stars[i].src="star.png";
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
      this.handleDisabled(newValue);
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
    var stars = this.shadowRoot.querySelectorAll("div img");
    var i;
    for(i = 0; i < stars.length; i++) {
      if(i < newValue)
        stars[i].src = "starclicked.png";
      else
        stars[i].src = "star.png";
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
        var newStar = document.createElement("img");
        newStar.src = "star.png";
        newStar.id = i+1;
        
        if(!this.disabled) {
          newStar.addEventListener("click", this.onStarClick);
        }

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
  
  handleDisabled(newValue) {
    var stars = this.shadowRoot.querySelectorAll("div img");
    var i;
    if (newValue) {
      for(i = 0; i < this.max; i++) {
        stars[i].removeEventListener("click", this.onStarClick);
      }
    }
    else {
      for(i = 0; i < this.max; i++) {
        stars[i].addEventListener("click", this.onStarClick);
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
