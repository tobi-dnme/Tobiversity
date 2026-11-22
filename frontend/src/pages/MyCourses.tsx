import "./page-styles/MyCourses.css";
import SearchBar from "../components/SearchBar";
import MyCourseCards from "../components/MyCourseCards";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getStudentCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types"

function MyCourses() {
  const { user } = useAuth();
  if (!user) {
    return null
  }

  const [myCourses, setMyCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!user?.id) return;

  const userId = user.id;

  async function loadCourses() {
    try {
      const myCourseData = await getStudentCourses(userId);

      setMyCourses(myCourseData);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setLoading(false);
  }

  loadCourses();
}, [user?.id]);

  return (
    <div className="my-courses-page">
      <div className="my-courses-header">
        <h3>My Courses</h3>
        <SearchBar />
      </div>

      <br></br>

      <h3 className="section-title">My Enrolled Courses</h3>
      {loading && <p>Loading courses...</p>}
      {!loading && !error && <MyCourseCards courses={myCourses} />}

      <br></br><br></br>

      <div className="enrol">
        <p>+</p>
        <p>Enrol in a new course.</p>
      </div>
    </div>
  );
}

export default MyCourses;