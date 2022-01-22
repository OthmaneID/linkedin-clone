import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA77aL9DEvXBeVzYqw8bJkS7uAYXZbpSKQ",
  authDomain: "linkedin-clone-d8f96.firebaseapp.com",
  projectId: "linkedin-clone-d8f96",
  storageBucket: "linkedin-clone-d8f96.appspot.com",
  messagingSenderId: "65658071235",
  appId: "1:65658071235:web:411252835c76436c825a76",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

export { auth, provider, storage };
export default db;
