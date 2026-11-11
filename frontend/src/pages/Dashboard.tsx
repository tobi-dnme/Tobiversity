import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TempDashboard() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {(user.role.charAt(0).toUpperCase()) + (user.role.slice(1).toLowerCase())}! You are logged in as {user.username}.</p>
      <button className="primary-button" onClick={signOut}>Log out</button>
    </div>
  );
}

export default TempDashboard;
