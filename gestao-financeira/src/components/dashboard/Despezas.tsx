import { useEffect, useState } from "react";
import { despezasCollection } from "../../context/controler";
import { DocumentData, onSnapshot, QuerySnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { NovaDespezaType } from "../../types/despezas";
import Information from "../InformationD";
import  './style.css';

function Despezas() {
  const [despezas, setDespezas] = useState<NovaDespezaType[]>([]);
  const [novaDespeza, setNovaDespeza] = useState({ description: '', valor: 0 });

  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => onSnapshot(despezasCollection, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    setDespezas(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    )
  }), []);

  const adicionarOuAtualizarDespeza = async () => {
    if (editingId) {
      const DespezaRef = doc(despezasCollection, editingId);
      await updateDoc(DespezaRef, novaDespeza);
      setEditingId(null);
    } else {
      await addDoc(despezasCollection, novaDespeza);
    }
    setNovaDespeza({ description: '', valor: 0 });
  };


  const editarDespeza = (despeza: NovaDespezaType) => {
    setNovaDespeza({ description: despeza.description || '', valor: despeza.valor || 0 });
    setEditingId(despeza.id!);
  };

  const excluirDespeza = async (id: string) => {
    const DespezaRef = doc(despezasCollection, id);
    await deleteDoc(DespezaRef);
  };

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Despezas</h2>
      <div className="transaction-form">
        <input
          type="text"
          className="transaction-input"
          value={novaDespeza.description}
          onChange={(e) => setNovaDespeza({ ...novaDespeza, description: e.target.value })}
          placeholder="Descrição"
        />
        <input
          type="number"
          className="transaction-input"
          value={novaDespeza.valor}
          onChange={(e) => setNovaDespeza({ ...novaDespeza, valor: parseFloat(e.target.value) })}
          placeholder="Valor"
        />
        <button className="transaction-button" onClick={adicionarOuAtualizarDespeza}>
          {editingId ? 'Atualizar Despeza' : 'Adicionar Despeza'}
        </button>
      </div>
      {despezas && despezas.length ? (
        <ul className="transaction-list">
          {despezas.map((despeza) => (
            <li key={despeza.id!} className="transaction-item">
              <div className="transaction-info">
                <Information despeza={despeza} />
              </div>
              <div className="transaction-actions">
                <button className="edit-button" onClick={() => editarDespeza(despeza)}>Editar</button>
                <button className="delete-button" onClick={() => excluirDespeza(despeza.id!)}>Excluir</button>
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

export default Despezas;
