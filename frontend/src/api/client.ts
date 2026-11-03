/* Adapted from Medium tutorial "Mastering Axios in React: The Easiest Guide You’ll Ever Need" by Snehasishdaszy */
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Token " + token;
  }
  return config;
});

export default client;