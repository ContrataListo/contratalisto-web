// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARM2n0Z_RMw5N2twPQTpXGKcoS66NxGWM",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com", // ← CORREGIDO
  messagingSenderId: "583988141271",
  appId: "1:583988141271:web:2a91412bffd1f52aebe492"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios
export const auth = getAuth(app);
export const db = getFirestore(app);