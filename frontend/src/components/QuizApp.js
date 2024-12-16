import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import QuizQuestionPage from './components/QuizQuestionPage';
import QuizResultPage from './components/QuizResultPage';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const fetchQuestions = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/generate-quiz', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
                setCurrentPage('quiz');
            } else {
                console.error('Erreur lors de la récupération des questions');
                alert('Erreur lors de la génération des questions.');
            }
        } catch (error) {
            console.error('Erreur réseau', error);
            alert('Erreur réseau. Veuillez vérifier la connexion.');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleFinishQuiz = () => {
        const calculatedScore = questions.reduce((acc, question) => {
            return acc + (question.selectedOption === question.correctAnswer ? 1 : 0);
        }, 0);
        setScore(calculatedScore);
        setCurrentPage('result');
    };

    const handleGoHome = () => {
        setCurrentPage('home');
        setCurrentQuestionIndex(0);
        setQuestions([]);
        setScore(0);
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage onCreateQuiz={() => setCurrentPage('quizForm')} />}
            {currentPage === 'quizForm' && (
                <QuizForm
                    onGoHome={handleGoHome}
                    onChooseQuestions={(formData) => fetchQuestions(formData)}
                />
            )}
            {currentPage === 'quiz' && questions.length > 0 && (
                <QuizQuestionPage
                    question={questions[currentQuestionIndex]}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    onNext={handleNextQuestion}
                    onFinishQuiz={handleFinishQuiz}
                    onGoHome={handleGoHome}
                />
            )}
            {currentPage === 'result' && (
                <QuizResultPage
                    score={score}
                    questions={questions}
                    onGoHome={handleGoHome}
                />
            )}
        </div>
    );
}

export default App;