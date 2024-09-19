import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Gestor Financeiro</h1>
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
