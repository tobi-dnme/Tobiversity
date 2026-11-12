import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import "./page-styles/Dashboard.css"; 

function TempDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
  <div className="dashboard-layout">
    <Sidebar />

    <main className="dashboard-content">
      <h3>Dashboard</h3>
      <p>
        Welcome {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}! You are logged in as {user.username}.
      </p>
      <WelcomeBanner user={user.username} />
    </main>
  </div>
);

}

export default TempDashboard;
