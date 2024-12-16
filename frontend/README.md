# Lancer le Front 

npm install 
si demande du terminal : $env:NODE_OPTIONS="--openssl-legacy-provider"
npm start 

# Lancer le Back dans un autre terminal 

pip install virtualenv
python -m venv venv
.\venv\Scripts\activate

pip install -r requirements.txt

fichier .env (voir contenu dans mail)
python app.py

# Résultat
Quizz généré suivant le nbre de questions et le PDF rentré par l'utilisateur 
Page résultat à la fin avec les bonnes réponses + note finale
Timer de 20 secondes pour chaque question
Interface imitation arcade gaming 

