import { useContext, ReactNode } from "react";
import { SidebarContext } from "@/component/sidebar/sidebarModal/index"; // Import context từ Sidebar

import { NavLink } from "react-router-dom";

// Kiểu dữ liệu cho SidebarItem props
interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  to: string; // Đường dẫn liên kết
  active?: boolean;
  alert?: boolean;
  onClick?: () => void
}

export function SidebarItem({ icon, text, to, active, alert, onClick, ...props }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a SidebarProvider");
  }

  const { expanded } = context;

  return (
    <NavLink
      {...props}
      onClick={onClick}
      to={to}
      className={({ isActive }) =>
        `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive || active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`
      }
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
