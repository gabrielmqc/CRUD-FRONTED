import { collection, getFirestore } from 'firebase/firestore';
import { app } from "../firebaseConfig";

export const firestore = getFirestore(app);

export const receitasCollection = collection(firestore, 'receitas');
export const despezasCollection = collection(firestore, 'despezas');