import React from "react";
import { useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="container">
      <h1>Welcome, {user?.name || "User"}!</h1>
      <p>Email: {user?.email}</p>
      <p>Age: {user?.age}</p>
      <p>Gender: {user?.gender}</p>
    </div>
  );
}

export default Welcome;
