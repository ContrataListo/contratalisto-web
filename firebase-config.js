// firebase-config.js

// Importar desde el SDK de Firebase
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyARM2n0Z_RMw5N2twPQTpXGKcoS66NxGWM",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "583988141271",
  appId: "1:583988141271:web:2a91412bffd1f52aebe492"
};

// Inicializar Firebase solo si no está ya inicializado
export const app = initializeApp(firebaseConfig);