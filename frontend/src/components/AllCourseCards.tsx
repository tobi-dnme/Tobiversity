import type { Course } from "../types";
import type { AuthUser } from "../context/AuthContext"
import AllCourseCard from "./AllCourseCard";
import "./comp-styles/AllCourseCards.css";

type AllCourseCardsProps = {
  courses: Course[];
  enrolledIds: number[];
  currentUser: AuthUser | null;
  onEnrolClick: (courseId: number) => void;
};

function AllCourseCards({ courses, enrolledIds, currentUser, onEnrolClick }: AllCourseCardsProps) {
  if (courses.length === 0) {
    return <p>No courses found.</p>;
  }

  const canManage = currentUser?.role === "teacher" || currentUser?.role === "admin";

  return (
    <div className="all-course-cards">
      {courses.map((course) => (
        <AllCourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          enrolled={enrolledIds.includes(course.id)}
          id={course.id}
          canManage= {canManage}
          onEnrolClick = {onEnrolClick}
        />
      ))}
    </div>
  );
}

export default AllCourseCards;