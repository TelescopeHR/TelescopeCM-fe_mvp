import { Outlet } from "react-router";
import Sidebar from "./sidebar/sidebar";
import PortalHeader from "./portal_header/portal_header";
// import { useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";

export default function PortalLayout() {
  const { sidebar, toggleSidebar } = useSidebarStore();
  return (
    <div className="w-full flex h-[100vh] overflow-hidden">
      <Sidebar isOpen={sidebar} setOpen={toggleSidebar} />
      <div className="w-full">
        <PortalHeader open={sidebar} setOpen={toggleSidebar} />
        <div className="px-2 lg:px-4 py-4 bg-slate-200 dark:bg-slate-800 h-[100vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
