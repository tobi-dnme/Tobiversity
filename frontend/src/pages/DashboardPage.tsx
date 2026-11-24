import { useAuth } from "../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import PlaceHolder from "./PlaceHolder";

function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.role === "admin") {
    return <PlaceHolder title="Manage Users" />;
  } else if (user.role === "teacher") {
    return <TeacherDashboard />;
  } else {
    return <StudentDashboard />;
  }
}

export default DashboardPage;