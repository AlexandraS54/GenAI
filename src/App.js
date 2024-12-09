// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');  // État pour savoir quelle page afficher

    const handleCreateQuiz = () => {
        setCurrentPage('quizForm');  // Affiche la page du formulaire
    };

    const handleGoHome = () => {
        setCurrentPage('home');  // Affiche la page d'accueil
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage onCreateQuiz={handleCreateQuiz} />}
            {currentPage === 'quizForm' && <QuizForm onGoHome={handleGoHome} />}
        </div>
    );
}

export default App;
