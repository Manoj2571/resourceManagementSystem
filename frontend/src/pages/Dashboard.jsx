import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import EngineerDashboard from "./EngineerDashboard";
import ManagerDashboard from "./ManagerDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return user.role === "engineer" ? <EngineerDashboard /> : <ManagerDashboard />;
};

export default Dashboard;
