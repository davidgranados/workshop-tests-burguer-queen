import { Navigate, Outlet } from "react-router-dom";

import { getSession } from "../services"

export const ProtectedRoute = () => {
  const { token, user } = getSession();
  if (!token || !user) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
