import { databaseService } from "../../element/script/init_firebase.js";
import { db } from "../../element/script/init_firebase.js";
//import { isPropertyAccessExpression } from "typescript";

// eslint-disable-next-line no-undef
//var db = firebase.firestore();
var tags = [];
/* This is the star bug
var stars = document.getElementById("stars").value;
if(stars == null) {
  stars = 5;
  console.log("start not specified")
}*/

document.getElementById("add").addEventListener("click", function () {
  var tagValue = document.getElementById("tag").value;
  if (tagValue.trim().length == 0)
    return;
  tags.push(tagValue);

  // create the badge for tag
  var tag = document.createElement("button");
  tag.type = "button";
  tag.className = "btn btn-primary";
  tag.innerHTML = tagValue;
  tag.disabled = "disabled";

  document.getElementById("tagarray").appendChild(tag);
  document.getElementById("tag").value = "";
});

document.getElementById("submit").addEventListener("click", function () {

  var stars = document.getElementById("stars").value;
  if (stars == null) {
    stars = 5;
    //console.log("start not specified")
  }

  var isPrivate = document.getElementById("ckb-isprivate").checked ? "1" : "0";
  var disableRateTag = document.getElementById("ckb").checked ? "1" : "0";
  var titleText = document.getElementById("title").value;
  var id = databaseService.ref(`${titleText}`).push().key;
  var img = document.getElementById("upload").shadowRoot.querySelector("a.el-upload-list__item-name").innerHTML;
  img = img.split("-->")[1].trim();

  db.collection(`${titleText}`).doc("config").set({
    stars: `${stars}`,
    tags: `${tags}`,
    des: `${document.getElementById("des").value}`,
    // eslint-disable-next-line no-undef
    sent: firebase.firestore.Timestamp.fromDate(new Date()),
    id: `${id}`,
    isPrivate: `${isPrivate}`,
    disableRateTag: `${disableRateTag}`,
    image: `${img}`
  }).then(result => { 
    // submission succeeded
    document.getElementById("submitted").innerHTML = "Request Submitted!";
    window.location.href = "evaluator.html?lookup=" + titleText.replace(" ", "\\_") + "%" + id;
    window.alert("Share this link to let others rate it! " + window.location.href);
    // eslint-disable-next-line no-console
    console.log(result);
  }).catch(err => {
    // eslint-disable-next-line no-console
    console.log("Error: " + err);
  });


});
