import api from "@/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token on app start and fetch user profile
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // assuming res.data is user profile
      } catch (error) {
       toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  // Login function calls your login API, stores token, and user info
  const login = async (loginData) => {
    try {
      const res = await api.post("/auth/login", loginData);
      // assuming response contains token and user info
      const { token, user: userData } = res.data;
      localStorage.setItem("authToken", token);
      setUser(userData);
      toast.success("Logged in successfully");
      return { success: true };
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
