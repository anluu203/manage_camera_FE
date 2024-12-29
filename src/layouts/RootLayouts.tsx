import { Sidebar } from "@/component/sidebar/index";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAth";
interface RootLayoutProps {
    children: ReactNode;
  }

function RootLayout({ children }:RootLayoutProps) {
  const {user} = useAuth();
    return (
      <div className="flex gap-5">
        {user.isAuthenticated && <Sidebar/>}
        <main className="  mx-auto py-4 ">{children}</main>
      </div>
    );
  }
  
  export default RootLayout;