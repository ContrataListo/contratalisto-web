// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIXXDc7eq1amvKeI6mD-glR72HWyTijm0",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "295286192163",
  appId: "1:295286192163:web:2f2b5ba9e7d7ec0e5d92f7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };