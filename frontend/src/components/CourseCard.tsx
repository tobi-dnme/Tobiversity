import type { Course } from "../types";

type CourseCardProps = {
  course: Course;
};

function TextLimit(text: string) {
  if (text.length > 20) {
    return text.slice(0, 20).trim() + "...";
  } else {
    return text;
  }
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="course-card">
      <h4 className="course-card-title">{TextLimit(course.title)}</h4>
      <div className="course-card-image"></div>
    </div>
  );
}

export default CourseCard;