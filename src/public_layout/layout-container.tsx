import { useThemeStore } from "@/store/themestore";
import { Moon, Sun, Telescope } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutContainer({ children }: Props) {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="max-h-screen overflow-hidden  bg-slate-100 dark:bg-slate-900">
      <div className="flex">
        <div className="hidden lg:block lg:w-4/12 bg-slate-900 dark:bg-slate-800">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center -mt-20">
              <div className="bg-white rounded-3xl p-2">
                <Telescope size={80} color="#233C56" />
              </div>
              <h1 className="text-4xl text-white mt-2">Telescope CM</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-8/12">
          <div className="flex items-center justify-between p-4 bg-slate-100 w-full dark:bg-slate-900">
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
          <div className=" max-h-screen overflow-scroll w-full">{children}</div>

          {/* ------- */}
        </div>
      </div>
    </div>
  );
}
