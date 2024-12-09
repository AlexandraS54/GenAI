// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import QuestionSetupPage from './components/QuestionSetupPage';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [numQuestions, setNumQuestions] = useState(0); // Stocke le nombre de questions

    const handleCreateQuiz = () => {
        setCurrentPage('quizForm'); // Affiche la page de configuration
    };

    const handleChooseQuestions = () => {
        setCurrentPage('questionSetup'); // Affiche la page de choix du nombre de questions
    };

    const handleStartQuiz = (num) => {
        setNumQuestions(num);
        console.log(`Démarrage du quiz avec ${num} questions !`);
        // À partir d'ici, vous pouvez rediriger vers une page de quiz
    };

    const handleGoHome = () => {
        setCurrentPage('home');
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage onCreateQuiz={handleCreateQuiz} />}
            {currentPage === 'quizForm' && (
                <QuizForm onGoHome={handleGoHome} onChooseQuestions={handleChooseQuestions} />
            )}
            {currentPage === 'questionSetup' && (
                <QuestionSetupPage onStartQuiz={handleStartQuiz} onGoHome={handleGoHome} />
            )}
        </div>
    );
}

export default App;
