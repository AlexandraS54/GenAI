// src/components/HomePage.js
import React from 'react';

const HomePage = ({ onCreateQuiz, onLogin }) => {
    return (
        <div className="container">
            {/* Icône de profil tout en haut à droite */}
            <div className="profile-icon" onClick={onLogin}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="profile-icon-svg"
                >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M2 20c0-4 3-7 10-7s10 3 10 7H2z" />
                </svg>
            </div>
            <h1>Quiz Factory</h1>
            <p>Créez des quiz interactifs en quelques clics !</p>
            <button onClick={onCreateQuiz}>Créer mon quiz</button>
        </div>
    );
};

export default HomePage;
