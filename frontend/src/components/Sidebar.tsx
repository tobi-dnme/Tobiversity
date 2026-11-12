// Adapted from LogRocket's Guide to React Router Navigation by Aman Mittal
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./styles/Sidebar.css";

type NavType = {
  label: string,
  path: string
}

const studentLinks: NavType[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Courses", path: "/my-courses" },
  { label: "All Courses", path: "/courses" },
];
const studentDisplayOnly = ["Notifications", "Downloads", "Settings"];


const teacherLinks: NavType[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Courses", path: "/my-courses" },
  { label: "New Course", path: "/courses/new" },
  { label: "All Courses", path: "/courses" },
];
const teacherDisplayOnly = ["Notifications", "Settings"];


const adminLinks: NavType[] = [
  { label: "Manage Users", path: "/admin/users" },
  { label: "All Courses", path: "/courses" },
  { label: "New Course", path: "/courses/new" },
];
const adminDisplayOnly = ["Settings"];


function Sidebar() {
  const { user, signOut } = useAuth();

  let links = studentLinks;
  let displayOnly = studentDisplayOnly;

  if (user?.role === "teacher") {
    links = teacherLinks;
    displayOnly = teacherDisplayOnly;
  } else if (user?.role === "admin") {
    links = adminLinks;
    displayOnly = adminDisplayOnly;
  }

  return (
    <nav className="sidebar">
      <h2 className="sidebar-logo">Tob!vers!ty</h2>

      {links.map((link) => (
        <NavLink key={link.path} to={link.path} end className="sidebar-link sidebar-button">
          {link.label}
        </NavLink>
      ))}

      {displayOnly.map((label) => (
        <span key={label} className="sidebar-link display-only">
          {label}
        </span>
      ))}

      <button className="sidebar-link sidebar-button" onClick={signOut}>
        Logout
      </button>
    </nav>
  );
}

export default Sidebar;
