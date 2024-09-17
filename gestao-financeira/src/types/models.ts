export interface Transacao {
    tipo: string;
    id: string;
    descricao: string;
    valor: number;
    data: Date;
  }
  
  export interface Usuario {
    id: string;
    nome: string;
    email: string;
  }