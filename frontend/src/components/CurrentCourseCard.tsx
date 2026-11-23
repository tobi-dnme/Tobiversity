import { Link } from "react-router-dom";

type CurrentCourseCardProps = {
  title: string;
  id: number;
};

function TextLimit(text: string) {
  if (text.length > 20) {
    return text.slice(0, 20).trim() + "...";
  } else {
    return text;
  }
}

function CurrentCourseCard({ title, id }: CurrentCourseCardProps) {
  return (
    <Link to={"/courses/" + id + "/"} className="course-card">
      <div>
        <h4 className="course-card-title">{TextLimit(title)}</h4>
        <div className="course-card-image"></div>
      </div>
    </Link>
  );
}

export default CurrentCourseCard;