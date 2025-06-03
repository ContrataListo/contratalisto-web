// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIXXDc7eq1amvKeI6mD-glR72HWyTijm0",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "295286192163",
  appId: "1:295286192163:web:2a91412bfdf152aeabe492"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };