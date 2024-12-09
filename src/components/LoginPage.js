// src/components/LoginPage.js
import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess, onGoHome }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login avec :', { id, password });
        onLoginSuccess(); // Simuler une connexion réussie
    };

    return (
        <div className="container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit} className="quiz-form">
                <label>
                    Identifiant :
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Mot de passe :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Connexion</button>
            </form>
            <button onClick={onGoHome} className="go-home-btn">Retour à l'accueil</button>
        </div>
    );
};

export default LoginPage;
