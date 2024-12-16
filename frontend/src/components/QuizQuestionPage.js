import React, { useState, useEffect } from "react";
import './QuizQuestionPage.css';

const QuizQuestionPage = ({ question, questionNumber, totalQuestions, onNext, onGoHome, onFinishQuiz }) => {
    const [selectedOption, setSelectedOption] = useState(question.selectedOption || null);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(20); // Timer

    // Gérer la sélection des options
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        question.selectedOption = option;
    };

    // Passer à la question suivante
    const handleNext = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse.');
        } else {
            setError('');
            setSelectedOption(null);
            setTimeLeft(20); // Réinitialiser le timer pour la prochaine question
            onNext();
        }
    };

    // Terminer le quiz
    const handleFinish = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse avant de terminer.');
        } else {
            setError('');
            onFinishQuiz();
        }
    };

    // Timer avec useEffect
    useEffect(() => {
        if (timeLeft === 0) {
            if (questionNumber === totalQuestions) {
                onFinishQuiz(); // Terminer le quiz si c'est la dernière question
            } else {
                setTimeLeft(20); // Réinitialiser le timer pour la prochaine question
                setSelectedOption(null); // Réinitialiser la sélection
                onNext(); // Passer automatiquement à la question suivante
            }
        }

        const timer = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 2000);

        // Nettoyage : efface le timer précédent lorsque le composant est démonté ou mis à jour
        return () => clearTimeout(timer);
    }, [timeLeft, questionNumber, totalQuestions, onNext, onFinishQuiz]);

    return (
        <div className="quiz-container">
            <h1>Question {questionNumber} / {totalQuestions}</h1>
            <p className="question">{question.question}</p>
            <div className="timer">
                <p>Temps restant : <strong>{timeLeft} secondes</strong></p>
            </div>
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
                {questionNumber === totalQuestions ? (
                    <button className="finish-btn" onClick={handleFinish}>Terminer le quiz</button>
                ) : (
                    <button className="next-btn" onClick={handleNext}>Question suivante</button>
                )}
                <button className="home-btn" onClick={onGoHome}>Retour à l'accueil</button>
            </div>
        </div>
    );
};

export default QuizQuestionPage;
