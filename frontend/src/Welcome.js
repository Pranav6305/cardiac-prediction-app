import React from "react";
import "./App.css";

function Welcome() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Health Monitoring Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card food-log">
          <h2>Food Log</h2>
          <div className="placeholder">Data will appear here</div>
        </div>

        <div className="dashboard-card sleep-log">
          <h2>Sleep Log</h2>
          <div className="placeholder">Data will appear here</div>
        </div>

        <div className="dashboard-card steps-log">
          <h2>Steps Log</h2>
          <div className="placeholder">Data will appear here</div>
        </div>

        <div className="dashboard-card risk-score">
          <h2>Risk Score</h2>
          <div className="placeholder">Data will appear here</div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
