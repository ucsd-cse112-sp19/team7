// eslint-disable-next-line no-undef
var db = firebase.firestore();
var wrapper = document.getElementById("wrapper");
var title = document.getElementById("title");
var thing = document.getElementById("thing");
var des = document.getElementById("des");

var overalltags = document.getElementById("overall-tags");
var overallrate = document.getElementById("overall-rate");
/*var username = document.getElementById("username");
var evals = document.getElementById("eval");
var tags = document.getElementById("tags");
var rate = document.getElementById("rate");
var submitcomment = document.getElementById("submitcomment");
var msgbox = document.getElementById("comment");

var rater;
*/

// parse url funct
function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
  return "Parameter Not Found";
}

var comment = document.querySelector("sds-comment");

// display function
function displayComment(value){
  //display the comment
  db.collection(`${value}`).doc("config").get().then(function (doc) {
    if (doc.exists) { // TODO why the if statement doesn't apply to the bellow
      thing.innerHTML = value;
      des.innerHTML = doc.data().des;

      var tagarray = `${doc.data().tags}`.split(",");

      //comment.setAttribute("max-of-rate", rater.max);
      //comment.setAttribute("topic-name", thing.textContent);
      comment.allDisabled = false; // this will initialize the comment
      comment.updateComment(thing.textContent, `${doc.data().stars}`, tagarray);
      comment.showRating = true;
      comment.showTags = true;
      
      // set up overall rating score, and the overall checked tags
      overallrate.max = `${doc.data().stars}`;
      overallrate.valueModel = "4"; //TODO oscar
      var i;
      for (i = 0; i < tagarray.length; i++) {
        /* adding this:
          <button type="button" class="btn btn-primary">Primary <span class="badge">7</span></button>
        */
        var tag = document.createElement("button");
        tag.type = "button";
        tag.className = "btn btn-primary";
        tag.innerHTML = tagarray[i] + " ";

        var tagScore = document.createElement("span");
        tagScore.className = "badge badge-light";
        tagScore.innerHTML = "7"; //TODO oscar

        tag.appendChild(tagScore);
        overalltags.appendChild(tag);
      }

      wrapper.style = "display: block";
      window.location.href = "#wrapper";
    }
    else {
      window.alert("No search hit!");
      //wrapper.style = "display: none";
      //window.location.href = "#title";
    }
  });
}

// check if get from url
var lookup_value = getURLParameter("lookup");
if ( lookup_value != "Parameter Not Found"){
  displayComment(lookup_value)
}


// onclick for submit button
document.getElementById("submit").addEventListener("click", function () {
  //display the comment
  displayComment(title.value);

});
