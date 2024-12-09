import React, { ReactNode } from "react";
import { AuthProvider } from "./AthContext";

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

export default AppProviders;
