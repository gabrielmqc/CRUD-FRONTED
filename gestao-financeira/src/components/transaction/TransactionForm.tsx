import React, { useState } from "react";
import { useFinancial } from "../../context/financialContext";

const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const { addTransaction } = useFinancial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount) {
      addTransaction(description, amount);
      setDescription("");
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor (positivo: crédito, negativo: despesa)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <button type="submit">Adicionar Transação</button>
    </form>
  );
};

export default TransactionForm;
