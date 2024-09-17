import React from "react";
import { useFinancial } from "../../context/financialContext";

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useFinancial();

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          {transaction.description} - {transaction.amount}{" "}
          <button onClick={() => deleteTransaction(transaction.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
