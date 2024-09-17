import React, { useState } from "react";
import { useApp } from "../../context/appContext";
import EditModal from "./EditModal";
import { Transacao } from "../../types/models";
import "../styles/transactions.css";

const Despesas: React.FC = () => {
  const { despesas, adicionarDespesa, editDespesa, deleteDespesa } = useApp();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDespesa, setEditingDespesa] = useState<Transacao | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adicionarDespesa({
      descricao,
      valor: parseFloat(valor),
      data: new Date(),
      tipo: "despesa",
    });
    setDescricao("");
    setValor("");
  };

  const handleEdit = (despesa: Transacao) => {
    setEditingDespesa(despesa);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Certeza que deseja excluir esta despesa?")) {
      deleteDespesa(id);
    }
  };

  return (
    <div>
      <h2>Adicionar Despesa</h2>
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
      <h2>Despesas</h2>
      <ul>
        {despesas.map((despesa) => (
          <li key={despesa.id} className="transaction-item">
            <div className="transaction-info">
              {despesa.descricao} - R$ {despesa.valor.toFixed(2)}
            </div>
            <div className="transaction-actions">
              <button
                className="action-button edit-button"
                 
                onClick={() => handleEdit(despesa)}
              >
                Editar
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(despesa.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditModalOpen && editingDespesa && (
        <EditModal
          transacao={editingDespesa}
          onSave={(updatedDespesa) => {
            editDespesa(editingDespesa.id, {
              ...updatedDespesa,
              tipo: "despesa",
            });
            setIsEditModalOpen(false);
          }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Despesas;