import os
import PyPDF2
import json
import random
from flask import Flask, request, jsonify
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

# Charger les variables depuis le .env à la racine
load_dotenv(dotenv_path="../.env")  # Ajuste le chemin si nécessaire

# Initialisation de Flask
app = Flask(__name__)

# Fonction pour extraire le texte du PDF
def extract_text_from_pdf(pdf_path):
    extracted_text = ""
    with open(pdf_path, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        for page in reader.pages:
            extracted_text += page.extract_text()
    return extracted_text

# Fonction pour générer un QCM à partir d'une section du texte
def generate_qcm_from_text(text_section):
    model = ChatOpenAI(temperature=0, model_name="gpt-4", max_tokens=4000)
    qcm_template = """
    À partir du texte suivant, génère un objet JSON contenant une question à choix multiples (QCM) avec quatre choix de réponses, dont une seule correcte.
    Inclure également l'indice (de 1 à 4) de la réponse correcte.

    Exemple de sortie JSON :
    {{
        "question": "Quel est le nombre premier suivant après 7 ?",
        "options": ["5", "9", "11", "13"],
        "correct_answer_index": 3
    }}

    Texte : {text_section}
    """
    qcm_prompt = PromptTemplate.from_template(qcm_template)
    qcm_chain = LLMChain(prompt=qcm_prompt, llm=model)

    # Obtenir la réponse sous forme de JSON
    response = qcm_chain.run(text_section)
    
    try:
        qcm = json.loads(response)  # Vérification du format JSON
        return qcm
    except json.JSONDecodeError:
        print("Erreur lors du parsing JSON : ", response)
        return None

# Fonction pour créer plusieurs QCM à partir d'un PDF
def create_qcm_from_pdf(pdf_path, n_questions):
    extracted_text = extract_text_from_pdf(pdf_path)
    text_length = len(extracted_text)
    section_size = text_length // n_questions
    qcm_list = []

    for i in range(n_questions):
        start_index = i * section_size
        end_index = (i + 1) * section_size if i < n_questions - 1 else text_length
        text_section = extracted_text[start_index:end_index]

        qcm = generate_qcm_from_text(text_section)
        if qcm:
            qcm_list.append(qcm)

    return qcm_list

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    # Récupération du fichier et des paramètres depuis la requête
    file = request.files['file']
    num_questions = int(request.form['num_questions'])

    # Sauvegarde temporaire du fichier PDF
    pdf_path = f"temp_{file.filename}"
    file.save(pdf_path)

    # Génération de 50 questions à partir du PDF
    qcm_list = create_qcm_from_pdf(pdf_path, 50)

    # Sélectionner un nombre aléatoire de questions
    selected_qcm = random.sample(qcm_list, num_questions)

    # Retourner les questions sélectionnées
    return jsonify(selected_qcm)

if __name__ == '__main__':
    app.run(debug=True)
