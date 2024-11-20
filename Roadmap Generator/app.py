from flask import Flask, request, jsonify
import pathlib
import PyPDF2
import markdown
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins, adjust as needed for security

# Configure Google API key
GOOGLE_API_KEY = "AIzaSyBETNW377tQProfB5UKXb8iDlfbBW3QCns"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/generate-roadmap', methods=['POST'])
def generate_roadmap():
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

    # Convert the Markdown content to HTML
    roadmap_html = markdown.markdown(response.text)

    # Send the response back as JSON
    print(roadmap_html)
    return jsonify({"roadmap": roadmap_html})

if __name__ == '__main__':
    app.run(debug=True)