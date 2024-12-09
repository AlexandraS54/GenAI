// src/components/HomePage.js
import React from 'react';

const HomePage = ({ onCreateQuiz }) => {
    return (
        <div className="container">
            <h1>Quiz Factory</h1>
            <p>Créez des quiz interactifs en quelques clics !</p>
            <button onClick={onCreateQuiz}>Créer mon quiz</button>
        </div>
    );
};

export default HomePage;
