import { XIcon, Telescope } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";
import { useNavigate } from "react-router";
// import { SidebarMenuData } from "../../../utils/menu-data";
// import MenuItem from "./menu-item";
// import UseAuth from "@/hooks/use-auth";

type PropT = {
  isOpen: boolean;
  setOpen: (x: boolean) => void;
};
export default function SidebarFinal({ isOpen, setOpen }: PropT) {
  // const { Logout } = UseAuth();
  const [isMobile, setIsMobile] = useState(false);
  const { setModule, currentModule } = useSidebarStore();
  const { tab } = currentModule;

  const navigate = useNavigate();

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
      animate={{ width: isOpen ? (isMobile ? "100%" : 255) : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border-r dark:border-r h-full  fixed lg:relative top-0 left-0 z-50 lg:z-0 overflow-hidden"
    >
      {/* ===== sidebar header === */}
      <div className="px-6 py-3 h-[4.2rem] bg-white flex items-center justify-start border-none">
        <div className="flex items-center justify-start w-full gap-x-1">
          <div className="hidden lg:block relative w-full">
            <div className="flex items-center gap-x-3 -ml-2">
              <img src="/logo.svg" alt="" className="w-10" />
              {isOpen && (
                <span className=" font-bold text-[1rem] text-gray-800">
                  Telescope CM
                </span>
              )}
            </div>
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
      <div className="h-full flex flex-col relative px-2 justify-between">
        <div className="max-h-[65vh] overflow-scroll px-2 mt-8">
          <div className="flex flex-col gap-y-4">
            {/* --- overview */}
            <div className="flex flex-col gap-y-3">
              <h4 className=" text-sm text-gray-500 p-1">Overview</h4>
              <div className="flex flex-col ">
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "dashboard" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Overview",
                      desc: "Subtitle text for module title",
                      tab: "dashboard",
                    });
                    navigate("/dashboard");
                  }}
                >
                  <img src="/icons/dashboard.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "activity" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Overview",
                      desc: "Subtitle text for module title",
                      tab: "activity",
                    });
                    navigate("/dashboard/activity");
                  }}
                >
                  <img src="/icons/activity.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Activity</span>
                </div>
              </div>
            </div>
            {/* -------Operations---- */}
            <div className="flex flex-col gap-y-3">
              <h4 className=" text-sm text-gray-500 p-1">Operations</h4>
              <div className="flex flex-col">
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "client" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Operations",
                      desc: "Subtitle text for module title",
                      tab: "client",
                    });
                    navigate("/dashboard/clients");
                  }}
                >
                  <img src="/icons/user.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Clients</span>
                </div>
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "employee" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Operations",
                      desc: "Subtitle text for module title",
                      tab: "employee",
                    });
                    navigate("/dashboard/employees");
                  }}
                >
                  <img src="/icons/users.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Employees</span>
                </div>

                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "schedules/Visits" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Operations",
                      desc: "Subtitle text for module title",
                      tab: "schedules/Visits",
                    });
                    navigate("/dashboard/schedules");
                  }}
                >
                  <img src="/icons/calendar.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Schedules/Visits</span>
                </div>
              </div>
            </div>

            {/* -------administraTION---- */}
            <div className="flex flex-col gap-y-3">
              <h4 className=" text-sm text-gray-500 p-1">Administration</h4>
              <div className="flex flex-col">
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "admintools" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Administration",
                      desc: "Subtitle text for module title",
                      tab: "admintools",
                    });
                  }}
                >
                  <img
                    src="/icons/user-settings.svg"
                    className="mt-[0.16rem]"
                  />
                  <span className="text-sm font-medium">Admin Tools</span>
                </div>
                <div
                  className={`flex items-center gap-x-2 cursor-pointer p-1 py-2 ${
                    tab === "settings" && "bg-[#F2F7FD]"
                  }`}
                  onClick={() => {
                    setModule({
                      name: "Administration",
                      desc: "Subtitle text for module title",
                      tab: "settings",
                    });
                  }}
                >
                  <img src="/icons/cog.svg" className="mt-[0.16rem]" />
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ---- profile area ----- */}
        <div className="mb-24 flex gap-x-2 bg-[#F3F5F8] p-2 items-center">
          <div className="w-10 h-10 bg-[#257BD2] rounded-full flex justify-center items-center">
            <span className="text-sm font-bold text-white">Logo</span>
          </div>
          <span className="font-bold text-xs"> ABC Agency Inc.</span>
        </div>
      </div>
    </motion.div>
  );
}
