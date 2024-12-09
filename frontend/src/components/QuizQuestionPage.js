import React, { useState } from 'react';

function QuizQuestionPage({ questionNumber }) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNextClick = () => {
        // Logique pour passer à la question suivante ou afficher un résultat
        console.log(`Réponse à la question ${questionNumber}: ${selectedAnswer}`);
    };

    return (
        <div className="quiz-question-container">
            <h2>Question {questionNumber}</h2>
            <p>Voici la question {questionNumber} avec les réponses possibles.</p>

            <form className="quiz-form">
                {/* Réponse 1 */}
                <div className="quiz-option">
                    <div className="answer-label">Réponse 1</div>
                    <input
                        type="radio"
                        id="answer1"
                        name="answer"
                        value="answer1"
                        checked={selectedAnswer === 'answer1'}
                        onChange={handleAnswerChange}
                    />
                </div>

                {/* Réponse 2 */}
                <div className="quiz-option">
                    <div className="answer-label">Réponse 2</div>
                    <input
                        type="radio"
                        id="answer2"
                        name="answer"
                        value="answer2"
                        checked={selectedAnswer === 'answer2'}
                        onChange={handleAnswerChange}
                    />
                </div>

                {/* Réponse 3 */}
                <div className="quiz-option">
                    <div className="answer-label">Réponse 3</div>
                    <input
                        type="radio"
                        id="answer3"
                        name="answer"
                        value="answer3"
                        checked={selectedAnswer === 'answer3'}
                        onChange={handleAnswerChange}
                    />
                </div>

                {/* Réponse 4 */}
                <div className="quiz-option">
                    <div className="answer-label">Réponse 4</div>
                    <input
                        type="radio"
                        id="answer4"
                        name="answer"
                        value="answer4"
                        checked={selectedAnswer === 'answer4'}
                        onChange={handleAnswerChange}
                    />
                </div>

                {/* Bouton suivant */}
                <button
                    type="button"
                    onClick={handleNextClick}
                    className="next-button"
                    disabled={!selectedAnswer}  // Empêche de cliquer si aucune réponse n'est sélectionnée
                >
                    Suivant
                </button>

                {/* Bouton retour à l'accueil */}
                <a href="/" className="go-home-btn">
                    <button
                        type="button"
                        className="go-home-btn"
                    >
                        Retour à l'accueil
                    </button>
                </a>
            </form>
        </div>
    );
}

export default QuizQuestionPage;
