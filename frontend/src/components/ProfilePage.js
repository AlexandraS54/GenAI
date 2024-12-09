// src/components/ProfilePage.js
import React from 'react';

const ProfilePage = ({ onGoHome }) => {
    return (
        <div className="container">
            <h1>Mon Profil</h1>
            <div className="quiz-history">
                <h2>Historique des quiz :</h2>
                <ul>
                    <li>Quiz 1 - 05/12/2024</li>
                    <li>Quiz 2 - 07/12/2024</li>
                    <li>Quiz 3 - 09/12/2024</li>
                </ul>
            </div>
            <button onClick={onGoHome} className="go-home-btn">Retour à l'accueil</button>
        </div>
    );
};

export default ProfilePage;
