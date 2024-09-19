import React, { useState, useEffect } from 'react';
import { firestore } from '../../context/controler';
import { collection, onSnapshot, query } from 'firebase/firestore';
import './style.css';

const SaldoEmTempoReal: React.FC = () => {
  const [totalReceitas, setTotalReceitas] = useState<number>(0);
  const [totalDespezas, setTotalDespezas] = useState<number>(0);

  useEffect(() => {
    const receitasRef = collection(firestore, 'receitas');
    const despezasRef = collection(firestore, 'despezas');

    const unsubscribeReceitas = onSnapshot(query(receitasRef), (snapshot) => {
      const total = snapshot.docs.reduce((acc, doc) => acc + (doc.data().valor || 0), 0);
      setTotalReceitas(total);
    });

    const unsubscribeDespezas = onSnapshot(query(despezasRef), (snapshot) => {
      const total = snapshot.docs.reduce((acc, doc) => acc + (doc.data().valor || 0), 0);
      setTotalDespezas(total);
    });

    return () => {
      unsubscribeReceitas();
      unsubscribeDespezas();
    };
  }, []);

  const saldo = totalReceitas - totalDespezas;

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Saldo em Tempo Real</h2>
      <div className="transaction-item">
        <div className="transaction-info">
          <span className="transaction-description">Saldo Atual</span>
          <span className={`transaction-value ${saldo >= 0 ? 'positive' : 'negative'}`}>
            R$ {saldo.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaldoEmTempoReal;
