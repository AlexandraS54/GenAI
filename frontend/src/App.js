import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import QuestionSetupPage from './components/QuestionSetupPage';
import QuizQuestionPage from './components/QuizQuestionPage'; // Importer la page de question
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');  // Gère la page actuelle
    const [questions, setQuestions] = useState([]);           // Liste des questions générées
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle

    // Démarrer le quiz et récupérer les questions
    const handleStartQuiz = (numQuestions) => {
        setCurrentPage('quiz');  // Passer à la page du quiz
        fetchQuestions(numQuestions);  // Récupérer les questions
    };

    // Récupérer les questions depuis le backend
    const fetchQuestions = async (numQuestions) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/generate-quiz', {
                method: 'POST',
                body: new FormData(), // Formulaire vide ou à compléter selon les besoins
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);  // Stocker les questions dans l'état
            } else {
                console.error('Erreur lors de la récupération des questions');
            }
        } catch (error) {
            console.error('Erreur réseau', error);
        }
    };

    // Passer à la question suivante
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Passer à la question suivante
        } else {
            alert('Quiz terminé !');
        }
    };

    // Revenir à l'accueil
    const handleGoHome = () => {
        setCurrentPage('home');
        setCurrentQuestionIndex(0); // Réinitialiser l'index de la question
        setQuestions([]); // Réinitialiser les questions
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage onCreateQuiz={() => setCurrentPage('quizForm')} />}
            {currentPage === 'quizForm' && (
                <QuizForm onGoHome={handleGoHome} onChooseQuestions={handleStartQuiz} />
            )}
            {currentPage === 'questionSetup' && (
                <QuestionSetupPage onStartQuiz={handleStartQuiz} onGoHome={handleGoHome} />
            )}
            {currentPage === 'quiz' && questions.length > 0 && (
                <QuizQuestionPage
                    question={questions[currentQuestionIndex]}  // Question courante
                    questionNumber={currentQuestionIndex + 1}    // Numéro de la question courante
                    onNext={handleNextQuestion}
                    onGoHome={handleGoHome}
                />
            )}
        </div>
    );
}

export default App;
