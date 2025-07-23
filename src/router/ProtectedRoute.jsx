import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
// import { AuthContext } from "../context/AuthProvider";
import Loader from "../shared/Loader/Loader";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (!loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
