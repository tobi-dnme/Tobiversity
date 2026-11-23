import CurrentCourseCard from "./CurrentCourseCard";
import type { Course } from "../types";
import "./comp-styles/CurrentCourseCards.css";

type CurrentCourseCardsProps = {
  courses: Course[];
};

function CurrentCourseCards({ courses }: CurrentCourseCardsProps) {
  if (courses.length === 0) {
    return <p>No courses yet.</p>;
  }

  return (
    <div className="course-cards">
      {courses.map((course) => (
        <CurrentCourseCard 
          key={course.id} 
          title={course.title}
          id={course.id} />
      ))}
    </div>
  );
}

export default CurrentCourseCards;