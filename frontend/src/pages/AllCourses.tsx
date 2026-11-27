import "./page-styles/AllCourses.css";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AllCourseCards from "../components/AllCourseCards";
import Confirmation from "../components/Confirmation";
import { useAuth } from "../context/AuthContext";
import { getCourses, getStudentCourses } from "../api/courses";
import { enrolInCourse, leaveCourse } from "../api/users";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";

function AllCourses() {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [joined, setJoined] = useState(false);
  const [changedTitle, setChangedTitle] = useState("");

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

  const myCourseIds = myCourses.map((course) => course.id);

  function getVisibleCourses() {
    let visible = courses;

    if (filter === "enrolled") {
      visible = visible.filter((course) => myCourseIds.includes(course.id));
    } else if (filter === "not-enrolled") {
      visible = visible.filter((course) => !myCourseIds.includes(course.id));
    }

    return visible;
  }

  function getFilterClass(name: string) {
    if (filter === name) {
      return "filter-button filter-active";
    } else {
      return "filter-button";
    }
  }

  async function handleEnrolClick(courseId: number) {
    if (!user || saving) {
      return;
    }

    const course = courses.find((item) => item.id === courseId);
    if (!course) {
      return;
    }

    const alreadyEnrolled = myCourseIds.includes(courseId);

    setSaving(true);
    setActionError("");

    try {
      if (alreadyEnrolled) {
        await leaveCourse(user.id, courseId);
      } else {
        await enrolInCourse(user.id, courseId);
      }

      const myCourseData = await getStudentCourses(user.id);
      setMyCourses(myCourseData);

      setJoined(!alreadyEnrolled);
      setChangedTitle(course.title);
      setShowConfirmation(true);
    } catch (err) {
      setActionError(getErrorMessage(err));
    }

    setSaving(false);
  }

  const isStudent = user?.role === "student";

  return (
    <div className="all-courses-page">
      <div className="all-courses-header">
        <h3>All Courses</h3>
        <SearchBar />
      </div>

      <div className="filter-buttons">
        {isStudent && (
          <button className={getFilterClass("all")} onClick={() => setFilter("all")}>
            All
          </button>
        )}

        {isStudent && (
          <button
            className={getFilterClass("enrolled")}
            onClick={() => setFilter("enrolled")}
          >
            Enrolled
          </button>
        )}

        {isStudent && (
          <button
            className={getFilterClass("not-enrolled")}
            onClick={() => setFilter("not-enrolled")}
          >
            Not enrolled
          </button>
        )}
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p className="error-message">{error}</p>}
      {actionError && <p className="error-message">{actionError}</p>}
      {!loading && !error && (
        <AllCourseCards
          courses={getVisibleCourses()}
          enrolledIds={myCourseIds}
          currentUser={user}
          onEnrolClick={handleEnrolClick}
        />
      )}

      {showConfirmation && (
        <Confirmation
          joined={joined}
          courseTitle={changedTitle}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

export default AllCourses;