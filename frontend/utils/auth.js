"use client";


// Safely get token from localStorage (client-side only)
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // change "token" to your key
  }
  return null; // server-side fallback
}

// Optional: set token
export function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

// Optional: remove token (logout)
export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
