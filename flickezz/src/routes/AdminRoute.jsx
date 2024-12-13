import React from "react";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;

  if (!user || user.role !== "ADMIN") {
    window.location.href = "/";
  } else {
    return children;
  }
};

export default AdminRoute;
