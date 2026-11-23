import type { Course } from "../types";
import MyCourseCard from "./MyCourseCard";
import "./comp-styles/MyCourseCard.css";

type MyCourseCardsProps = {
  courses: Course[];
};

function MyCourseCards({ courses }: MyCourseCardsProps) {
  if (courses.length === 0) {
    return <p>No courses yet.</p>;
  }

  return (
    <div className="my-course-cards">  
      {courses.map((course) => (
        <MyCourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          id={course.id}
        />
      ))}
    </div>
  );
}

export default MyCourseCards;