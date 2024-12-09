import os
import PyPDF2
import json
import random
from flask_cors import CORS
from flask import Flask, request, jsonify
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

# Charger les variables depuis le fichier .env
load_dotenv()

# Initialisation de Flask
app = Flask(__name__)
CORS(app)

# Fonction pour extraire le texte du PDF
def extract_text_from_pdf(pdf_path):
    extracted_text = ""
    try:
        with open(pdf_path, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            for page in reader.pages:
                extracted_text += page.extract_text()
        return extracted_text
    except Exception as e:
        print(f"Erreur lors de l'extraction du texte du PDF: {e}")
        return ""

# Fonction pour générer un QCM à partir d'une section du texte
def generate_qcm_from_text(text_section):
    try:
        model = ChatOpenAI(
            temperature=0,
            model_name="gpt-4",
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
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

        response = qcm_chain.run(text_section)

        # Déboguer la réponse brute du modèle
        print(f"Réponse brute du modèle : {response}")

        try:
            qcm = json.loads(response)  # Vérification du format JSON
            return qcm
        except json.JSONDecodeError:
            print("Erreur lors du décodage du JSON.")
            return None
    except Exception as e:
        print(f"Erreur dans la génération du QCM : {e}")
        return None


def create_qcm_from_pdf(pdf_path, n_questions):
    extracted_text = extract_text_from_pdf(pdf_path)
    if not extracted_text:
        return []

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
    if 'file' not in request.files:
        return jsonify({"error": "Aucun fichier fourni"}), 400

    file = request.files['file']
    if 'num_questions' not in request.form:
        return jsonify({"error": "Le champ 'num_questions' est manquant."}), 400
    num_questions = int(request.form['num_questions'])

    # Sauvegarder le fichier temporairement
    pdf_path = f"temp_{file.filename}"
    try:
        file.save(pdf_path)
    except Exception as e:
        print(f"Erreur lors de la sauvegarde du fichier: {e}")
        return jsonify({"error": "Erreur lors de la sauvegarde du fichier."}), 400

    # Générer les questions à partir du PDF
    qcm_list = create_qcm_from_pdf(pdf_path, num_questions)

    if len(qcm_list) < num_questions:
        return jsonify({"error": f"Pas assez de questions disponibles (seulement {len(qcm_list)} questions générées)."}), 400

    # Sélectionner aléatoirement les questions générées
    selected_qcm = random.sample(qcm_list, num_questions)

    # Retourner les questions sous forme de JSON
    return jsonify(selected_qcm)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
