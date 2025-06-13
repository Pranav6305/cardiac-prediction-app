// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Welcome from "./Welcome";
import IntroSurvey from "./IntroSurvey";

// Wrapper component to pass email from route state
const IntroSurveyWrapper = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "";
  return <IntroSurvey userEmail={userEmail} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/survey" element={<IntroSurveyWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
