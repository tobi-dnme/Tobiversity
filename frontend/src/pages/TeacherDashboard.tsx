import "./page-styles/TeacherDashboard.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTeacherCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import WelcomeBanner from "../components/WelcomeBanner";
import CurrentCourseCards from "../components/CurrentCourseCards";
import ManageCourses from "../components/ManageCourses";
import SearchBar from "../components/SearchBar";
import ProfileSection from "../components/ProfileSection";

function TeacherDashboard() {
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

  function getRecentCourses(courseList: Course[]) { {/* Adapted from Medium article 'How to Sort an Object Array by Date in JavaScript' by Tari Ibaba. */}
    const newestFirst = [...courseList].sort((a, b) => {
      return Math.abs(new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
    });
    return newestFirst.slice(0, 3);
  }

  function getCardCourses() {
    return getRecentCourses(courses).slice(0, 4);
  }

  function getTableCourses() {
    return getRecentCourses(courses).slice(0, 5);
  }

  if (!user) {
    return null;
  }

  return (
    <div className="main">
      <div>
        <div className="dashboard-header">
            <h3>Dashboard</h3>
            <SearchBar />
        </div>
      <WelcomeBanner user={user.username} />
      {error && <p className="error-message">{error}</p>}

      <div className="running-section">
        <div className="section-header">
          <h2 className="section-title">Courses I Teach</h2>
          <Link className="view-all-link" to="/my-courses">
            View All
          </Link>
        </div>
        {loading && <p>Loading courses...</p>}
        {!loading && !error && <CurrentCourseCards courses={getCardCourses()} />}
      </div>

      <div className="manage-section">
        <div className="section-header">
          <h2 className="section-title">Manage Courses</h2>
          <button className="new-course-button" onClick={() => navigate("/courses/new")}>
            + New Course
          </button>
        </div>
        {!loading && !error && (
          <ManageCourses courses={getTableCourses()} />
        )}
      </div>  
    </div>

    <div className="profile">
        <ProfileSection />
    </div>

    </div>
  );
}

export default TeacherDashboard;