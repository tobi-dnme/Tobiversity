import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./comp-styles/DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-area">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;