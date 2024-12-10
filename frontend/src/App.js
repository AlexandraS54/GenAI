import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizForm from './components/QuizForm';
import QuizQuestionPage from './components/QuizQuestionPage'; // Page des questions
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');  // Page actuelle
    const [questions, setQuestions] = useState([]);          // Questions générées
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle

    // Récupérer les questions depuis le backend
    const fetchQuestions = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/generate-quiz', {
                method: 'POST',
                body: formData, // Envoie le fichier et le nombre de questions
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data); // Stocker les questions
                setCurrentPage('quiz'); // Passer à la page quiz
            } else {
                console.error('Erreur lors de la récupération des questions');
                alert('Erreur lors de la génération des questions.');
            }
        } catch (error) {
            console.error('Erreur réseau', error);
            alert('Erreur réseau. Veuillez vérifier la connexion.');
        }
    };

    // Passer à la question suivante
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Quiz terminé !');
        }
    };

    // Revenir à l'accueil
    const handleGoHome = () => {
        setCurrentPage('home');
        setCurrentQuestionIndex(0);
        setQuestions([]);
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage onCreateQuiz={() => setCurrentPage('quizForm')} />}
            {currentPage === 'quizForm' && (
                <QuizForm
                    onGoHome={handleGoHome}
                    onChooseQuestions={(formData) => fetchQuestions(formData)} // Envoie le FormData
                />
            )}
            {currentPage === 'quiz' && questions.length > 0 && (
                <QuizQuestionPage
                    question={questions[currentQuestionIndex]}  // Question courante
                    questionNumber={currentQuestionIndex + 1}   // Numéro de la question
                    onNext={handleNextQuestion}
                    onGoHome={handleGoHome}
                />
            )}
        </div>
    );
}

export default App;
