import { useAuth } from "../context/AuthContext";
import "./comp-styles/ProfileSection.css";
import TeacherPanelStats from "./TeacherPanelStats";

type TodoProps = {
  text: string;
  done: boolean;
};

const studentTodos: TodoProps[] = [
  { text: "Write your README file", done: true },
  { text: "Book a session with mentor", done: false },
  { text: "Stick to the brief", done: true },
  { text: "Prepare questions for meeting", done: false },
  { text: "Review feedback", done: false },
];

const teacherTodos: TodoProps[] = [
  { text: "Review course description", done: true },
  { text: "Update Module 3 notes", done: false },
  { text: "Mark the latest assignments", done: true },
  { text: "Publish new course", done: false },
  { text: "Reply to student questions", done: false },
];

function ProfileSection() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const avatar = user.username.charAt(0).toUpperCase();

  let todoItems = studentTodos;
  if (user.role === "teacher") {
    todoItems = teacherTodos;
  }

  return (
    <div className="profile-section">
      <div className="profile-top">
        <div className="profile-pic">{avatar}</div>
        <p className="profile-name">{user.username}</p>
      </div>

      <br></br>
      <br></br>

      {user.role === "teacher" ? <TeacherPanelStats /> : <div className="profile-calendar"></div>}

      <br></br>
      <br></br>

      <div className="todo-header">
        <h3 className="todo-title">To Do List  +</h3>
      </div>

      <ul className="todo-list">
        {todoItems.map((item) => (
          <li key={item.text} className="todo-item">
            {item.done ? "☑" : "☐"} {item.text}   {/* Placeholder icons, because it's not part of the brief */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSection;