// src/services/financeService.ts
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Transaction } from "../types/models";

// Referência à coleção no Firestore
const transactionsCollectionRef = collection(db, "transactions");

export const createTransaction = async (transaction: Transaction) => {
  const docRef = await addDoc(transactionsCollectionRef, transaction);
  return docRef.id;
};

export const getTransactions = async () => {
  const snapshot = await getDocs(transactionsCollectionRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Transaction));
};

export const updateTransaction = async (id: string, updatedTransaction: Partial<Transaction>) => {
  const transactionDocRef = doc(db, "transactions", id);
  await updateDoc(transactionDocRef, updatedTransaction);
};

export const deleteTransaction = async (id: string) => {
  const transactionDocRef = doc(db, "transactions", id);
  await deleteDoc(transactionDocRef);
};
