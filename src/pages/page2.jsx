import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    desired_role: "",
    skills: "",
    year_of_college: "",
    experience_level: "",
    specific_areas_of_interest: "",
    learning_hours_per_week: "",
    preferred_learning_resources: "",
    career_goals: "",
    project_experience: "",
    resume: null,
  });
  const [roadmap, setRoadmap] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-roadmap",
        data
      );
      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <div>
    <div className="container">
      <div className="tle">Roadmap</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="desired_role"
          value={formData.desired_role}
          onChange={handleChange}
          placeholder="Desired Role"
          className="input"
        />
        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="input"
        />
        <input
          name="year_of_college"
          value={formData.year_of_college}
          onChange={handleChange}
          placeholder="Year of College"
          className="input"

        />
        <input
          name="experience_level"
          value={formData.experience_level}
          onChange={handleChange}
          placeholder="Experience Level"
          className="input"
        />
        <input
          name="specific_areas_of_interest"
          value={formData.specific_areas_of_interest}
          onChange={handleChange}
          placeholder="Specific Areas of Interest (comma separated)"
          className="input"
        />
        <input
          name="learning_hours_per_week"
          value={formData.learning_hours_per_week}
          onChange={handleChange}
          placeholder="Learning Hours per Week"
          className="input"
        />
        <input
          name="preferred_learning_resources"
          value={formData.preferred_learning_resources}
          onChange={handleChange}
          placeholder="Preferred Learning Resources (comma separated)"
          className="input"
        />
        <input
          name="career_goals"
          value={formData.career_goals}
          onChange={handleChange}
          placeholder="Career Goals"
          className="input"
        />
        <input
          name="project_experience"
          value={formData.project_experience}
          onChange={handleChange}
          placeholder="Project Experience"
          className="input"
        />
        <input type="file" name="resume" onChange={handleFileChange} />
        <button className="btn" type="submit">Generate Roadmap</button>
      </form>
      <div className="roadmap-container">
        {roadmap && <div className="roadmap" dangerouslySetInnerHTML={{ __html: roadmap }} />}
      </div>
      {/* {roadmap && <div dangerouslySetInnerHTML={{ __html: roadmap }} />} */}
      </div>
    </div>
  );
}

export default App;
