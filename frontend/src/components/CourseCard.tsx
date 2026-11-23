type CourseCardProps = {
  title: string;
};

function TextLimit(text: string) {
  if (text.length > 20) {
    return text.slice(0, 20).trim() + "...";
  } else {
    return text;
  }
}

function CourseCard({ title }: CourseCardProps) {
  return (
    <div className="course-card">
      <h4 className="course-card-title">{TextLimit(title)}</h4>
      <div className="course-card-image"></div>
    </div>
  );
}

export default CourseCard;