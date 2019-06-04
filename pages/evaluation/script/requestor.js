// eslint-disable-next-line no-undef
var db = firebase.firestore();
var tags = [];
/* This is the star bug
var stars = document.getElementById("stars").value;
if(stars == null) {
  stars = 5;
  console.log("start not specified")
}*/

document.getElementById("add").addEventListener("click", function() {
  tags.push(document.getElementById("tag").value);
  document.getElementById("tagarray").innerHTML += document.getElementById("tag").value;
  document.getElementById("tag").value = "";
});

document.getElementById("submit").addEventListener("click", function() {

  document.getElementById("submitted").innerHTML="Request Submitted!";
  var stars = document.getElementById("stars").value;
  if(stars == null) {
    stars = 5;
    //console.log("start not specified")
  }
  db.collection(`${document.getElementById("title").value}`).doc("config").set({
    stars: `${stars}`,
    tags:`${tags}`,
    des:`${document.getElementById("des").value}`,
    // eslint-disable-next-line no-undef
    sent: firebase.firestore.Timestamp.fromDate(new Date())
  });
});

document.querySelector("sds-checkbox").addEventListener("click", function() {
});