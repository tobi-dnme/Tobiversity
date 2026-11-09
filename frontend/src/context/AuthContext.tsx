/* Code copied from LogRocket tutorial: Axios POST requests: Handling errors, authentication, and best practices */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login, logout } from "../api/auth";

interface AuthUser {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getSavedUser(): AuthUser | null {
  const saved = localStorage.getItem("user");
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getSavedUser());

  async function signIn(username: string, password: string) {
    const data = await login(username, password);
    const loggedInUser = { id: data.id, username: username, role: data.role };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }

  async function signOut() {
    try {
      await logout();
    } catch (error) {
      console.log("Logout request failed, logging out here anyway", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}