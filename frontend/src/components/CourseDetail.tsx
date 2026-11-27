type CourseDetailProps = {
  id: number;
  title: string;
  dateAdded: string;
  description: string;
  enrolled: boolean;
  onEnrolClick: (courseId: number) => void;
};

function TextLimit(text: string) {
  if (text.length > 50) {
    return text.slice(0, 50).trim() + "...";
  } else {
    return text;
  }
}


function CourseDetail({ id, title, dateAdded, description, enrolled, onEnrolClick }: CourseDetailProps) {
  const addedOn = new Date(dateAdded).toLocaleDateString("en-GB")

  let buttonText = "Enrol";
  if (enrolled) {
    buttonText = "Leave";
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail">
        <h4 className="course-detail-title">{title}</h4>
        <p className="course-detail-date">Added {addedOn}</p>
        <p className="course-detail-description">{TextLimit(description)}</p>
      </div>

      <button className="enrol-button" type="button" onClick={() => onEnrolClick(id)}>
        {buttonText}
      </button>
    </div>
  );
}

export default CourseDetail;