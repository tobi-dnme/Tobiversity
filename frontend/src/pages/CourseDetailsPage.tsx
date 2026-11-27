import "./page-styles/CourseDetailsPage.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { getCourse, getStudentCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";
import { enrolInCourse, leaveCourse } from "../api/users";
import Confirmation from "../components/Confirmation";

function CourseDetailsPage() {
  const { user } = useAuth();
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!user?.id || !id) return;

    const courseId = Number(id);
    const userId = user.id;

    async function loadCourse() {
      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData);

        const myCourseData = await getStudentCourses(userId);
        const myCourseIds = myCourseData.map((myCourse) => myCourse.id);
        setEnrolled(myCourseIds.includes(courseId));

      } catch (error) {
        setError(getErrorMessage(error));
      }
      setLoading(false);
    }

    loadCourse();
  }, [user?.id, id]);

  if (loading) {
    return <p>Loading course...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!course || !user) {
    return <p>Course not found.</p>;
  }

  const addedOn = new Date(course.date_added).toLocaleDateString();
  const isStudent = user.role === "student";

  let canManage = false;
  if (user.role === "admin") {
    canManage = true;
  } else if (user.role === "teacher" && course.teacher === user.id) {
    canManage = true;
  }

  async function handleEnrolClick() {
    if (!user || !course) {
      return;
    }

    setSaving(true);
    setActionError("");

    try {
      if (enrolled) {
        await leaveCourse(user.id, course.id);
        setEnrolled(false);
      } else {
        await enrolInCourse(user.id, course.id);
        setEnrolled(true);
      }
      setShowConfirmation(true);
    } catch (error) {
      setActionError(getErrorMessage(error));
    }

    setSaving(false);
  }

 
  return (
    <div className="course-details-page">
      <div className="course-details-header">
        <h3>Course Details</h3>
        <SearchBar />
      </div>

      <Link className="back-link" to="/courses">
        <p>&lt; Back to All Courses</p>
      </Link>

      <div className="course-details-banner">
        <h1 className="course-details-title">{course.title}</h1>
      </div>
      

      <div className="course-details-data">
        <span>Added {addedOn}</span>
        {isStudent && enrolled && <span className="status">Enrolled</span>}
        {isStudent && !enrolled && <span className="status">Not enrolled</span>}
      </div>

      <div className="course-details-columns">
        <div className="course-details-main">
          <h3 className="course-details-heading">About this course</h3>
          <p className="course-details-description">{course.description}</p>
        </div>


        <div className="course-details-side">
          {
          isStudent && enrolled &&
          <div className="enrol-panel">
            <h4 className="panel-title">You are enrolled</h4>
              <p className="panel-text">You can find this course in My Courses.</p>
              <button className="enrol-now-button" onClick={handleEnrolClick}>{saving ? "Saving..." : "Leave course"}</button>
              <p className="panel-note">Students can leave at any time.</p>
          </div>
        }

        {
          isStudent && !enrolled &&
          <div className="enrol-panel">
            <h4 className="panel-title">Enrol in this course</h4>
              <p className="panel-text">You are not enrolled yet.</p>
              <button className="enrol-now-button" onClick={handleEnrolClick}>{saving ? "Saving..." : "Enrol now"}</button>
              <p className="panel-note">Students can leave at any time.</p>
          </div>
        }

        {
          user.role == "teacher" && course.teacher !== user.id &&
            <div className="enrol-panel">
              <h4 className="panel-title">You can not manage this course</h4>
              <div className="manage-buttons">
                <button className="manage-button" disabled>Edit</button>
                <button className="manage-button" disabled>Delete</button>
              </div>
            </div>
        }

        {
          canManage && 
            <div className="enrol-panel">
              <h4 className="panel-title">Manage this course</h4>
              <div className="manage-buttons">
                <button className="manage-button">Edit</button>
                <button className="manage-button">Delete</button>
              </div>
            </div>
        }

        {actionError && <p className="error-message">{actionError}</p>}

        {showConfirmation && (
        <Confirmation
          joined={enrolled}
          courseTitle={course.title}
          onClose={() => setShowConfirmation(false)}
        />
      )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;