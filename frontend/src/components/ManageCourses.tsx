import type { Course } from "../types";
import ManageCourse from "./ManageCourse";
import "./comp-styles/ManageCourses.css";

type ManageCoursesProps = {
  courses: Course[];
};

function ManageCourses({ courses }: ManageCoursesProps) {
  if (courses.length === 0) {
    return <p>You have not added any courses yet.</p>;
  }

  return (
    <div>
      <table className="manage-table">
        <thead>
          <tr>
            <th className="table-heading">Title</th>
            <th className="table-heading">Date Added</th>
            <th className="table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <ManageCourse
              key={course.id}
              id={course.id}
              title={course.title}
              dateAdded={course.date_added}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCourses;