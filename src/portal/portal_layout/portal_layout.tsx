import { Outlet, useNavigate } from "react-router";
// import Sidebar from "./sidebar/sidebar";
import PortalHeader from "./portal_header/portal_header";
import { useSidebarStore } from "@/store/sidebarStore";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import SidebarFinal from "./sidebar-final/sidebar";

export default function PortalLayout() {
  const { user } = useUserStore();
  const { sidebar, toggleSidebar } = useSidebarStore();

  const navigate = useNavigate();

  useEffect(() => {
    if ((user && !Object.keys(user).length) || user == null) {
      navigate("/");
    } else {
      // console.log("user login", user);
    }
  }, [navigate, user]);

  return (
    <div className="w-full flex h-[100vh] overflow-hidden">
      <SidebarFinal isOpen={sidebar} setOpen={toggleSidebar} />
      <div className="w-full">
        <PortalHeader open={sidebar} setOpen={toggleSidebar} />
        <div className="px-2 lg:px-4 py-4 bg-white dark:bg-slate-900 h-screen overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
