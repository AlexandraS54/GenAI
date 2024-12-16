import React, { useState } from "react";
import './QuizQuestionPage.css';

const QuizQuestionPage = ({ question, questionNumber, totalQuestions, onNext, onGoHome, onFinishQuiz }) => {
    const [selectedOption, setSelectedOption] = useState(question.selectedOption || null);
    const [error, setError] = useState('');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        question.selectedOption = option;
    };

    const handleNext = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse.');
        } else {
            setError('');
            onNext();
            setSelectedOption(null);
        }
    };

    const handleFinish = () => {
        if (selectedOption === null) {
            setError('Veuillez sélectionner une réponse avant de terminer.');
        } else {
            setError('');
            onFinishQuiz();
        }
    };

    return (
        <div className="quiz-container">
            <h1>Question {questionNumber} / {totalQuestions}</h1>
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