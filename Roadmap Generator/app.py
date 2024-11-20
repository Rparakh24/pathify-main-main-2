from flask import Flask, request, jsonify
import pathlib
import PyPDF2
import markdown
import spacy
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins, adjust as needed for security

# Configure Google API key
GOOGLE_API_KEY = "AIzaSyBETNW377tQProfB5UKXb8iDlfbBW3QCns"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Load the SpaCy model for NLP processing
nlp = spacy.load("en_core_web_sm")

def extract_information(resume_text):
    """Extract skills, experience, and education from the resume text."""
    doc = nlp(resume_text)

    # Extract skills (based on nouns and verbs in the text)
    skills = list(set(token.text for token in doc if token.pos_ in {"NOUN", "VERB"}))

    # Extract experience (phrases containing the word 'experience')
    experience = [chunk.text for chunk in doc.noun_chunks if "experience" in chunk.text.lower()]

    # Extract education (organizations with 'University' in their name)
    education = [ent.text for ent in doc.ents if ent.label_ == "ORG" and "University" in ent.text]

    return skills, experience, education

@app.route('/screen-resume', methods=['POST'])
def screen_resume():
    """Endpoint to process the uploaded resume and screen the candidate."""
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['resume']

    if file.filename == '':
        return jsonify({'error': 'File name is empty'}), 400

    try:
        # Extract text from the uploaded PDF
        pdf_reader = PyPDF2.PdfReader(file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Extract skills, experience, and education from the resume
        skills, experience, education = extract_information(text)

        # Create the prompt for the generative AI model
        prompt = f"""
        Analyze the following resume:

        {text}

        The candidate has the following skills: {', '.join(skills)}
        The candidate has the following experience: {', '.join(experience)}
        The candidate has the following education: {', '.join(education)}

        Assess the candidate's suitability for a software engineer position. 
        Provide feedback on the resume's strengths and weaknesses.
        """

        # Call the generative AI model
        response = model.generate_content(prompt)

        if response:
            return jsonify({
                'skills': skills,
                'experience': experience,
                'education': education,
                'analysis': response.text
            })
        else:
            return jsonify({'error': 'Failed to analyze resume'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-roadmap', methods=['POST'])
def generate_roadmap():
    """Endpoint to generate a personalized roadmap."""
    data = request.form

    # Gather input from the form
    desired_role = data.get('desired_role')
    skills = data.get('skills').split(',')
    year_of_college = data.get('year_of_college')
    experience_level = data.get('experience_level')
    specific_areas_of_interest = data.get('specific_areas_of_interest').split(',')
    learning_hours_per_week = data.get('learning_hours_per_week')
    preferred_learning_resources = data.get('preferred_learning_resources').split(',')
    career_goals = data.get('career_goals')
    project_experience = data.get('project_experience')
    resume_file = request.files.get('resume')

    # Process resume if uploaded
    resume_content = ""
    if resume_file:
        reader = PyPDF2.PdfReader(resume_file)
        for page in reader.pages:
            resume_content += page.extract_text()

    # Generate the prompt
    prompt = f"""
    Generate a personalized roadmap for a user looking to become a {desired_role}. The user has the following skills: {', '.join(skills)}. They are currently in their {year_of_college} of college and have {experience_level} experience. They are interested in {', '.join(specific_areas_of_interest)}. They can dedicate {learning_hours_per_week} per week to learning. They prefer learning through {', '.join(preferred_learning_resources)}. Their long-term career goal is {career_goals}. They have {project_experience} project experience.

    Their resume is as follows:
    {resume_content}

    Based on this information, recommend specific certifications or courses with links that align with their career goals.

    Format the roadmap into sections: A Timeline, Foundational Skills, Intermediate Skills, Advanced Skills, Projects, Certifications, Additional Resources.
    Add one line about each step as well, why it's necessary/why to learn/why it is optional/who can skip this step, etc.
    Refer to the user in the second person only.
    """

    # Call the generative model
    response = model.generate_content(prompt)

    if response:
        # Convert the Markdown content to HTML
        roadmap_html = markdown.markdown(response.text)
        return jsonify({"roadmap": roadmap_html})
    else:
        return jsonify({'error': 'Failed to generate roadmap'}), 500

if __name__ == '__main__':
    app.run(debug=True)
