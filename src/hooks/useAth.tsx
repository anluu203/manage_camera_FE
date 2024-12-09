import { useContext } from "react";
import { AuthContext } from "@/contexts/AthContext"; // Đường dẫn chính xác tới AuthContext

// Custom hook
export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return authContext; // Trả về toàn bộ context (authState và các phương thức khác)
};
