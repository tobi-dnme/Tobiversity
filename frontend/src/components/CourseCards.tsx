import CourseCard from "./CourseCard";
import type { Course } from "../types";
import "./comp-styles/CourseCards.css";

type CourseCardsProps = {
  courses: Course[];
};

function CourseCards({ courses }: CourseCardsProps) {
  if (courses.length === 0) {
    return <p>No courses yet.</p>;
  }

  return (
    <div className="course-cards">
      {courses.map((course) => (
        <CourseCard 
          key={course.id} 
          course={course} />
      ))}
    </div>
  );
}

export default CourseCards;