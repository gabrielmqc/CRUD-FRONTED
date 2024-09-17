import React, { useState } from "react";
import { useApp } from "../../context/appContext";
import EditModal from "./EditModal";
import { Transacao } from "../../types/models";
import "../styles/transactions.css";

const Receitas: React.FC = () => {
  const { receitas, adicionarReceita, editReceita, deleteReceita } = useApp();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReceita, setEditingReceita] = useState<Transacao | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adicionarReceita({
      descricao,
      valor: parseFloat(valor),
      data: new Date(),
      tipo: "receita",
    });
    setDescricao("");
    setValor("");
  };

  const handleEdit = (receita: Transacao) => {
    setEditingReceita(receita);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Certeza que deseja excluir esta receita?")) {
      deleteReceita(id);
    }
  };

  return (
    <div>
      <h2>Adicionar Receita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor"
          required
        />
        <button type="submit">Adicionar</button>
      </form>
      <p></p>
      <h2>Receitas</h2>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id} className="transaction-item">
            <div className="transaction-info">
              {receita.descricao} - R$ {receita.valor.toFixed(2)}
            </div>
            <div className="transaction-actions">
              <button
                className="action-button edit-button"
                onClick={() => handleEdit(receita)}
              >
                Editar
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(receita.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditModalOpen && editingReceita && (
        <EditModal
          transacao={editingReceita}
          onSave={(updatedReceita) => {
            editReceita(editingReceita.id, {
              ...updatedReceita,
              tipo: "receita",
            });
            setIsEditModalOpen(false);
          }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Receitas;