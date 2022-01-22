import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA77aL9DEvXBeVzYqw8bJkS7uAYXZbpSKQ",
  authDomain: "linkedin-clone-d8f96.firebaseapp.com",
  projectId: "linkedin-clone-d8f96",
  storageBucket: "linkedin-clone-d8f96.appspot.com",
  messagingSenderId: "65658071235",
  appId: "1:65658071235:web:411252835c76436c825a76",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider()

export { auth, provider, storage };
export default db;
