import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiIUfcMaFHpGBuDSf_RsqtRORx8OGUhxg",
  authDomain: "login-netflix-fb16a.firebaseapp.com",
  projectId: "login-netflix-fb16a",
  storageBucket: "login-netflix-fb16a.firebasestorage.app",
  messagingSenderId: "743353191817",
  appId: "1:743353191817:web:8454d7dd85f66e7061a558",
  measurementId: "G-TM5EEZHPNM",
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Esporta l'istanza di autenticazione
export const auth = getAuth(app);
