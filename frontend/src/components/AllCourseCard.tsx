type AllCourseCardProps = {
  title: string;
  description: string;
  enrolled: boolean;
};

function TextLimit(text: string, limit: number) {
  if (text.length > limit) {
    return text.slice(0, limit).trim() + "...";
  } else {
    return text;
  }
}

function AllCourseCard({ title, description, enrolled }: AllCourseCardProps) {
  return (
    <div className="all-course-card">
      <div className="all-course-card-image">
        {enrolled && <span className="enrolled-badge">Enrolled</span>}
      </div>
      <h4 className="all-course-card-title">{TextLimit(title, 40)}</h4>
      <p className="all-course-card-description">{TextLimit(description, 90)}</p>
      <div className="enrol-buttons">
        <button className="open-button">View</button>
        {enrolled && <button className="unenroll-button">Leave</button>}
        {!enrolled && <button className="all-enrol-button">Enrol</button>}
      </div>
    </div>
  );
}

export default AllCourseCard;