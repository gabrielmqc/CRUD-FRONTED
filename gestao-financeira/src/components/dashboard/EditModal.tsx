import React, { useState } from 'react';
import { Transacao } from '../../types/models';

interface EditModalProps {
  transacao: Transacao;
  onSave: (updatedTransacao: Omit<Transacao, 'id'>) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ transacao, onSave, onClose }) => {
  const [descricao, setDescricao] = useState(transacao.descricao);
  const [valor, setValor] = useState(transacao.valor.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      descricao,
      valor: parseFloat(valor),
      data: transacao.data,
      tipo: transacao.tipo
    });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModal;