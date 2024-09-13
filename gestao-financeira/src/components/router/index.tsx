import React, { useState } from "react";
import Login from "../../pages/login";
import Home from "../../pages/home";
import Dashboard from "../../pages/dashboard";
import Sobre from "../../pages/sobre";

enum RouterPages {
    'login' = 'login',
    'home' = 'home',
    'dashboard' = 'dashboard',
    'sobre' = 'sobre'
}

const Router = () => {
    const [getPaginaAtual, setPaginaAtual] =
        useState<RouterPages>(RouterPages.home)

    const renderizarBotoes = () => (
        <div>
            <button onClick={() => setPaginaAtual(RouterPages.login)}>Login</button>
            <button onClick={() => setPaginaAtual(RouterPages.home)}>Inicio</button>
            <button onClick={() => setPaginaAtual(RouterPages.dashboard)}>Todo</button>
            <button onClick={() => setPaginaAtual(RouterPages.sobre)}>Sobre</button>
        </div>
    )
    const renderizarPagina = () => {
        switch (getPaginaAtual) {
            case RouterPages.login: return <Login />
            case RouterPages.home: return <Home />
            case RouterPages.dashboard: return <Dashboard />
            case RouterPages.sobre: return <Sobre />
            default: return <Home />
        }
    }

    return (
        <div>
            {renderizarBotoes()}
            {renderizarPagina()}
        </div>
    )
}

export default Router;