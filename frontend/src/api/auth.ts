/* Adapted from Medium tutorials "How to handle authentication and authorization in React JS" by SecretDev,
    "Intro to Typescript. Interface, type and enum." by Andrii Drozdov,
    and "Mastering Axios in React: The Easiest Guide You’ll Ever Need" by Snehasishdaszy */

import client from "./client";
import type { LoginResponse } from "../types";

export async function login(username: string, password: string) {
  localStorage.removeItem("token");
  const response = await client.post<LoginResponse>("/login/", {
    username,
    password,
  });
  return response.data;
}

export async function register(username: string, email: string, password: string) {
  localStorage.removeItem("token");
  const response = await client.post("/register/", {
    username,
    email,
    password,
  });
  return response.data;
}

export async function logout() {
  await client.post("/logout/");
}