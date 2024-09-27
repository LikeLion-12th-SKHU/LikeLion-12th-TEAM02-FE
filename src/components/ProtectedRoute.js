import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    alert("로그인 후 사용 가능한 서비스입니다.");
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
