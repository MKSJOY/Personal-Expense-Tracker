import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:5000", // adjust if backend is on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
