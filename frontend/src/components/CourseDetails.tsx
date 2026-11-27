import type { Course } from "../types";
import CourseDetail from "./CourseDetail";
import "./comp-styles/CourseDetails.css";

type CourseDetailsProps = {
  courses: Course[];
  enrolledIds: Number[];
  onEnrolClick: (courseId: number) => void;
};

function CourseDetails({ courses, enrolledIds, onEnrolClick }: CourseDetailsProps) {
  if (courses.length === 0) {
    return <p>No courses yet.</p>;
  }


  return (
    <div className="course-details"> {/* Adapted from 'React.js Lists and Keys: From Basics to Advanced' by JavaScript-World */}
      {courses.map((course) => (
        <CourseDetail
          id={course.id}
          key={course.id}
          title={course.title}
          dateAdded={course.date_added}
          description={course.description}
          enrolled={enrolledIds.includes(course.id)} 
          onEnrolClick= {onEnrolClick}
        />
      ))}
    </div>
  );
}

export default CourseDetails;