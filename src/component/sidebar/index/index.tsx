import { SidebarItem } from "../sidebarItem";
import SidebarModal from "../sidebarModal";
import { useAuth } from "@/hooks/useAth";
import {
  LayoutDashboard,
  Home,
  BookCopy,
  Camera,
  ContactRound,
  LogOut,
  Settings,
} from "lucide-react";

export const Sidebar = () => {
  const {logout} = useAuth()
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
  };
  return (
    <>
      <SidebarModal>
          <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          to="/home"
          active={false}
          alert={true}
        />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard"  to="dashboard"/>
        <SidebarItem icon={<ContactRound size={20} />} text="ListUsers" to="users"/>
        <SidebarItem icon={<BookCopy size={20} />} text="Rooms" to="rooms"/>
        <SidebarItem icon={<Camera size={20} />} text="Cameras" to="cameras"/>
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="settings"/>
        <SidebarItem icon={<LogOut size={20} />} text="Logout" to="" onClick={handleLogout} />
      </SidebarModal>
    </>
  );
};
