import React from 'react'
import { useState } from 'react'
import Login from './pages/login';
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import TransactionList from './components/transaction/TransactionList';
import TransactionForm from './components/transaction/TransactionForm';
import { FinancialProvider } from './context/financialContext';

function App() {
 /* const renderizarBotoes = () => (
    <div className="App">
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
        </nav>
      </div>
  );*/

  return (


    <FinancialProvider>
      <div>
        <h1>Controle Financeiro</h1>
        <TransactionForm />
        <TransactionList />
      </div>
    </FinancialProvider>
    /*<Router>
          {renderizarBotoes()}
          <Routes>
            <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sobre" element={<Sobre />} />
          </Routes>
    </Router>*/
        
  );
}

export default App
