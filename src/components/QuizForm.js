// src/components/QuizForm.js
import React, { useState } from 'react';

const QuizForm = ({ onGoHome, onChooseQuestions }) => {
    const [file, setFile] = useState(null);
    const [questionType, setQuestionType] = useState('multiple-choice');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Quiz soumis :', { file, questionType });
        // Redirige vers la configuration du nombre de questions
        onChooseQuestions();
    };

    return (
        <div className="container">
            <h1>Configure ton quiz</h1>
            <form onSubmit={handleSubmit} className="quiz-form">
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
