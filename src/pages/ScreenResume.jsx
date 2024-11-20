import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ScreenResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/screen-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <Navbar/>
      <h1>Resume Screener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Resume:
          <input type="file" onChange={handleFileChange} accept=".pdf" />
        </label>
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Analysis Results</h2>
          <p><strong>Skills:</strong> {result.skills.join(", ")}</p>
          <p><strong>Experience:</strong> {result.experience.join(", ")}</p>
          <p><strong>Education:</strong> {result.education.join(", ")}</p>
          <h3>Analysis:</h3>
          <p>{result.analysis}</p>
        </div>
      )}
    </div>
  );
}

export default ScreenResume;
