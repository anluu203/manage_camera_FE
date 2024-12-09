
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAth"; // Custom hook useAuth đã tạo
import { RouteProps } from "./privateRoute";

const PublicRoute:React.FC<RouteProps> = ({ component: Component }) => {
    const { user } = useAuth();

    if (user.isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return <Component />;
};

export default PublicRoute;
