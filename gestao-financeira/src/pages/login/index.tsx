import React, { useState } from "react";
import './style.css';
import '../../styles/index.css'
import Button from "../../components/button";
import Input from "../../components/input";
import '../../firebaseConfig'
import firebaseConfig from "../../firebaseConfig";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the login logic
        console.log("Login attempt with:", { email, password });
    };

    const navigate = useNavigate();

    const actionLoginGoogle = async() => {
       const user = await firebaseConfig.googleLogar();

       if(user){
           localStorage.setItem('user', JSON.stringify(user));
           navigate('/home');
       } else {
           alert('Erro ao logar com o Google');
       }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h1>Login</h1>
                    <p>Controle suas despesas e acompanhe seu crescimento em tempo real!</p>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}></Input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}></Input>
                    <a href="/">Esqueci minha senha</a>
                </div>

                <div className="form-group">
                    <Button text="Entrar"></Button>
                </div>
                <div className="form-group">
                    <Button text="Login com google" onClick={actionLoginGoogle}></Button>
                </div>
            </form>
        </div>
    );
}

export default Login;