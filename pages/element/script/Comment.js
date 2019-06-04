// eslint-disable-next-line no-undef
var db = firebase.firestore();

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
    #title {
      font-family: "Comic Sans MS", cursive, sans-serif;
      font-size: 40px;
    }
    #box {
      display: block;
      width: 50%;
    }
    #name {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606fe6;
      outline: none;
      fot-size: 14px;
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
      margin-left: 20px;
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
      font-size: 14px;
      padding: 12px 20px;
      outline: none;
    }

    #entry {
      display: block;
      background: #27f9f6;
    }
    #entry-name {
      display: block;
      height: auto; 
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
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
    
  </style>
  <div>
    <span id="title">Reviews:</span>
    <span id="box">
      <!-- Other's comments go here -->
    </span>
    <input id="name" placeholder="Name Here"></input>
    
    <h3 id="tagtext">Tags:</h3>
    <div id="tags">
      <!-- checkboxes/tags will go here -->
    </div>
    <br>
    
    <span id="ratetext">Your Rate:</span>
    <sds-rate id="rating" show-score score-template="{value} Points"></sds-rate>
    <textarea id="comment" placeholder="Your Thoughtful Comments Here..."></textarea>
    <button id="submit">Submit</button>
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
    this.handleColor();
    this.handleDisabled();
    this.handleHideRating();
    this.handleHideComment();
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
      //commentElement.populateComments();
    });
  }

  populateComments() {
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
        var body = document.createElement("p");
        var checkedtags = document.createElement("p");

        var i;
        var checked = `${change.doc.data().checked}`;
        checkedtags.innerHTML = "This Evaluator thinks he is: ";
        for (i = 0; i < checked.length; i++) {
          checkedtags.innerHTML += checked[i];
          checkedtags.innerHTML += "  ";
        }

        //TODO id duplicates; should use class instead
        name.id = "entry-name";
        body.id = "entry-body";
        star.id = "entry-rating";
        name.innerHTML = `${change.doc.data().user} -- Posted on: `;
        name.innerHTML += `${change.doc.data().sent.toDate()}` + "<br />";

        star.max = maxOfRate; //TODO
        star.valueModel = `${change.doc.data().star}`;
        star.disabled = true;

        body.innerHTML = `&emsp;&emsp;${change.doc.data().comment}` + "<br />";

        wrapper.appendChild(name);
        wrapper.appendChild(star);
        wrapper.appendChild(checkedtags);
        wrapper.appendChild(body);
        msgbox.appendChild(wrapper);
        title.textContent = "Reviews: " + "(" + counter + ")";


      });
    });
  }

  /**
   * `observedAttributes()` returns an array of attributes whose changes will
   * be handled in `attributeChangedCallback()`
   * @return {string[]} array of attributes whose changes will be handled 
   */
  static get observedAttributes() {
    return [
      "color", "disabled", "hide-rating", "hide-comment",
      "all-disabled", "max-of-rate", "topic-Name"
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
    case "hide-rating":
      this.handleHideRating();
      break;
    case "hide-comment":
      this.handleHideComment();
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
    }
  }

  /**
   * `handleColor()` is called when the `color` attribute is changed and will 
   *  update the color of the response backgrounds
   */
  handleColor() {
    var value = this.color;
    var matches = this.shadowRoot.querySelectorAll("span#entry");
    matches.forEach(function (entry) {
      entry.style.background = value;
    });
  }

  /**
   * `handleDisabled()` is called when the `disabled` attribute is changed
   * and will disable the comment element accordingly
   */
  handleDisabled() {
    var username = this.shadowRoot.querySelector("input#name");
    var ratetext = this.shadowRoot.querySelector("span#ratetext");
    var rating = this.shadowRoot.querySelector("sds-rate#rating");
    var comment = this.shadowRoot.querySelector("textarea#comment");
    var submit = this.shadowRoot.querySelector("button#submit");

    if (this.disabled) {
      username.style.display = "none";
      ratetext.style.display = "none";
      rating.style.display = "none";
      comment.style.display = "none";
      submit.style.display = "none";
    }

    else {
      username.style.display = "block";
      ratetext.style.display = "block";
      rating.style.display = "block";
      comment.style.display = "block";
      submit.style.display = "block";
    }
  }

  /**
   * `handleHideRating()` is called when the 'hide-rating' attribute is changed
   * and will hide the rating element in displayed reviews accordingly
   */
  handleHideRating() {
    var matches = this.shadowRoot.querySelectorAll("sds-rate#entry-rating");

    if (this.hideRating) {
      matches.forEach(function (rating) {
        rating.style.display = "none";
      });
    }

    else {
      matches.forEach(function (rating) {
        rating.style.display = "block";
      });
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
  get hideRating() {
    return this.hasAttribute("hide-rating");
  }

  /** @type {boolean} */
  set hideRating(value) {
    const isHiddenRating = Boolean(value);
    if (isHiddenRating)
      this.setAttribute("hide-rating", "");
    else
      this.removeAttribute("hide-rating");
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
}
customElements.define("sds-comment", Comment);
