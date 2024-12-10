import React, { useState } from "react";
import QuizForm from "./QuizForm";
import QuizQuestionPage from "./QuizQuestionPage";

const QuizApp = () => {
    const [quizData, setQuizData] = useState(null); // Stocke les questions générées
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle

    const handleChooseQuestions = (data) => {
        setQuizData(data); // Stocke les questions dans l'état
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleGoHome = () => {
        setQuizData(null); // Réinitialise l'état du quiz
        setCurrentQuestionIndex(0); // Réinitialise l'index
    };

    const handleFinishQuiz = () => {
        // Logic to finish the quiz (e.g., show results)
        console.log("Quiz terminé !");
    };

    return (
        <div>
            {quizData === null ? (
                <QuizForm
                    onGoHome={handleGoHome}
                    onChooseQuestions={handleChooseQuestions}
                />
            ) : (
                <QuizQuestionPage
                    question={quizData[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={quizData.length} // Passer le nombre total de questions
                    onNext={handleNextQuestion}
                    onGoHome={handleGoHome}
                    onFinishQuiz={handleFinishQuiz} // Passer la fonction pour finir le quiz
                />
            )}
        </div>
    );
};

export default QuizApp;
