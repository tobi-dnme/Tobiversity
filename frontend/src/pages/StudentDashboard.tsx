import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentCourses, getCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import CourseDetails from "../components/CourseDetails";
import { Link } from "react-router-dom";
import "./page-styles/StudentDashboard.css";
import SearchBar from "../components/SearchBar";
import CurrentCourseCards from "../components/CurrentCourseCards";
import ProfileSection from "../components/ProfileSection";

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

  function getRecentCourses(courseList: Course[]) { {/* Adapted from Medium article 'How to Sort an Object Array by Date in JavaScript' by Tari Ibaba. */}
    const newestFirst = [...courseList].sort((a, b) => {
      return Math.abs(new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
    });
    return newestFirst.slice(0, 3);
  }

    return (
      <div className="student-dashboard">
        <div className="main-content">
          <div className="dashboard-header">
            <h3>Dashboard</h3>
            <SearchBar />
          </div>

          <WelcomeBanner user={String(user.username)} />
          {error && <p className="error-message">{error}</p>}
      
          <div className="current-courses">
            <div className="section-header">
              <h3 className="section-title">Currently Running Courses</h3>
              <Link className="view-all-link" to="/my-courses">View All</Link>
            </div>
            {loading && <p>Loading courses...</p>}
            {!loading && !error && <CurrentCourseCards courses={getRecentCourses(myCourses)} />}
          </div>

          <div className="dashboard-columns">
            <div className="recent-column">
              <div className="section-header">
                <h3 className="section-title">Recently Added Courses</h3>
                <Link className="view-all-link" to="/courses">View All</Link>
              </div>
              {loading && <p>Loading courses...</p>}
              {!loading && !error && <CourseDetails courses={getRecentCourses(courses)} />}
            </div>

            <div className="glance-column">
              <p className="section-title stat-tile-header">At a Glance</p>
              <StatCard label="Courses enrolled" value={countCourses(myCourses)} />
              <StatCard label="Courses available" value={countCourses(courses)} />
            </div>
          </div>
        </div>

        <div className="profile">
          <ProfileSection />
        </div>
    </div>
  );
}

export default StudentDashboard;