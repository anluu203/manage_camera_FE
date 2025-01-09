import { Sidebar } from "@/component/sidebar/index";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAth";
interface RootLayoutProps {
    children: ReactNode;
  }

function RootLayout({ children }:RootLayoutProps) {
  const {user} = useAuth();
    return (
      <div className="flex">
        {user.isAuthenticated && <Sidebar/>}
        <main className=" md:px-5 flex justify-center py-4 w-full">{children}</main>
      </div>
    );
  }
  
  export default RootLayout;