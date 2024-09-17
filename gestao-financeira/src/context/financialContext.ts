import React, { createContext, useContext, useState, ReactNode, FC } from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number; // Positive for credits, negative for expenses
}

interface FinancialContextData {
  transactions: Transaction[];
  addTransaction: (description: string, amount: number) => void;
  deleteTransaction: (id: number) => void;
}

const FinancialContext = createContext<FinancialContextData | undefined>(undefined);

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error("useFinancial must be used within a FinancialProvider");
  }
  return context;
};

interface FinancialProviderProps {
  children: ReactNode; // Define `children` como qualquer nó React
}

// Aqui removemos o uso do React.FC e definimos manualmente o tipo de retorno da função
export const FinancialProvider: React.FC<FinancialProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (description: string, amount: number) => {
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount,
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  };

  return (
    <FinancialContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </FinancialContext.Provider>
  );
};