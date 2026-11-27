import { Link } from "react-router-dom";

type AllCourseCardProps = {
  title: string;
  description: string;
  enrolled: boolean;
  canManage: boolean;
  id: number;
  onEnrolClick: (courseId: number) => void;
};

function TextLimit(text: string, limit: number) {
  if (text.length > limit) {
    return text.slice(0, limit).trim() + "...";
  } else {
    return text;
  }
}

function AllCourseCard({ title, description, enrolled, id, canManage, onEnrolClick,
                         }: AllCourseCardProps) {
  return (
    <div className="all-course-card">
      <div className="all-course-card-image">
        {!canManage && enrolled && <span className="enrolled-badge">Enrolled</span>}
      </div>
      <h4 className="all-course-card-title">{TextLimit(title, 40)}</h4>
      <p className="all-course-card-description">{TextLimit(description, 90)}</p>
      <div className="enrol-buttons">
        <Link to={"/courses/" + id + "/"}>
          <button className="open-button">View</button>
        </Link>
        {!canManage && enrolled && (
          <button className="unenroll-button" onClick={() => onEnrolClick(id)}>
            Leave
          </button>
        )}
        {!canManage && !enrolled && (
          <button className="all-enrol-button" onClick={() => onEnrolClick(id)}>
            Enrol
          </button>
        )}
      </div>
    </div>
  );
}

export default AllCourseCard;