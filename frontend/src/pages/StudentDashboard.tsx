import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentCourses, getCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";

function StudentDashboard() {
  const { user } = useAuth();
  if (!user) {
    return null
  }

  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!user?.id) return;

  const userId = user.id;

  async function loadCourses() {
    try {
      const courseData = await getCourses();
      const myCourseData = await getStudentCourses(userId);
      setCourses(courseData);
      setMyCourses(myCourseData);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setLoading(false);
  }

  loadCourses();
}, [user?.id]);


  function countCourses(courseList: Course[]) {
    if (loading || error !== "") {
      return "...";
    } else {
      return String(courseList.length);
    }
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <WelcomeBanner user={String(user?.username)} />
      <StatCard label="Courses enrolled" value={countCourses(myCourses)} />
      <StatCard label="Courses available" value={countCourses(courses)} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default StudentDashboard;