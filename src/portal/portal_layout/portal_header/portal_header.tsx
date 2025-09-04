import { useThemeStore } from "@/store/themestore";
import { EllipsisVertical, Sun, Moon } from "lucide-react";

type PropT = {
  setOpen: (x: boolean) => void;
  open: boolean;
};
export default function PortalHeader({ setOpen, open }: PropT) {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="w-full  bg-slate-100 dark:bg-slate-900 px-2 py-4 h-14 flex items-center justify-between">
      <div className="cursor-pointer w-2" onClick={() => setOpen(!open)}>
        <EllipsisVertical />
      </div>
      <div className="pr-4">
        <div>
          {theme === "dark" ? (
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
          )}
        </div>
      </div>
    </div>
  );
}
