import React, { useState } from 'react';

const QuizForm = ({ onGoHome, onChooseQuestions }) => {
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
        formData.append('file', file); // Ajout du fichier
        formData.append('num_questions', numQuestions); // Ajout du nombre de questions

        onChooseQuestions(formData); // Envoie le FormData à `fetchQuestions`
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
        </div>
    );
};

export default QuizForm;
