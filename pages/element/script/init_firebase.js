
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
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
export const storageService = firebase.storage();
export const storageRef = storageService.ref();
// eslint-disable-next-line no-undef
export var db = firebase.firestore();
// eslint-disable-next-line no-undef
export const databaseService = firebase.database();