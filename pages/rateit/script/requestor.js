import { databaseService } from "../../element/script/init_firebase.js";
import { db } from "../../element/script/init_firebase.js";

var tags = [];
var norate_ckb = document.getElementById("ckb-norate");
var notag_ckb = document.getElementById("ckb-notag");

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

window.onload = function() { // wait for the shadow root to be ready so that listener can be added
  norate_ckb.shadowRoot.querySelector("input").addEventListener("click", function () {
    if (norate_ckb.checked) {
      document.getElementById("stars").setAttribute("disabled", "");
    }
    else {
      document.getElementById("stars").removeAttribute("disabled");
    }
  });

  notag_ckb.shadowRoot.querySelector("input").addEventListener("click", function () {
    var tagdiv;
    var i;
    if (notag_ckb.checked) {
      tagdiv = document.getElementById("tags-div").children;
      for (i = 0; i < tagdiv.length; i++) {
        tagdiv[i].setAttribute("disabled", "");
      }
      var tagarray = document.getElementById("tagarray");
      while (tagarray.firstChild) { //clear all tags
        tagarray.removeChild(tagarray.firstChild);
      }
    }
    else {
      tagdiv = document.getElementById("tags-div").children;
      for (i = 0; i < tagdiv.length; i++) {
        tagdiv[i].removeAttribute("disabled");
      }
    }
  });
  
};

document.getElementById("submit").addEventListener("click", function () {

  var stars = document.getElementById("stars").value;
  if (stars == null) {
    stars = 5;
    //console.log("start not specified")
  }

  var isPrivate = document.getElementById("ckb-isprivate").checked ? "1" : "0";
  var disableRate = norate_ckb.checked ? "1" : "0";
  var disableTag = notag_ckb.checked ? "1" : "0";
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
    disableRate: `${disableRate}`,
    disableTag: `${disableTag}`,
    image: `${img}`
  }).then(result => { 
    // submission succeeded
    document.getElementById("submitted").innerHTML = "Request Submitted!";
    window.location.href = "evaluator.html?lookup=" + titleText.replace(" ", "\\_") + "%" + id;
    window.alert("Share the link of the evaluation form to let others rate it!");
    // eslint-disable-next-line no-console
    console.log("This is to avoid linting check for unused var=>result: " + result);
  }).catch(err => {
    // eslint-disable-next-line no-console
    console.log("Error: " + err);
  });


});
