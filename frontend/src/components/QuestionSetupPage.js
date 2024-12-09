// src/components/QuestionSetupPage.js
import React, { useState } from 'react';

const QuestionSetupPage = ({ onStartQuiz, onGoHome }) => {
    const [numQuestions, setNumQuestions] = useState(5); // Valeur par défaut

    const handleStart = () => {
        onStartQuiz(numQuestions); // Appelle une fonction pour démarrer le quiz
    };

    return (
        <div className="container">
            <h1>Choisissez le nombre de questions</h1>
            <label>
                Nombre de questions :
                <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    min="1"
                />
            </label>
            <button onClick={handleStart}>Commencer le quiz</button>
            <button onClick={onGoHome} className="go-home-btn">
                Retour à l'accueil
            </button>
        </div>
    );
};

export default QuestionSetupPage;
