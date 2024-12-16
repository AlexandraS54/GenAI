import React from 'react';
import './QuizResultPage.css';

const QuizResultPage = ({ score, questions, onGoHome }) => {
    return (
        <div className="result-container">
            <h1>Votre score : {score} / {questions.length}</h1>
            <div className="questions-review">
                {questions.map((question, index) => {
                    const questionNumber = index + 1;
                    const selectedOptionIndex = question.options.indexOf(question.selectedOption) + 1;
                    const correctOptionIndex = question.correct_answer_index;
                    
                    return (
                        <div key={index} className="question-review">
                            <h3 className="question">Question {questionNumber} :</h3>
                            <p>{question.question}</p>
                            <div className="options-list">
                                {question.options.map((option, optionIndex) => {
                                    const isSelected = selectedOptionIndex === optionIndex + 1;
                                    const isCorrect = correctOptionIndex === optionIndex + 1;
                                    const isIncorrect = isSelected && !isCorrect;

                                    return (
                                        <div 
                                            key={optionIndex} 
                                            className={`option 
                                                ${isCorrect ? 'correct' : ''} 
                                                ${isIncorrect ? 'incorrect' : ''} 
                                                ${isSelected ? 'selected' : ''}`}>
                                            {option}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="home-button" onClick={onGoHome}>Retour à l'accueil</button>
        </div>
    );
};

export default QuizResultPage;
