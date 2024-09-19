import { useEffect, useState } from "react";
import { receitasCollection } from "../../context/controler";
import { DocumentData, onSnapshot, QuerySnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NovaReceitaType } from "../../types/receitas";
import Information from "../Information";
import './style.css';

function Receitas() {
  const [receitas, setReceitas] = useState<NovaReceitaType[]>([]);
  const [novaReceita, setNovaReceita] = useState({ description: '', valor: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => onSnapshot(receitasCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    setReceitas(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) 
    )
  }), []);

  const adicionarOuAtualizarReceita = async () => {
    if (editingId) {
      const ReceitaRef = doc(receitasCollection, editingId);
      await updateDoc(ReceitaRef, novaReceita);
      setEditingId(null);
    } else {
      await addDoc(receitasCollection, novaReceita);
    }
    setNovaReceita({ description: '', valor: 0 });
  };


  const editarReceita= (receita: NovaReceitaType) => {
    setNovaReceita({ description: receita.description || '', valor: receita.valor || 0 });
    setEditingId(receita.id!);
  };

  const excluirReceita = async (id: string) => {
    const receitaRef = doc(receitasCollection, id);
    await deleteDoc(receitaRef);
  };

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Receitas</h2>
      <div className="transaction-form">
        <input
          type="text"
          className="transaction-input"
          value={novaReceita.description}
          onChange={(e) => setNovaReceita({ ...novaReceita, description: e.target.value })}
          placeholder="Descrição"
        />
        <input
          type="number"
          className="transaction-input"
          value={novaReceita.valor}
          onChange={(e) => setNovaReceita({ ...novaReceita, valor: parseFloat(e.target.value) })}
          placeholder="Valor"
        />
        <button className="transaction-button" onClick={adicionarOuAtualizarReceita}>
          {editingId ? 'Atualizar Receita' : 'Adicionar Receita'}
        </button>
      </div>
      {receitas && receitas.length ? (
        <ul className="transaction-list">
          {receitas.map((receita) => (
            <li key={receita.id!} className="transaction-item">
              <div className="transaction-info">
                <Information receita={receita} />
              </div>
              <div className="transaction-actions">
                <button className="edit-button" onClick={() => editarReceita(receita)}>Editar</button>
                <button className="delete-button" onClick={() => excluirReceita(receita.id!)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Não existem Receitas</h2>
      )}
    </div>
  );
}

export default Receitas;
