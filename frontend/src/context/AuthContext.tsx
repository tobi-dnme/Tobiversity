/* Code copied from LogRocket tutorial: Axios POST requests: Handling errors, authentication, and best practices */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login, logout } from "../api/auth";

type AuthUser = {
  id: number,
  username: string,
  role: string
}

type AuthContextType = {
  user: AuthUser | null,
  signIn: (username: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

function getSavedUser(): AuthUser | null {
  const saved = localStorage.getItem("user");
  if (saved) {
    return JSON.parse(saved);
  } else {
    return null;
  }
}

function saveLogin(token: string, user: AuthUser) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function clearLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(getSavedUser());

  async function signIn(username: string, password: string) {
    const data = await login(username, password);
    const loggedInUser = { id: data.id, username: username, role: data.role };

    saveLogin(data.token, loggedInUser);
    setUser(loggedInUser);
  }

  async function signOut() {
    try {
      await logout();
    } catch (error) {
      console.log("Logout request failed", error);
    }

    clearLogin();
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