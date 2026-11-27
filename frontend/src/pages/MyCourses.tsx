import "./page-styles/MyCourses.css";
import SearchBar from "../components/SearchBar";
import MyCourseCards from "../components/MyCourseCards";
import Confirmation from "../components/Confirmation";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getStudentCourses, getTeacherCourses } from "../api/courses";
import { leaveCourse } from "../api/users";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import { Link } from "react-router-dom";

function MyCourses() {
  const { user } = useAuth();

  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [changedTitle, setChangedTitle] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const userId = user.id;
    const role = user.role;

    async function loadCourses() {
      try {
        let courseData: Course[] = [];

        if (role === "teacher") {
          courseData = await getTeacherCourses(userId);
        } else {
          courseData = await getStudentCourses(userId);
        }

        setMyCourses(courseData);
      } catch (error) {
        setError(getErrorMessage(error));
      }
      setLoading(false);
    }

    loadCourses();
  }, [user?.id, user?.role]);

  async function handleLeaveClick(courseId: number) {
    if (!user || saving) {
      return;
    }

    const course = myCourses.find((item) => item.id === courseId);
    if (!course) {
      return;
    }

    setSaving(true);
    setActionError("");

    try {
      await leaveCourse(user.id, courseId);

      const myCourseData = await getStudentCourses(user.id);
      setMyCourses(myCourseData);

      setChangedTitle(course.title);
      setShowConfirmation(true);
    } catch (err) {
      setActionError(getErrorMessage(err));
    }

    setSaving(false);
  }

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  let sectionTitle = "My Enrolled Courses";
  let linkPath = "/courses";
  let linkText = "Enrol in a new course.";
  if (isTeacher) {
    sectionTitle = "Courses I Teach";
    linkPath = "/courses/new";
    linkText = "Add a new course.";
  }

  return (
    <div className="my-courses-page">
      <div className="my-courses-header">
        <h3>My Courses</h3>
        <SearchBar />
      </div>

      <br></br>

      <h3 className="section-title">{sectionTitle}</h3>
      {loading && <p>Loading courses...</p>}
      {error && <p className="error-message">{error}</p>}
      {actionError && <p className="error-message">{actionError}</p>}
      {!loading && !error && (
        <MyCourseCards
          courses={myCourses}
          canLeave={isStudent}
          onLeaveClick={handleLeaveClick}
        />
      )}

      <br></br>
      <br></br>

      <Link to={linkPath} className="enrol-link">
        <div className="enrol">
          <p>+</p>
          <p>{linkText}</p>
        </div>
      </Link>

      {showConfirmation && (
        <Confirmation
          joined={false}
          courseTitle={changedTitle}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

export default MyCourses;