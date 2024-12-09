import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = ({ onGoHome, onChooseQuestions }) => {
    const [file, setFile] = useState(null);
    const [numQuestions, setNumQuestions] = useState(5);  // Nombre de questions par défaut
    const [quizData, setQuizData] = useState(null); // État pour les données du quiz

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('num_questions', numQuestions);

        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-quiz', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Réponse de l'API:", response.data);  // Vérification de la réponse
            if (response.data.error) {
                console.error("Erreur du backend:", response.data.error);
                alert("Erreur dans le processus de génération des questions.");
            } else {
                setQuizData(response.data);  // Mettre à jour les questions générées dans l'état
                onChooseQuestions(response.data);  // Passer les questions générées à la page suivante
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du fichier:", error);
            alert("Une erreur est survenue lors de l'envoi du fichier.");
        }
    };

    return (
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

            {/* Affichage des questions générées */}
            {quizData && (
                <div>
                    <h2>Questions générées</h2>
                    {quizData.map((qcm, index) => (
                        <div key={index}>
                            <h3>{qcm.question}</h3>
                            <ul>
                                {qcm.options.map((option, idx) => (
                                    <li key={idx}>
                                        {option}
                                        {qcm.correct_answer_index === idx + 1 && " (Correct)"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizForm;
