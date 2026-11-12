/* Adapted from LogRocket tutorial: Axios POST requests: Handling errors, authentication, and best practices */

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/errors";
import "./page-styles/AuthPages.css";

function LoginPage() {
  const { user, signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      await signIn(username, password);
    } catch (error) {
      setError(getErrorMessage(error));
    }

    setLoading(false);
  }

  return (
    <div className="auth-form">
      <h1 className="title">Welcome back</h1>
      <p className="subtitle">Log in to continue to Tobiversity.</p>

      <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }} >
        <label className="form-label" htmlFor="username">Username</label>
        <input
          className="form-input"
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="submit-button primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      <br></br>
      <p className="auth-switch">
        No account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
