import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./components/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/MyCourses";
import AllCourses from "./pages/AllCourses";
import PlaceHolder from "./pages/PlaceHolder";

function App() {
  return (
    <main>
      <BrowserRouter> {/* From LogRocket Tutorial 'How to use React Router v7 in React apps' */}
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/courses/new" element={<PlaceHolder title="New Course" />} />
                <Route path="/admin/users" element={<PlaceHolder title="Manage Users" />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </main>
    
  );
}

export default App;