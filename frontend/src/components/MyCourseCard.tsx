import { Link } from "react-router-dom";

type MyCourseCardProps = {
  title: string;
  description: string;
  id: number;
  canLeave: boolean;
  onLeaveClick: (courseId: number) => void;
};

function TextLimit(text: string, limit: number) {
  if (text.length > limit) {
    return text.slice(0, limit).trim() + "...";
  } else {
    return text;
  }
}

function MyCourseCard({
  title,
  description,
  id,
  canLeave,
  onLeaveClick,
}: MyCourseCardProps) {
  return (
    <div className="my-course-card">
      <div className="my-course-card-image"></div>
      <h4 className="my-course-card-title">{TextLimit(title, 40)}</h4>
      <p className="my-course-card-description">{TextLimit(description, 90)}</p>
      <div className="enrol-buttons">
        <Link to={"/courses/" + id + "/"}>
          <button className="open-button">Open</button>
        </Link>
        {canLeave && (
          <button className="unenroll-button" onClick={() => onLeaveClick(id)}>
            Leave
          </button>
        )}
      </div>
    </div>
  );
}

export default MyCourseCard;