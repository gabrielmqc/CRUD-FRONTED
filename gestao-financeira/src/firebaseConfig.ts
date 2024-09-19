// src/firebase.ts
import { initializeApp } from "firebase/app";

import firebaseConfig from './firebaseConfig.json'; // Importa o arquivo JSON

export const app = initializeApp(firebaseConfig);



