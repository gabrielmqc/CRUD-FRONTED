import React, { createContext, useState, useContext } from 'react';

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  tipo: 'receita' | 'despesa';
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
}


interface AppContextData {
  receitas: Transacao[];
  despesas: Transacao[];
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  adicionarReceita: (receita: Omit<Transacao, 'id'>) => void;
  adicionarDespesa: (despesa: Omit<Transacao, 'id'>) => void;
  editReceita: (id: string, updatedReceita: Omit<Transacao, 'id'>) => void;
  deleteReceita: (id: string) => void;
  editDespesa: (id: string, updatedDespesa: Omit<Transacao, 'id'>) => void;
  deleteDespesa: (id: string) => void;
}


const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [receitas, setReceitas] = useState<Transacao[]>([]);
  const [despesas, setDespesas] = useState<Transacao[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const adicionarReceita = (receita: Omit<Transacao, 'id'>) => {
    const novaReceita = { ...receita, id: Date.now().toString() };
    setReceitas([...receitas, novaReceita]);
  };

  const adicionarDespesa = (despesa: Omit<Transacao, 'id'>) => {
    const novaDespesa = { ...despesa, id: Date.now().toString() };
    setDespesas([...despesas, novaDespesa]);
  };

  const editReceita = (id: string, updatedReceita: Omit<Transacao, 'id'>) => {
    setReceitas(receitas.map(r => r.id === id ? { ...r, ...updatedReceita } : r));
  };

  const deleteReceita = (id: string) => {
    setReceitas(receitas.filter(r => r.id !== id));
  };

  const editDespesa = (id: string, updatedDespesa: Omit<Transacao, 'id'>) => {
    setDespesas(despesas.map(d => d.id === id ? { ...d, ...updatedDespesa } : d));
  };

  const deleteDespesa = (id: string) => {
    setDespesas(despesas.filter(d => d.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      receitas, despesas, usuario, setUsuario,
      adicionarReceita, adicionarDespesa, 
      editReceita, deleteReceita, editDespesa, deleteDespesa 
    }}>
      {children}
    </AppContext.Provider>
  );
};
export const useApp = () => useContext(AppContext);