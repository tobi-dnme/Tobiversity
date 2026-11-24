import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTeacherCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import StatCard from "./StatCard";

function TeacherPanelStats() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const userId = user.id;

    async function loadCourses() {
      try {
        const courseData = await getTeacherCourses(userId);
        setCourses(courseData);
      } catch (error) {
        setError(getErrorMessage(error));
      }
      setLoading(false);
    }

    loadCourses();
  }, [user?.id]);

  function countCourses() {
    if (loading || error !== "") {
      return "...";
    } else {
      return String(courses.length);
    }
  }

  function countAddedThisMonth() {
    if (loading || error !== "") {
      return "...";
    }

    const thisMonth = new Date().toISOString().slice(3, 5);
    const addedThisMonth = courses.filter(
      (course) => course.date_added.slice(3, 5) === thisMonth
    );
    return String(addedThisMonth.length);
  }

  return (
    <div className="teacher-stats">
      <StatCard label="Courses taught" value={countCourses()} />
      <StatCard label="Added this month" value={countAddedThisMonth()} />

      <br></br>
      <br></br>

      <h3 className="quick-actions-title">Quick Actions</h3>
      <button
        className="quick-new-button"
        onClick={() => navigate("/courses/new")}
      >
        + New Course
      </button>
      <button
        className="quick-browse-button"
        onClick={() => navigate("/courses")}
      >
        Browse All Courses
      </button>
    </div>
  );
}

export default TeacherPanelStats;