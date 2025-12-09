import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import UseAuth from "@/hooks/use-auth";
import { useSidebarStore } from "@/store/sidebarStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// import { useThemeStore } from "@/store/themestore";
import { Search, EllipsisVertical, Bell, ChevronDown, Dot } from "lucide-react";

type PropT = {
  setOpen: (x: boolean) => void;
  open: boolean;
};
export default function PortalHeader({ setOpen, open }: PropT) {
  // const { theme, toggleTheme } = useThemeStore();
  const { currentModule } = useSidebarStore();
  const { Logout } = UseAuth();
  return (
    <div className="w-full  h-[4.2rem] border-b  bg-white dark:bg-slate-900 px-2 py-4  flex items-center justify-between">
      <div className="cursor-pointer w-4/12" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-x-2">
          <EllipsisVertical />
          <div>
            <h4 className="font-bold">{currentModule.name}</h4>
            <p className="text-[0.70rem] text-[#8F8F8F]">
              {currentModule.desc}
            </p>
          </div>
        </div>
      </div>
      <div className="w-4/12 0">
        <form className="flex items-center border rounded-xl p-1 px-2">
          <Search size={16} />
          <Input
            placeholder="Search for something..."
            className="w-full border-0 outnline-none focus:border-0  focus-visible:ring-[0px]"
          />
        </form>
      </div>
      <div className="pr-4  w-4/12 flex justify-end">
        <div className="flex items-center gap-x-8">
          <div className="w-10 h-10 bg-[#F3F5F8] flex items-center justify-center">
            <Bell fill="#257BD2" size={18} stroke="#257BD2" />
          </div>
          <div className="flex items-center bg-[#F3F5F8]h-10 gap-x-1 px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-x-2 outline-none">
                  <div className="w-8 h-8 rounded-full bg-[#257BD2] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">SA</span>
                  </div>
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => Logout()}
                  className=" cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center bg-[#F3F5F8] h-10 gap-x-1 px-2">
            <Dot />
            <span className="text-xs font-bold">Super Admin</span>
          </div>
          {/* {theme === "dark" ? (
            <Moon
              size={18}
              className=" text-slate-900 dark:text-white cursor-pointer"
              onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                event.stopPropagation();
                toggleTheme();
              }}
            />
          ) : (
            <Sun
              size={18}
              className=" text-slate-900 dark:text-white cursor-pointer"
              onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                event.stopPropagation();
                toggleTheme();
              }}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
