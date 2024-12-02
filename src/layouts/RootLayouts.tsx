import { Sidebar } from "@/component/sidebar/index";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
  }

function RootLayout({ children }:RootLayoutProps) {
    return (
      <div className="flex gap-5">
        <Sidebar/>
        <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
      </div>
    );
  }
  
  export default RootLayout;