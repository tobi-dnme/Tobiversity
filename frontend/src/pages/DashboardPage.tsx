import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import WelcomeBanner from "../components/WelcomeBanner"; 

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const role = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();

  return (
  <main >
      <h3>Dashboard</h3>
      <WelcomeBanner user={user?.username} />
      <p>
        Welcome {role}! You are logged in as {user.username}.
      </p>

    </main>
);

}

export default DashboardPage;
