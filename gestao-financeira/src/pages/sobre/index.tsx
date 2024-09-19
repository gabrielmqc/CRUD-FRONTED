import React from "react";
import "./style.css";

const Sobre: React.FC = () => {
  return (
    <div className="sobre-container">
      <h1 className="sobre-title">Sobre o Gestor Financeiro</h1>
      <p className="sobre-description">
        O Gestor Financeiro é uma aplicação web desenvolvida para ajudar você a controlar suas finanças pessoais de forma eficiente e intuitiva.
      </p>
      <h2 className="sobre-subtitle">Recursos principais:</h2>
      <ul className="sobre-list">
        <li>Registro de receitas e despesas</li>
        <li>Visualização de balanço financeiro</li>
        <li>Gráficos e relatórios detalhados</li>
        <li>Interface amigável e responsiva</li>
      </ul>
      <p className="sobre-footer">
        Desenvolvido com React, TypeScript e Firebase.
      </p>
    </div>
  );
};

export default Sobre;
