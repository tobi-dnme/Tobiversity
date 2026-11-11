import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TempDashboard from "./pages/Dashboard";

function App() {
  return (
    <main>
      <Header organisation="Tobiversity" name="Mr. User" />
      <WelcomeBanner user="Tobi" />
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/dashboard" element={<TempDashboard />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </main>
    
  );
}

export default App;