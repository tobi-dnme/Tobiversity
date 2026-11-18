type CourseDetailProps = {
  title: string;
  dateAdded: string;
  description: string;
};

function TextLimit(text: string) {
  if (text.length > 50) {
    return text.slice(0, 50).trim() + "...";
  } else {
    return text;
  }
}

function CourseDetail({ title, dateAdded, description }: CourseDetailProps) {
  return (
    <div className="course-detail-container">
      <div className="course-detail">
        <h4 className="course-detail-title">{title}</h4>
        <p className="course-detail-date">Added {dateAdded}</p>
        <p className="course-detail-description">{TextLimit(description)}</p>
      </div>

      <button className="enrol-button" type="button">
        Enrol
      </button>
    </div>
  );
}

export default CourseDetail;