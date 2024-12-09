// src/components/QuizForm.js
import React, { useState } from 'react';

const QuizForm = ({ onGoHome }) => {
    const [numQuestions, setNumQuestions] = useState(5);
    const [file, setFile] = useState(null);
    const [questionType, setQuestionType] = useState('multiple-choice');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Quiz soumis :', { numQuestions, file, questionType });
        // Si nécessaire, tu peux ici envoyer les données au backend
    };

    return (
        <div className="container">
            <h1>Configure ton quiz</h1>
            <form onSubmit={handleSubmit} className="quiz-form">
                <label>
                    Nombre de questions :
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        min="1"
                    />
                </label>

                <label>
                    Type de questions :
                    <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="multiple-choice">Choix multiple</option>
                        <option value="true-false">Vrai ou faux</option>
                    </select>
                </label>

                <label>
                    Fichier à importer :
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".csv, .txt"
                    />
                </label>

                <button type="submit">Générer le quiz</button>
            </form>
            <button onClick={onGoHome} className="go-home-btn">Retour à l'accueil</button>
        </div>
    );
};

export default QuizForm;
