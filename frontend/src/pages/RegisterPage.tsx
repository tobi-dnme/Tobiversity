import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { register } from "../api/auth";
import { getErrorMessage } from "../api/errors";
import "./page-styles/AuthPages.css";

function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  async function handleRegister() {
    setError("");

    if (password !== confirmPassword) {
      setError("Your passwords don't match, User.");
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate("/login"); 
    } catch (error) {
      setError(getErrorMessage(error));
    }

    setLoading(false);
  }

  return (
    <div className="auth-form">
      <h1 className="title">Create your account</h1>
      <p className="subtitle">
        Join Tobiversity. New accounts start as Students.
      </p>

      <form onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}>
        <label className="form-label" htmlFor="username">Username</label>
        <input
          className="form-input"
          id="username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="email">Email</label>
        <input
          className="form-input"
          id="email"
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="confirm">Confirm Password</label>
        <input
          className="form-input"
          id="confirm"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          className="submit-button primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="auth-switch">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
