import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getUserAccount } from "@/service/auth/getUserAccount";
import { handleLogout } from "@/service/auth/loginLogout";
import {Account} from "@/type"
// Định nghĩa kiểu dữ liệu cho user
interface User {
    isAuthenticated: boolean,
    token?: string | number,
    account?: Account| {}
    isLoading: boolean
}

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextProps {
  user: User;
  loginContext: (userData: User) => void;
  logout: () => void;
}

// Khởi tạo context với giá trị mặc định
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let defaultValueUser =     { 
    isAuthenticated: false,
    token: "",
    account:{},
    isLoading: true
  }

  const [user, setUser] = useState<User>(defaultValueUser);

  const loginContext = (userData: User) => {
    setUser({...userData, isLoading:false});
  };

  const logout = async () => {
    setUser({...defaultValueUser, isLoading:false});
    localStorage.removeItem("jwt");
    await handleLogout()
  };
  const fetchUser = async () =>{
   let response = await getUserAccount()
   let user = response.data;
   if (user && user.EC === 0) {
    let groupWithRoles = user.DT.groupWithRoles;
    let email = user.DT.email;
    let username = user.DT.username;
    let token = user.DT.access_token;
    let data = {
      isAuthenticated: true,
      token: token,
      account: {groupWithRoles, email, username},
      isLoading: false
    };
    setTimeout(() =>{
      setUser(data)
    },700)
   } else{
    setUser({...defaultValueUser, isLoading:false})
   }
  }
  useEffect(() =>{
      fetchUser();
      console.log('user in context :', user)
  },[])

  return (
    <AuthContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export  {AuthProvider, AuthContext};