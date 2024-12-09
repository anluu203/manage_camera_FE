import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
export const useUser = () =>{
    const userContext = useContext(UserContext);

    if (!userContext) {
      throw new Error("User must be used within a UserProvider");
    }
  return userContext  
}