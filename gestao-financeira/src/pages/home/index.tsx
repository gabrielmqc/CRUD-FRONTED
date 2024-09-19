import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Gestor Financeiro</h1>
      {userEmail && <p className="user-email">Usuário: {userEmail}</p>}
      <p className="home-description">
        Gerencie suas finanças de forma simples e eficiente.
      </p>
      <div className="home-buttons">
        <Link to="/dashboard" className="home-button primary">
          Ir para o Dashboard
        </Link>
        <Link to="/sobre" className="home-button secondary">
          Saiba Mais
        </Link>
      </div>
    </div>
  );
};

export default Home;
