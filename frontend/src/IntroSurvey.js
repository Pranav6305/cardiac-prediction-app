import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function IntroSurvey({ userEmail }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sleepHours: "",
    waterIntake: "",
    fastFoodFreq: "",
    eatsFruitsVeggies: "",
    stepsWalked: "",
    exercises: "",
    symptoms: "",
    healthHistory: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/introsurvey",
        {
          email: userEmail,
          ...form,
        }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Survey already submitted. Redirecting to login...");
        navigate("/login");
      } else {
        alert("Failed to submit survey.");
        console.error(err);
      }
    }
  };

  return (
    <div className="survey-container">
      <h1>Introductory Survey</h1>
      <p className="subtitle">
        Please answer a few questions to help us understand your lifestyle and
        health better.
      </p>
      <form className="survey-form" onSubmit={handleSubmit}>
        {/* Each question in its own section */}
        <div className="survey-section">
          <h3>1. How many hours do you sleep on average per night?</h3>
          <div className="checkbox-group">
            {["Less than 5", "5–7", "7–9", "More than 9"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.sleepHours === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="sleepHours"
                  value={option}
                  onChange={handleChange}
                  checked={form.sleepHours === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>2. How many glasses of water do you drink daily?</h3>
          <div className="checkbox-group">
            {["Less than 4", "4–7", "8 or more"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.waterIntake === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="waterIntake"
                  value={option}
                  onChange={handleChange}
                  checked={form.waterIntake === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>3. How often do you eat high-fat, fried, or fast food?</h3>
          <div className="checkbox-group">
            {["Daily", "A few times a week", "Rarely", "Never"].map(
              (option) => (
                <label
                  key={option}
                  className={`checkbox-item ${
                    form.fastFoodFreq === option ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="fastFoodFreq"
                    value={option}
                    onChange={handleChange}
                    checked={form.fastFoodFreq === option}
                    required
                  />
                  {option}
                </label>
              )
            )}
          </div>
        </div>

        <div className="survey-section">
          <h3>4. Do you eat fruits and vegetables daily?</h3>
          <div className="checkbox-group">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.eatsFruitsVeggies === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="eatsFruitsVeggies"
                  value={option}
                  onChange={handleChange}
                  checked={form.eatsFruitsVeggies === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>5. How many steps do you walk per day on average?</h3>
          <div className="checkbox-group">
            {["Less than 3000", "3000–7000", "More than 7000"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.stepsWalked === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="stepsWalked"
                  value={option}
                  onChange={handleChange}
                  checked={form.stepsWalked === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>6. Do you exercise at least 3 times a week?</h3>
          <div className="checkbox-group">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.exercises === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="exercises"
                  value={option}
                  onChange={handleChange}
                  checked={form.exercises === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>
            7. Do you often experience chest pain, shortness of breath, or
            dizziness?
          </h3>
          <div className="checkbox-group">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.symptoms === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="symptoms"
                  value={option}
                  onChange={handleChange}
                  checked={form.symptoms === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="survey-section">
          <h3>
            8. Do you have a history of high blood pressure, diabetes, or heart
            disease?
          </h3>
          <div className="checkbox-group">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`checkbox-item ${
                  form.healthHistory === option ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="healthHistory"
                  value={option}
                  onChange={handleChange}
                  checked={form.healthHistory === option}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}

export default IntroSurvey;
