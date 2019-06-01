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
    }
    #ratetext {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
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
      width: 40%;
    }
    #submit {
      display: block;
      margin-top: 20px;
      margin-left: 20px;
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

  </style>
  <span id="title">Reviews:</span>
  <span id="box"></span>
  <input id="name" placeholder="Name Here"></input>
  <span id="ratetext">Your Rate:</span>
  <sds-rate id="rating"></sds-rate>
  <textarea id="comment" placeholder="Your Thoughtful Comments Here..."></textarea>
  <button id="submit">Submit</button>

`;

export class Commenter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const shadow = this.shadowRoot;

    // Gather all html elements from the shadow root for later use
    var title = shadow.querySelector("span#title");
    var msgbox = shadow.querySelector("span#box");
    var username = shadow.querySelector("input#name");
    var ratetext = shadow.querySelector("span#ratetext");
    var rating = shadow.querySelector("sds-rate#rating");
    var comment = shadow.querySelector("textarea#comment");
    var submit = shadow.querySelector("button#submit");
    var entry = this.getAttribute("entry");

    // Parse the database, adding reviews to the msgbox span element
    var counter = 0;
    db.collection(`${entry}`).orderBy("sent").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        counter += 1;
        var wrapper = document.createElement("span");
        wrapper.id="entry";
        var name = document.createElement("p");
        var star = document.createElement("sds-rate");
        var body = document.createElement("p");
        name.id="entry-name";
        body.id="entry-body";
        name.innerHTML = `${change.doc.data().user} -- Posted on: `;
        name.innerHTML += `${change.doc.data().sent.toDate()}` + "<br />";
        star.valueModel = `${change.doc.data().star}`;
        star.disabled = 1;
        body.innerHTML = `&emsp;&emsp;${change.doc.data().comment}` + "<br />";

        wrapper.appendChild(name);
        wrapper.appendChild(star);
        wrapper.appendChild(body);
        msgbox.appendChild(wrapper);
        //title.innerHTML = "Reviews: "+ "(" + counter + ")";
        title.textContent = "Reviews: "+ "(" + counter + ")";
      });
    });

    // Upon pushing submit, add comment data to firebase
    submit.addEventListener("click", function() {
      db.collection(`${entry}`).add({
        user: `${username.value}`,
        comment: `${comment.value}`,
        star: `${rating.valueModel}`,
        // eslint-disable-next-line no-undef
        sent: firebase.firestore.Timestamp.fromDate(new Date())
      });
      username.value = "";
      rating.valueModel = 0;
      rating.ratertext = "";
      comment.value = "";
    });

  }
}
customElements.define("sds-commenter", Commenter);
