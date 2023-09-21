import { Navigate, Outlet } from "react-router-dom";

import { getSession } from "../services"

export const ProtectedRoute = () => {
  const { token, user } = getSession();
  // console.log("token", token);
  // console.log("user", user);
  if (!token || !user) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
