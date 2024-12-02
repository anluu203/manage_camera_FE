import { SidebarItem } from "../sidebarItem";
import SidebarModal from "../sidebarModal";
import {
  LayoutDashboard,
  Home,
  Layers,
  Flag,
  ContactRound,
  LifeBuoy,
  Settings,
} from "lucide-react";

export const Sidebar = () => {
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
        <SidebarItem icon={<ContactRound size={20} />} text="ListUser" to="users"/>
        <SidebarItem icon={<Layers size={20} />} text="Tasks" to="tasks"/>
        <SidebarItem icon={<Flag size={20} />} text="Reporting" to="flag"/>
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="settings"/>
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="help"/>
      </SidebarModal>
    </>
  );
};
