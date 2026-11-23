import type { Course } from "../types";
import AllCourseCard from "./AllCourseCard";
import "./comp-styles/AllCourseCards.css";

type AllCourseCardsProps = {
  courses: Course[];
  enrolledIds: number[];
};

function AllCourseCards({ courses, enrolledIds }: AllCourseCardsProps) {
  if (courses.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <div className="all-course-cards">
      {courses.map((course) => (
        <AllCourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          enrolled={enrolledIds.includes(course.id)}
          id={course.id}
        />
      ))}
    </div>
  );
}

export default AllCourseCards;