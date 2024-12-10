import React, { useState } from "react";
import './QuizQuestionPage.css'; // Importer le fichier CSS pour la mise en forme

const QuizQuestionPage = ({ question, questionNumber, totalQuestions, onNext, onGoHome, onFinishQuiz }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState('');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse.');
        } else {
            setError('');
            onNext(); // Passer à la question suivante
            setSelectedOption(null); // Réinitialiser la sélection pour la prochaine question
        }
    };

    const handleFinish = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse avant de terminer.');
        } else {
            setError('');
            onFinishQuiz(); // Appeler la fonction pour finir le quiz
        }
    };

    return (
        <div className="quiz-container">
            <h1>Question {questionNumber} / {totalQuestions}</h1> {/* Afficher le numéro de la question */}
            <p className="question">{question.question}</p>
            {error && <p className="error">{error}</p>}
            <ul className="options-list">
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={`option ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            <div className="buttons">
                {questionNumber === totalQuestions ? (  // Si on est sur la dernière question
                    <button className="finish-btn" onClick={handleFinish}>Terminer le quiz</button>
                ) : (
                    <button className="next-btn" onClick={handleNext}>Question suivante</button> // Sinon, afficher "Question suivante"
                )}
                <button className="home-btn" onClick={onGoHome}>Retour à l'accueil</button>
            </div>
        </div>
    );
};

export default QuizQuestionPage;
