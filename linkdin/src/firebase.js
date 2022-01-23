import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyCOtJby2Y2YxCE81LBhAFSoz9g2dhQc118",
  authDomain: "linkedin-1d560.firebaseapp.com",
  projectId: "linkedin-1d560",
  storageBucket: "linkedin-1d560.appspot.com",
  messagingSenderId: "858653595789",
  appId: "1:858653595789:web:be1835cbf2e35b48dfeac4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider()

export { auth, provider, storage };
export default db;
