import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <h1>Loading</h1>;
  }
  if (user && isAdmin == true) {
    return children;
  } else if (user && isAdmin === false) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return null;
};

export default AdminRoute;
