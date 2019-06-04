import { databaseService } from "../../element/script/init_firebase.js";
//import { isPropertyAccessExpression } from "typescript";

// eslint-disable-next-line no-undef
var db = firebase.firestore();
var tags = [];
/* This is the star bug
var stars = document.getElementById("stars").value;
if(stars == null) {
  stars = 5;
  console.log("start not specified")
}*/

document.getElementById("add").addEventListener("click", function () {
  tags.push(document.getElementById("tag").value);
  document.getElementById("tagarray").innerHTML += document.getElementById("tag").value;
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
  db.collection(`${titleText}`).doc("config").set({
    stars: `${stars}`,
    tags: `${tags}`,
    des: `${document.getElementById("des").value}`,
    // eslint-disable-next-line no-undef
    sent: firebase.firestore.Timestamp.fromDate(new Date()),
    id: `${id}`,
    isPrivate: `${isPrivate}`,
    disableRateTag: `${disableRateTag}`
  }).then(result => {
    // submission succeeded
    document.getElementById("submitted").innerHTML = "Request Submitted!";
    window.location.href = "evaluator.html?lookup=" + titleText.replace(" ", "\\_") + "%" + id;
  }).catch(err => {
    console.log("Error: " + err);
  });


});
