import { Link } from "react-router-dom";

type ManageCourseProps = {
  id: number;
  title: string;
  dateAdded: string;
};

function ManageCourse({ id, title, dateAdded }: ManageCourseProps) {
  const addedOn = new Date(dateAdded).toLocaleDateString("en-GB");

  return (
    <tr>
      <td className="table-cell">
        <Link className="course-link" to={"/courses/" + id}>
          {title}
        </Link>
      </td>
      <td className="table-cell">{addedOn}</td>
      <td className="table-cell">
        <button className="row-button">Edit</button>
        <button className="row-button">Delete</button>
      </td>
    </tr>
  );
}

export default ManageCourse;