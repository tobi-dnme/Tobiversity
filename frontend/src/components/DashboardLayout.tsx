import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./comp-styles/DashboardLayout.css";
import ProfileSection from "./ProfileSection";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-area">
        <Outlet />
      </main>
      <ProfileSection />
    </div>
  );
}

export default DashboardLayout;