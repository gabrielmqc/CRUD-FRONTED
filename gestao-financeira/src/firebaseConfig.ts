// src/firebase.ts
import { initializeApp } from "firebase/app";
import {  getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


import firebaseConfig from './firebaseConfig.json'; // Importa o arquivo JSON

export const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'en';

export default {
    googleLogar: async() => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user; // Return the user object
    }
}

