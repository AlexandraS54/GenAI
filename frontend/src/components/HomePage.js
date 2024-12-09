import React from 'react';

const HomePage = ({ onCreateQuiz }) => {
    return (
        <div>
            <h1>Bienvenue dans le générateur de quiz !</h1>
            <button onClick={onCreateQuiz}>Créer un quiz</button>
        </div>
    );
};

export default HomePage;
