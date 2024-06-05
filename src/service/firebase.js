import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbzACGyIrmzlslFH46lg6qc1TvjlnRq9U",
  authDomain: "appa-20667.firebaseapp.com",
  projectId: "appa-20667",
  storageBucket: "appa-20667.appspot.com",
  messagingSenderId: "460008266069",
  appId: "1:460008266069:web:9ce5df7dc274ee603377dc",
  measurementId: "G-MCWXFYNXCJ"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

