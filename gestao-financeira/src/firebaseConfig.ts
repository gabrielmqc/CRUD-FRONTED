// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from './firebaseConfig.json'; // Importa o arquivo JSON

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
