import { XIcon, Telescope } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SidebarMenuData, SidebarSecMenuData } from "../../../utils/menu-data";
import MenuItem from "./menu-item";
import SidebarProfileTab from "./sidebar-profile-tab";
import UseAuth from "@/hooks/use-auth";

type PropT = {
  isOpen: boolean;
  setOpen: (x: boolean) => void;
};
export default function Sidebar({ isOpen, setOpen }: PropT) {
  const { Logout } = UseAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <motion.div
      animate={{ width: isOpen ? (isMobile ? "100%" : 300) : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-slate-900 dark:border-r h-full  fixed lg:relative top-0 left-0 z-50 lg:z-0 overflow-hidden"
    >
      {/* ===== sidebar header === */}
      <div className="px-6 py-3 h-14 bg-slate-900 flex items-center justify-start border-none">
        <div className="flex items-center justify-start w-full gap-x-1">
          <div className="hidden lg:block relative w-full">
            <div className="flex items-center gap-x-1 -ml-2">
              <Telescope className=" text-indigo-50" strokeWidth={3} />
              {isOpen && (
                <span className=" font-extrabold text-xl text-indigo-50">
                  telescope
                </span>
              )}
            </div>
            <span className="text-xs text-white absolute top-6 left-4"></span>
          </div>
          {/* ====== mobile ==== */}
          <div className="lg:hidden flex justify-between items-center w-full">
            <div className="flex items-center gap-x-1">
              <Telescope color="white" strokeWidth={2.5} />
              {isOpen && (
                <span className=" text-white font-extrabold text-xl">
                  telescope
                </span>
              )}
            </div>
            <XIcon onClick={() => setOpen(!isOpen)} color="white" />
          </div>
          {/* ======== */}
        </div>
      </div>
      {/* ============== */}
      <div className="h-full flex flex-col relative">
        <div className="max-h-[65vh] overflow-scroll px-2">
          {SidebarMenuData.map((obj) => (
            <MenuItem
              title={obj.title}
              Icon={obj.Icon}
              path={obj.path}
              items={obj.items}
              fn={() => {
                if (isMobile) setOpen(false);
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-20 w-full px-2">
          {SidebarSecMenuData.map((obj) => (
            <MenuItem
              title={obj.title}
              Icon={obj.Icon}
              path={obj.path}
              items={obj.items}
              action={obj.action}
              fn={() => {
                if (isMobile) setOpen(false);
                if (obj.title == "Logout") {
                  Logout();
                }
              }}
            />
          ))}
          <SidebarProfileTab />
        </div>
      </div>
    </motion.div>
  );
}
