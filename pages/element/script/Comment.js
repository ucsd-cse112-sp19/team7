//import {storageRef} from "./init_firebase.js";

// eslint-disable-next-line no-undef
var db = firebase.firestore();

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    p {
      font-size: 30px;
    }
    #title {
      //font-family: "Comic Sans MS", cursive, sans-serif;
      font-size: 30px;
    }
    #box {
      display: block;
      min-width: 50%;
      margin-top: 10px;
    }
    #box p {
      font-size: 15px;
    }
    #name {
      display: block;
      padding-left: 4px;
      margin-left: 20px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606fe6;
      outline: none;
      font-size: 20px;
    }
    #ratetext {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
      cursor: default;
    }
    #rating {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
    }
    #comment {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
      height: 100px;
      width: 45%;
      font-size: 14px;
      box-sizing: border-box;
      color: #606266;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
    #submit {
      display: block;
      margin-top: 20px;
      margin-left: 320px;
      margin-bottom: 20px;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      color: #fff;
      background: #fff;
      background-color: #409eff;
      border: 1px solid #dcdfe6;
      border-color: #409eff;
      border-radius: 4px;
      text-align: center;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 20px;
      padding: 12px 20px;
      outline: none;
    }

    #entry {
      display: block;
      background: #27f9f6;
      padding: 5px 20px;
      border-radius: 5px;
      box-shadow: 5px 8px;
      margin-bottom: 10px;
    }
    #entry-name {
      display: block;
      height: auto; 
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      font-weight: bold;
    }
    #entry-body {
      display: block;
      height: auto; 
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
    }
    #tagtext {
      margin-left: 20px;
      font-size: 20px;
    }
    #tags {
      style="font-size:30px;
      margin-left: 20px;
    }
    #tagcontainer {
      margin-left: 20px;
      margin-top: 20px;
    }
    #entry-tags {
      margin-top: 10px;
    }
    .badge {
      margin-right: 10px;
      background-color: rgb(247, 186, 42);
      color: white;
      padding: 4px 8px;
      font-size: 15px;
      border-radius: .25rem;
    }
    
  </style>
  <div>
    <span id="title">Reviews:</span>
    <span id="box">
      <!-- Other's comments go here -->
    </span>
    <div id="formcontainer">
      <p>Write your own review:</p>
      <input id="name" placeholder="Name Here"></input>
   
      <div id="tagcontainer">
        <div id="tags">
          <!-- checkboxes/tags will go here -->
        </div>
      </div>
    
      <div id="ratecontainer">
        <sds-rate id="rating" show-score score-template="{value} Points"></sds-rate>
      </div>
      <textarea id="comment" placeholder="Your Thoughtful Comments Here..."></textarea>
      <button id="submit">Submit</button>
    </div>
  </div>
`;

export class Comment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Set up attributes
    //this.handleColor();
    this.handleDisabled();
    this.handleShowRating();
    this.handleHideComment();
    this.handleShowTags();

    if (this.initWith != "none") {
      this.updateComment(this.initWith, 5);
    }
  }

  updateComment(topicName, maxOfRate, tagarray = []) {
    if (!topicName) {
      window.alert("error");
      return;
    }
    this.topicName = topicName;
    this.maxOfRate = maxOfRate;

    const shadow = this.shadowRoot;

    // Gather all html elements from the shadow root for later use
    //var title = shadow.querySelector("span#title");
    //var msgbox = shadow.querySelector("span#box");
    var username = shadow.querySelector("input#name");
    //var ratetext = shadow.querySelector("span#ratetext");
    var tags = shadow.querySelector("div#tags");
    var rating = shadow.querySelector("sds-rate#rating");
    var comment = shadow.querySelector("textarea#comment");
    var submit = shadow.querySelector("button#submit");
    //var entry = this.getAttribute("entry");

    // Set up the input fields for the comment
    while (tags.firstChild) { //clear all tags
      tags.removeChild(tags.firstChild);
    }

    var i;
    for (i = 0; i < tagarray.length; i++) {
      var box = document.createElement("sds-checkbox");
      box.border = true;
      box.innerHTML = tagarray[i];
      tags.appendChild(box);
    }
    rating.max = maxOfRate;
    
    // Display other's comments
    this.populateComments();

    var commentElement = this;
    // Upon pushing submit, add comment data to firebase
    submit.addEventListener("click", function () {
      if (username.value.length == 0) {
        username.value = "Anonymous";
      }
      var i;
      var checkedList = [];
      for (i = 0; i < tags.childNodes.length; i++) {
        if (tags.childNodes[i].checked == true) {
          checkedList.push(tags.childNodes[i].innerHTML);
        }
      }
      db.collection(`${commentElement.topicName}`).add({
        user: `${username.value}`,
        comment: `${comment.value}`,
        star: `${rating.valueModel}`,
        checked: checkedList,
        // eslint-disable-next-line no-undef
        sent: firebase.firestore.Timestamp.fromDate(new Date())
      });
      /*
      username.value = "";
      rating.valueModel = 0;
      rating.ratertext = "";
      comment.value = "";*/

      window.alert("Evaluation Submitted!");
      window.location.reload(true);
      //commentElement.populateComments();
    });
  }

  populateComments() {
    var commenter = this;
    var msgbox = this.shadowRoot.querySelector("span#box");
    var title = this.shadowRoot.querySelector("span#title");
    if (msgbox.querySelector("span"))
      msgbox.removeChild(msgbox.querySelector("span"));
    
    var maxOfRate = this.maxOfRate;
    
    var counter = 0;
    db.collection(`${this.topicName}`).orderBy("sent").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.doc.data().user == null) {
          return;
        }

        // Parse the database, adding reviews to the msgbox span element
        counter += 1;

        var wrapper = document.createElement("span");
        wrapper.id = "entry";
        var name = document.createElement("p");
        var star = document.createElement("sds-rate");
        star.showScore = true;
        //star.style.display = "none";
        var body = document.createElement("p");
        var checkedtags = document.createElement("div");
        //checkedtags.style.display = "none";

        var i;
        var checked = `${change.doc.data().checked}`;
        var tagList = checked.split(",");
        if (tagList.length > 1 || tagList[0] != "") {
          for (i = 0; i < tagList.length; i++) {
            var tag = document.createElement("span");
            tag.className = "badge";
            tag.innerHTML = tagList[i];
            checkedtags.appendChild(tag);
            //checkedtags.innerHTML += "  ";
          }
        }

        //TODO id duplicates; should use class instead
        name.id = "entry-name";
        body.id = "entry-body";
        star.id = "entry-rating";
        checkedtags.id = "entry-tags";
        name.innerHTML = `${change.doc.data().user} -- Posted on: `;
        name.innerHTML += `${change.doc.data().sent.toDate()}` + "<br />";

        star.max = maxOfRate; //TODO
        star.valueModel = `${change.doc.data().star}`;
        star.disabled = true;

        body.innerHTML = `${change.doc.data().comment}` + "<br />";

        wrapper.appendChild(name);
        if (!commenter.showRating)
          star.style.display = "none";
        wrapper.appendChild(star);
        if (!commenter.showTags)
          checkedtags.style.display = "none";
        wrapper.appendChild(checkedtags);
        wrapper.appendChild(body);
        msgbox.appendChild(wrapper);
        title.textContent = "Reviews: " + "(" + counter + ")";


      });
    });
    this.handleShowRating();
    this.handleShowTags();
    console.log("hi");
  }

  /**
   * `handleColor()` is called when the `color` attribute is changed and will 
   *  update the color of the response backgrounds
   */
  handleColor() {
    var value = this.color;
    var styleSheet = this.shadowRoot.querySelector("style").sheet;
    var i;
    console.log(styleSheet);
    for (i = 0; i < styleSheet.cssRules.length; i++) {
      var rule = styleSheet.cssRules[i];
      if (rule.selectorText === "#entry")
        rule.style.background = value;
    }
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute is changed
   * and will disable the comment element accordingly
   */
  handleDisabled() {
    var form = this.shadowRoot.querySelector("div#formcontainer");

    if (this.disabled) {
      form.style.display = "none";
    }

    else {
      form.style.display = "block";
    }
  }

  /**
   * `handleShowRating()` is called when the 'show-rating' attribute is changed
   * and will hide the rating element in displayed reviews accordingly
   */
  handleShowRating() {
    var matches = this.shadowRoot.querySelectorAll("sds-rate#entry-rating");
    var ratecontainer = this.shadowRoot.querySelector("div#ratecontainer");

    if (this.showRating) {
      matches.forEach(function (rating) {
        rating.style.display = "block";
      });
      ratecontainer.style.display = "block";
    }

    else {
      matches.forEach(function (rating) {
        rating.style.display = "none";
      });
      ratecontainer.style.display = "none";
    }
  }

  /**
   * `handleHideComment()` is called when the 'hide-comment' attribute is changed
   * and will hide the rating element in displayed reviews accordingly
   */
  handleHideComment() {
    var matches = this.shadowRoot.querySelectorAll("p#entry-body");

    if (this.hideComment) {
      matches.forEach(function (comment) {
        comment.style.display = "none";
      });
    }

    else {
      matches.forEach(function (comment) {
        comment.style.display = "block";
      });
    }
  }

  /**
   * `handleShowTags()` is called when the 'show-tags' attribute is changed
   * and will hide the rating element in displayed reviews accordingly
   */
  handleShowTags() {
    var matches = this.shadowRoot.querySelectorAll("p#entry-tags");
    var tagcontainer = this.shadowRoot.querySelector("div#tagcontainer");
    if (this.showTags) {
      matches.forEach(function (tags) {
        tags.style.display = "block";
      });
      tagcontainer.style.display = "block";
    }

    else {
      matches.forEach(function (tags) {
        tags.style.display = "none";
      });
      tagcontainer.style.display = "none";
    }
  }

  /**
   * `insertOutsideClass()` is called to insert css rules of the class names in
   * `class` attribute into the shadowDOM's stylesheet
   */
  insertOutsideClass() {
    var rootStyleSheet = this.getRootNode().styleSheets;
    var classArray = this.className.match(/\S+/g);
    if (!classArray || classArray.length == 0)
      return;

    var k;
    var tagArray = []; // the index corresponds to the index of classArray
    for (k = 0; k < classArray.length; k++) {
      //console.log(everything[k]);
      var class_tag = classArray[k].split("@");
      if (class_tag.length == 1) {
        classArray.splice(k, 1);
        k--;
      }
      else {
        classArray[k] = class_tag[0];
        tagArray.push(class_tag[1]);
      }
    }

    var shadowStyleSheet = this.shadowRoot.querySelector("style").sheet;
    var i, j;
    for (i = 0; i < rootStyleSheet.length; i++) {
      try {
        var rules = rootStyleSheet[i].cssRules;
        
        for (j = 0; j < rules.length; j++) {
          for (k = 0; k < classArray.length; k++) {
            if (rules[j].selectorText 
                && rules[j].selectorText.includes("." + classArray[k])
                && (!rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1]
                    || (rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1] != "-"
                        && !rules[j].selectorText[rules[j].selectorText.indexOf(classArray[k]) + classArray[k].length + 1].match(/[a-z]/i)
                    )
                ) 
            ){
              //console.log(rules[j].selectorText);
              shadowStyleSheet.insertRule(rules[j].cssText, shadowStyleSheet.cssRules.length);
            }
          }
        }
      }
      catch (e) {
        //console.log(e);
        break;
      }
    }
 
    //var everything = this.shadowRoot.querySelectorAll("*:not(style)");
    for (k = 0; k < classArray.length; k++) {
      //console.log(everything[k]);
      var items = this.shadowRoot.querySelectorAll(tagArray[k]);
      for (i = 0; i < items.length; i++) {
        if (items[i].tagName == "STYLE")
          continue;
        items[i].className += " " + classArray[k];
      }
    }
  }





  /**
   * `observedAttributes()` returns an array of attributes whose changes will
   * be handled in `attributeChangedCallback()`
   * @return {string[]} array of attributes whose changes will be handled 
   */
  static get observedAttributes() {
    return [
      "color", "disabled", "show-rating", "hide-comment",
      "show-tags", "all-disabled", "max-of-rate", "topic-Name", 
      "class", "init-with"
    ];
  }

  /**
   * `attributeChangedCallback()` is called when any of the attributes in the
   * returned array of `observedAttributes()` are changed. It's a good place to 
   * handle side effects
   * @param {string} name - the name of the changed attribute
   * @param {string} oldValue - the old value of the attribute
   * @param {string} newValue - the new value of the attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // this is called also when loading the page initially, based on the initial attributes
    switch (name) {
    case "color":
      this.handleColor();
      break;
    case "disabled":
      this.handleDisabled();
      break;
    case "show-rating":
      this.handleShowRating();
      break;
    case "hide-comment":
      this.handleHideComment();
      break;
    case "show-tags":
      this.handleShowTags();
      break;
    case "all-disabled":
      if (this.allDisabled) {
        this.style.display = "none";
      }
      else {
        this.style.display = "block";
        //this.updateComment();
      }
      break;
    case "no going to be called but just to avoid linting check":
      window.alert(oldValue + newValue);
      break;
    case "class":
      this.insertOutsideClass();
      break;
    case "init-with":
      // nothing
      break;
    }
  }

  /** @type {string} */
  get color() {
    return this.getAttribute("color") || "#27f9f6";
  }

  /** @type {string} */
  set color(value) {
    // Default value subject to change
    this.setAttribute("color", value);
  }

  /** @type {boolean} */
  get disabled() {
    return this.hasAttribute("disabled");
  }

  /** @type {boolean} */
  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled)
      this.setAttribute("disabled", "");
    else
      this.removeAttribute("disabled");
  }

  /** @type {boolean} */
  get showRating() {
    return this.hasAttribute("show-rating");
  }

  /** @type {boolean} */
  set showRating(value) {
    const isShownRating = Boolean(value);
    if (isShownRating)
      this.setAttribute("show-rating", "");
    else
      this.removeAttribute("show-rating");
  }

  /** @type {boolean} */
  get hideComment() {
    return this.hasAttribute("hide-comment");
  }

  /** @type {boolean} */
  set hideComment(value) {
    const isHiddenComment = Boolean(value);
    if (isHiddenComment)
      this.setAttribute("hide-comment", "");
    else
      this.removeAttribute("hide-comment");
  }

  /** @type {boolean} */
  get showTags() {
    return this.hasAttribute("show-tags");
  }

  /** @type {boolean} */
  set showTags(value) {
    const isShownTags = Boolean(value);
    if (isShownTags)
      this.setAttribute("show-tags", "");
    else
      this.removeAttribute("show-tags");
  }

  /** @type {boolean} */
  get allDisabled() {
    return this.hasAttribute("all-disabled");
  }

  /** @type {boolean} */
  set allDisabled(value) {
    const isHiddenComment = Boolean(value);
    if (isHiddenComment)
      this.setAttribute("all-disabled", "");
    else
      this.removeAttribute("all-disabled");
  }


  /** @type {number} */
  get maxOfRate() {
    return this.getAttribute("max-of-rate") || 5;
  }

  /** @type {number} */
  set maxOfRate(value) {
    this.setAttribute("max-of-rate", value);
  }

  /** @type {string} */
  get topicName() {
    return this.getAttribute("topic-name");
  }

  /** @type {string} */
  set topicName(value) {
    this.setAttribute("topic-name", value);
  }

  /** @type {string} */
  get initWith() {
    return this.getAttribute("init-with") || "none";
  }

  /** @type {string} */
  set initWith(value) {
    this.setAttribute("init-with", value);
  }
}
customElements.define("sds-comment", Comment);
