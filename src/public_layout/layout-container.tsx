import { useThemeStore } from "@/store/themestore";
import { Moon, Sun } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutContainer({ children }: Props) {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="max-h-screen overflow-hidden   dark:bg-slate-900">
      <div className="flex">
        <div className="hidden lg:block lg:w-6/12 bg-[#0E2E4E] dark:bg-slate-800">
          <div className="flex flex-col py-4 px-6 h-screen">
            <div className="flex gap-x-2 items-center">
              <div className="p-2">
                <img src="/logo.svg" alt="logo" className="w-12" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">Telescope</h1>
            </div>

            <div className="w-full relative">
              <div className=" absolute -right-14 top-10">
                <img src="/banner.svg" alt="logo" />
              </div>
            </div>
          </div>
        </div>
        {/* ---------- content area */}
        <div className="flex flex-col w-full lg:w-6/12 ">
          <div className="flex items-center justify-between p-4  w-full dark:bg-slate-900">
            <div className="w-2"></div>
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

          {/* -----content */}
          <div className="max-h-screen lg:px-20 overflow-scroll w-full ">
            {children}
          </div>

          {/* ------- */}
        </div>
      </div>
    </div>
  );
}
