import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAth";
import { Account } from "@/type";
// Kiểu dữ liệu cho Context
interface SidebarContextType {
  expanded: boolean;
}

// Tạo context với giá trị mặc định
 export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Kiểu dữ liệu cho Sidebar component props
interface SidebarProps {
  children: ReactNode;
}

// Tách phần giao diện chính của Sidebar thành component riêng
function SidebarLayout({
  children,
  expanded,
  toggleSidebar,
}: {
  children: ReactNode;
  expanded: boolean;
  toggleSidebar: () => void;
}) {
  const {user} = useAuth();
  let userName = (user.account as Account)?.username;
  let email = (user.account as Account)?.email;
<h4 className="font-semibold">{userName}</h4>;
  return (
    <aside className="h-screen inset-y-0 z-10">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="hidden md:block p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex p-3">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userName}</h4>
              <span className="text-xs text-gray-600">{email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default function SidebarModal({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  // Thêm logic tự động đóng sidebar khi màn hình ở mức medium
  useEffect(() => {
    const handleResize = () => {
      const isMediumScreen = window.matchMedia("(max-width: 992px)").matches;
      setExpanded(!isMediumScreen); // Đặt `expanded` thành false nếu màn hình nhỏ hơn `md`
    };

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Gọi ngay khi component mount để xử lý kích thước ban đầu
    handleResize();

    // Cleanup listener khi unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <SidebarLayout
        expanded={expanded}
        toggleSidebar={() => setExpanded((curr) => !curr)}
      >
        {children}
      </SidebarLayout>
    </SidebarContext.Provider>
  );
}
