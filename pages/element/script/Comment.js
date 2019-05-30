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
`;

export class Commenter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const shadow = this.shadowRoot;

    var title = document.createElement("span");
    title.id = "title";
    title.textContent="Reviews: ";

    var msgbox = document.createElement("span");
    msgbox.id = "box";

    var username = document.createElement("input");
    username.id="name";
    username.placeholder="Name Here";

    var ratetext = document.createElement("span");
    ratetext.id="ratetext";
    ratetext.textContent="Your Rate: ";
    var rating = document.createElement("sds-rate");
    rating.id="rating";

    var comment = document.createElement("textarea");
    comment.id="comment";
    comment.placeholder="Your Thoughtful Comments Here...";

    var submit = document.createElement("button");
    submit.id="submit";
    submit.textContent="Submit";

    var entry = this.getAttribute("entry");

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
        title.innerHTML = "Reviews: "+ "(" + counter + ")";
      });
    });

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

    shadow.appendChild(title);
    shadow.appendChild(msgbox);
    shadow.appendChild(username);
    shadow.appendChild(ratetext);
    shadow.appendChild(rating);
    shadow.appendChild(comment);
    shadow.appendChild(submit);
  }
}
customElements.define("sds-commenter", Commenter);