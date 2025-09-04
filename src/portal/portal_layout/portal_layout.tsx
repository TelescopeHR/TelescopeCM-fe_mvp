import { Outlet } from "react-router";
import Sidebar from "./sidebar/sidebar";
import PortalHeader from "./portal_header/portal_header";
import { useState } from "react";

export default function PortalLayout() {
  const [openSidebar, setopenSidebar] = useState(true);
  return (
    <div className="w-full flex h-[100vh] overflow-hidden">
      <Sidebar isOpen={openSidebar} setOpen={setopenSidebar} />
      <div className="w-full">
        <PortalHeader open={openSidebar} setOpen={setopenSidebar} />
        <div className="px-2 lg:px-4 py-4 bg-slate-200 h-[100vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
