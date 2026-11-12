import { Outlet } from "react-router-dom";
import "./comp-styles/AuthLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <h2 className="auth-logo">Tob!vers!ty</h2>
        <br></br>
        <div className="auth-image"></div>
        <br></br>
        <p>Your courses, all in one place.</p>
      </div>
      <div className="auth-right">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;