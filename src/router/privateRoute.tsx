import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAth";
export interface RouteProps {
  component: ComponentType;
}
const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
}) => {
  const {user} = useAuth();

  return user.isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;