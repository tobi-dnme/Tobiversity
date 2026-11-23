import "./page-styles/AllCourses.css";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AllCourseCards from "../components/AllCourseCards";
import { useAuth } from "../context/AuthContext";
import { getCourses, getStudentCourses } from "../api/courses";
import { getErrorMessage } from "../api/errors";
import type { Course } from "../types";

function AllCourses() {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("all");
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

  return (
    <div className="all-courses-page">
      <div className="all-courses-header">
        <h3>All Courses</h3>
        <SearchBar />
      </div>

      <div className="filter-buttons">
        <button className={getFilterClass("all")} onClick={() => setFilter("all")}>
          All
        </button>

        <button className={getFilterClass("enrolled")} onClick={() => setFilter("enrolled")}>
          Enrolled
        </button>
        
        <button className={getFilterClass("not-enrolled")}onClick={() => setFilter("not-enrolled")}>
          Not enrolled
        </button>
      </div>



      {loading && <p>Loading courses...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <AllCourseCards courses={getVisibleCourses()} enrolledIds={myCourseIds} />
      )}
    </div>
  );
}

export default AllCourses;