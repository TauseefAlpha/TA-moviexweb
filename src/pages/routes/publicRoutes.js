import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  return !localStorage.getItem("accessToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicRoutes;