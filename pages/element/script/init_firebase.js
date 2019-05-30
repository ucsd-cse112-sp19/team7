// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAWQ3Vi-7CTKYVgS1yQ7WHA7S0vShJCgZs",
  authDomain: "team7-element.firebaseapp.com",
  databaseURL: "https://team7-element.firebaseio.com",
  projectId: "team7-element",
  storageBucket: "team7-element.appspot.com",
  messagingSenderId: "860166313157",
  appId: "1:860166313157:web:59ab005177ad2f01"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storageService = firebase.storage();
export const storageRef = storageService.ref();
export var db = firebase.firestore();