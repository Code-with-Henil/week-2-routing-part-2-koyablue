import { useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
