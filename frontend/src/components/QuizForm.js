import React, { useState } from 'react';
import './QuizForm.css'; // Assurez-vous d'avoir le bon CSS

const QuizForm = ({ onGoHome, onChooseQuestions, isLoading }) => {
    const [file, setFile] = useState(null);
    const [numQuestions, setNumQuestions] = useState(5);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('num_questions', numQuestions);

        onChooseQuestions(formData); // Appeler la fonction pour générer les questions
    };

    return (
        <div>
            {isLoading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                    <p>Génération des questions en cours...</p>
                </div>
            ) : (
                <div>
                    <h1>Configure ton quiz</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nombre de questions :
                            <input
                                type="number"
                                value={numQuestions}
                                onChange={(e) => setNumQuestions(e.target.value)}
                                min="1"
                            />
                        </label>

                        <label>
                            Fichier à importer :
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf"
                            />
                        </label>

                        <button type="submit">Générer le quiz</button>
                    </form>
                    <button onClick={onGoHome}>Retour à l'accueil</button>
                </div>
            )}
        </div>
    );
};

export default QuizForm;
