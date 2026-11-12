import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

function TempDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {(user.role.charAt(0).toUpperCase()) + (user.role.slice(1).toLowerCase())}! You are logged in as {user.username}.</p>
      <Sidebar />
    </div>
  );
}

export default TempDashboard;
