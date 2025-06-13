import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css"; // use the same styling as your Signup/Login

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
      const response = await axios.post("http://localhost:5000/api/introsurvey", {
        email: userEmail,
        ...form,
      });
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
    <div className="container">
      <h1>Introductory Survey</h1>
      <form onSubmit={handleSubmit}>

        {/* Question 1 */}
        <label>1. How many hours do you sleep on average per night?</label>
        <div>
          <input type="radio" name="sleepHours" value="Less than 5" onChange={handleChange} required /> Less than 5
          <input type="radio" name="sleepHours" value="5–7" onChange={handleChange} /> 5–7
          <input type="radio" name="sleepHours" value="7–9" onChange={handleChange} /> 7–9
          <input type="radio" name="sleepHours" value="More than 9" onChange={handleChange} /> More than 9
        </div>

        {/* Question 2 */}
        <label>2. How many glasses of water do you drink daily?</label>
        <div>
          <input type="radio" name="waterIntake" value="Less than 4" onChange={handleChange} required /> Less than 4
          <input type="radio" name="waterIntake" value="4–7" onChange={handleChange} /> 4–7
          <input type="radio" name="waterIntake" value="8 or more" onChange={handleChange} /> 8 or more
        </div>

        {/* Question 3 */}
        <label>3. How often do you eat high-fat, fried, or fast food?</label>
        <div>
          <input type="radio" name="fastFoodFreq" value="Daily" onChange={handleChange} required /> Daily
          <input type="radio" name="fastFoodFreq" value="A few times a week" onChange={handleChange} /> A few times a week
          <input type="radio" name="fastFoodFreq" value="Rarely" onChange={handleChange} /> Rarely
          <input type="radio" name="fastFoodFreq" value="Never" onChange={handleChange} /> Never
        </div>

        {/* Question 4 */}
        <label>4. Do you eat fruits and vegetables daily?</label>
        <div>
          <input type="radio" name="eatsFruitsVeggies" value="Yes" onChange={handleChange} required /> Yes
          <input type="radio" name="eatsFruitsVeggies" value="No" onChange={handleChange} /> No
        </div>

        {/* Question 5 */}
        <label>5. How many steps do you walk per day on average?</label>
        <div>
          <input type="radio" name="stepsWalked" value="Less than 3000" onChange={handleChange} required /> Less than 3000
          <input type="radio" name="stepsWalked" value="3000–7000" onChange={handleChange} /> 3000–7000
          <input type="radio" name="stepsWalked" value="More than 7000" onChange={handleChange} /> More than 7000
        </div>

        {/* Question 6 */}
        <label>6. Do you exercise at least 3 times a week?</label>
        <div>
          <input type="radio" name="exercises" value="Yes" onChange={handleChange} required /> Yes
          <input type="radio" name="exercises" value="No" onChange={handleChange} /> No
        </div>

        {/* Question 7 */}
        <label>7. Do you often experience chest pain, shortness of breath, or dizziness?</label>
        <div>
          <input type="radio" name="symptoms" value="Yes" onChange={handleChange} required /> Yes
          <input type="radio" name="symptoms" value="No" onChange={handleChange} /> No
        </div>

        {/* Question 8 */}
        <label>8. Do you have a history of high blood pressure, diabetes, or heart disease?</label>
        <div>
          <input type="radio" name="healthHistory" value="Yes" onChange={handleChange} required /> Yes
          <input type="radio" name="healthHistory" value="No" onChange={handleChange} /> No
        </div>

        <br />
        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
}

export default IntroSurvey;
