import React from 'react';

const QuizQuestionPage = ({ question, questionNumber, onNext, onGoHome }) => {
    return (
        <div>
            <h1>Question {questionNumber}</h1>
            <p>{question.question}</p>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
            <button onClick={onNext}>Question suivante</button>
            <button onClick={onGoHome}>Retour à l'accueil</button>
        </div>
    );
};

export default QuizQuestionPage;
