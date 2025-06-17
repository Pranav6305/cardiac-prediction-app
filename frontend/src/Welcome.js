import React, { useState } from "react";

const HeartWiseDashboard = () => {
  const [userData] = useState({
    name: localStorage.getItem("userName"),
    dailyStats: {
      steps: { current: 8500, goal: 10000, label: "Daily activity goal" },
      sleep: {
        current: 7.2,
        goal: 8,
        label: "Last night's sleep",
        unit: "hours",
      },
      water: {
        current: 2.5,
        goal: 3,
        label: "Today's hydration",
        unit: "liters",
      },
      calories: {
        current: 650,
        goal: 800,
        label: "Estimated daily burn",
        unit: "kcal",
      },
    },
    trends: {
      steps: [6000, 7500, 6500, 8500, 7800, 7200, 8500],
      sleep: [7.5, 7.8, 8.1, 7.9, 8.2, 7.6, 7.2],
    },
    heartRisk: 18,
    notifications: [
      {
        type: "meal",
        message: "Time to log your lunch!",
        time: "12:30 PM",
        action: "Log Meal",
      },
      {
        type: "activity",
        message: "Go for a 30-minute walk today.",
        time: "2:00 PM",
        action: "View Exercises",
      },
      {
        type: "sleep",
        message: "Sleep Goal Update",
        time: "8:00 AM",
        action: null,
      },
    ],
  });

  // Icon components using CSS
  const IconHome = () => <span className="icon-home">🏠</span>;
  const IconUser = () => <span className="icon-user">👤</span>;
  const IconBell = () => <span className="icon-bell">🔔</span>;
  const IconFootprints = () => <span className="icon-steps">👣</span>;
  const IconMoon = () => <span className="icon-moon">🌙</span>;
  const IconDroplets = () => <span className="icon-water">💧</span>;
  const IconFlame = () => <span className="icon-flame">🔥</span>;
  const IconTrending = () => <span className="icon-trending">📈</span>;

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const StepsChart = ({ data }) => {
    const maxSteps = Math.max(...data);
    const days = [
      "Jul 1",
      "Jul 2",
      "Jul 3",
      "Jul 4",
      "Jul 5",
      "Jul 6",
      "Jul 7",
    ];

    return (
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((steps, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{ height: `${(steps / maxSteps) * 100}%` }}
              ></div>
              <span className="bar-label">{days[index]}</span>
            </div>
          ))}
        </div>
        <div className="chart-y-axis">
          <span>10000</span>
          <span>7500</span>
          <span>5000</span>
          <span>2500</span>
          <span>0</span>
        </div>
      </div>
    );
  };

  const SleepChart = ({ data }) => {
    const days = [
      "Jul 1",
      "Jul 2",
      "Jul 3",
      "Jul 4",
      "Jul 5",
      "Jul 6",
      "Jul 7",
    ];

    return (
      <div className="sleep-chart">
        <svg viewBox="0 0 300 100" className="sleep-line-chart">
          <polyline
            points={data
              .map((sleep, index) => `${index * 45 + 20},${80 - sleep * 8}`)
              .join(" ")}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2"
          />
        </svg>
        <div className="sleep-chart-labels">
          {days.map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        <div className="sleep-y-axis">
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>
      </div>
    );
  };

  return (
    <div className="heartwise-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-item active">
            <IconHome />
            <span>Home</span>
          </div>
        </div>
        <div className="nav-center">
          <h1 className="app-title">HeartWise</h1>
          <div className="nav-tabs">
            <span className="nav-tab active">Home</span>
            <span className="nav-tab">Food Update</span>
            <span className="nav-tab">Health Insights</span>
          </div>
        </div>
        <div className="nav-right">
          <IconUser />
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-item">
          <IconDroplets />
          <span>Food Update</span>
        </div>
        <div className="sidebar-item">
          <IconTrending />
          <span>Health Insights</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar"></div>
          <span className="user-name">{userData.name}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, {userData.name}!</h2>
          <p>Here's your health overview for today.</p>
          <div className="action-buttons">
            <button className="btn btn-primary">Log Meal</button>
            <button className="btn btn-secondary">Check Your Risk</button>
          </div>
        </div>

        {/* Daily Summary */}
        <section className="daily-summary">
          <h3>Daily Summary</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="card-icon">
                <IconFootprints />
              </div>
              <div className="card-content">
                <h4>Steps Taken</h4>
                <div className="metric">
                  <span className="value">
                    {userData.dailyStats.steps.current}
                  </span>
                  <span className="unit">steps</span>
                </div>
                <p className="label">{userData.dailyStats.steps.label}</p>
                <p className="goal">
                  Goal: {userData.dailyStats.steps.goal} steps
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill steps"
                    style={{
                      width: `${getProgressPercentage(
                        userData.dailyStats.steps.current,
                        userData.dailyStats.steps.goal
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <IconMoon />
              </div>
              <div className="card-content">
                <h4>Sleep Duration</h4>
                <div className="metric">
                  <span className="value">
                    {userData.dailyStats.sleep.current}
                  </span>
                  <span className="unit">hours</span>
                </div>
                <p className="label">{userData.dailyStats.sleep.label}</p>
                <p className="goal">
                  Goal: {userData.dailyStats.sleep.goal} hours
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill sleep"
                    style={{
                      width: `${getProgressPercentage(
                        userData.dailyStats.sleep.current,
                        userData.dailyStats.sleep.goal
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <IconDroplets />
              </div>
              <div className="card-content">
                <h4>Water Intake</h4>
                <div className="metric">
                  <span className="value">
                    {userData.dailyStats.water.current}
                  </span>
                  <span className="unit">liters</span>
                </div>
                <p className="label">{userData.dailyStats.water.label}</p>
                <p className="goal">
                  Goal: {userData.dailyStats.water.goal} liters
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill water"
                    style={{
                      width: `${getProgressPercentage(
                        userData.dailyStats.water.current,
                        userData.dailyStats.water.goal
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <IconFlame />
              </div>
              <div className="card-content">
                <h4>Calories Burned</h4>
                <div className="metric">
                  <span className="value">
                    {userData.dailyStats.calories.current}
                  </span>
                  <span className="unit">kcal</span>
                </div>
                <p className="label">{userData.dailyStats.calories.label}</p>
                <p className="goal">
                  Goal: {userData.dailyStats.calories.goal} kcal
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill calories"
                    style={{
                      width: `${getProgressPercentage(
                        userData.dailyStats.calories.current,
                        userData.dailyStats.calories.goal
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Trends */}
        <section className="health-trends">
          <h3>Health Trends (Past 7 Days)</h3>
          <div className="trends-grid">
            <div className="trend-card">
              <h4>Steps Trend</h4>
              <StepsChart data={userData.trends.steps} />
              <p className="trend-description">
                Daily steps over the last week.
              </p>
            </div>
            <div className="trend-card">
              <h4>Sleep Trend</h4>
              <SleepChart data={userData.trends.sleep} />
              <p className="trend-description">Average sleep duration trend.</p>
            </div>
          </div>
        </section>

        {/* Right Panel Content */}
        <aside className="right-panel">
          {/* Notifications */}
          <section className="notifications">
            <h3>Notifications</h3>
            {userData.notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <div className="notification-icon">
                  <IconBell />
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <span className="notification-type">
                      {notification.type === "meal"
                        ? "Meal Reminder"
                        : notification.type === "activity"
                        ? "Activity Suggestion"
                        : "Sleep Goal Update"}
                    </span>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  {notification.action && (
                    <button className="notification-action">
                      {notification.action}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Health Insights */}
          <section className="health-insights">
            <h3>Your Health Insights</h3>
            <div className="risk-card">
              <h4>
                Heart Disease Risk:{" "}
                <span className="risk-percentage">{userData.heartRisk}%</span>
              </h4>
              <p className="risk-description">
                Your current risk is moderate. Continue focusing on regular
                exercise and balanced meals. Consider checking your blood
                pressure regularly.
              </p>
              <button className="view-insights-btn">View Full Insights</button>
            </div>
          </section>

          {/* Health Resources */}
          <section className="health-resources">
            <h3>Explore Heart Health Resources</h3>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-image fruits"></div>
                <h5>The Power of Plant-Based Diets</h5>
                <p>
                  Learn how going green can significantly benefit your heart
                  health.
                </p>
              </div>
              <div className="resource-card">
                <div className="resource-image exercise"></div>
                <h5>Simple Exercises for a Stronger Heart</h5>
                <p>
                  Easy routines you can do at home to improve cardiovascular
                  fitness.
                </p>
              </div>
              <div className="resource-card">
                <div className="resource-image lab"></div>
                <h5>Understanding Your Cholesterol Levels</h5>
                <p>
                  A guide to interpreting your lipid profile and what the
                  numbers mean.
                </p>
              </div>
              <div className="resource-card">
                <div className="resource-image meditation"></div>
                <h5>Managing Stress for Heart Health</h5>
                <p>
                  Effective techniques to reduce stress and protect your
                  cardiovascular system.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default HeartWiseDashboard;
