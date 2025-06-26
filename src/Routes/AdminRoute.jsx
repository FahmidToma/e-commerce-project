import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { FadeLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FadeLoader color="#ff8c42" aria-label="Loading Spinner"></FadeLoader>
      </div>
    );
  }
  if (user && isAdmin == true) {
    return children;
  } else if (user && isAdmin === false) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return null;
};

export default AdminRoute;
