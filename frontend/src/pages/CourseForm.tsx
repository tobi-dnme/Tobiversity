import "./page-styles/CourseForm.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { createCourse } from "../api/courses";
import { getUsers } from "../api/users";
import { getErrorMessage } from "../api/errors";
import type { Course, User } from "../types";

function CourseForm() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<User[]>([]);
  const [savedCourse, setSavedCourse] = useState<Course | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin") 
        return;

    async function loadTeachers() {
      try {
        const users = await getUsers();
        setTeachers(users.filter((user) => user.role === "teacher"));
      } catch (error) {
        setError(getErrorMessage(error));
      }
    }

    loadTeachers();
  }, [user?.role]);

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";

  async function handleSave() {
    setError("");
    setSavedCourse(null);

    if (title.trim() === "") {
      setError("Please enter a course title.");
      return;
    }

    if (description.trim() === "") {
      setError("Please enter a description.");
      return;
    }

    if (isAdmin && teacherId === "") {
      setError("Please choose a teacher.");
      return;
    }

    setSaving(true);

    try {
      let ownerId: number | null = null;
      if (isAdmin) {
        ownerId = Number(teacherId);
      }

      const newCourse = await createCourse(
        title.trim(),
        description.trim(),
        ownerId
      );

      setSavedCourse(newCourse);
      setTitle("");
      setDescription("");
      setTeacherId("");
    } catch (error) {
      setError(getErrorMessage(error));
    }

    setSaving(false);
  }

  function TextLimit(text: string, limit: number) {
  if (text.length > limit) {
    return text.slice(0, limit).trim() + "...";
  } else {
    return text;
  }
}

  let previewTitle = "Course title appears here";
  if (title.trim() !== "") {
    previewTitle = TextLimit(title, 40);
  }

  let previewDescription = "Short description preview...";
  if (description.trim() !== "") {
    previewDescription = TextLimit(description, 90);
  }

  return (
    <div className="course-form-page">
      <div className="course-form-header">
        <h3>New Course</h3>
        <SearchBar />
      </div>

      <div className="course-form-columns">
        <div className="course-form-main">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <label className="form-label" htmlFor="title">
              Course Title
            </label>
            <input
              className="form-input"
              id="title"
              type="text"
              placeholder="Name of your course."
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-input form-textarea"
              id="description"
              placeholder="What will students learn?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {isAdmin && (
              <div>
                <div className="teacher-row-header">
                  <label className="form-label" htmlFor="teacher">
                    Assign Teacher
                  </label>
                  <span className="admin-note">Admins only</span>
                </div>
                <select
                  className="form-input"
                  id="teacher"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isTeacher && (
              <p className="form-note">
                Teachers are assigned automatically as the course owner.
              </p>
            )}

            {error && <p className="error-message">{error}</p>}
            {savedCourse && (
              <p className="success-message">
                Course saved!{" "}
                <Link to={"/courses/" + savedCourse.id} className="view-link">
                  View {savedCourse.title}
                </Link>
              </p>
            )}

            <div className="form-buttons">
              <Link className="cancel-link" to="/courses">
                Cancel
              </Link>
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Course"}
              </button>
            </div>
          </form>
        </div>

        <div className="course-form-side">
          <h3 className="preview-title">Live Preview</h3>
          <div className="all-course-card-image"></div>
          <h4 className="all-course-card-title">{previewTitle}</h4>
          <p className="all-course-card-description">{previewDescription}</p>
          <p className="preview-note">
            This is how your course will look in the course catalogue.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;