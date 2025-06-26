import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
//import { SkeletonCard } from "@/Components/ui/skeleton";
import { FadeLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FadeLoader color="#ff8c42" aria-label="Loading Spinner"></FadeLoader>
      </div>
    );
  }
  if (user) {
    return children;
  }
  if (!user || !user.emailVerified) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
