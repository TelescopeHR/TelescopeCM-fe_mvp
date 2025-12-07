import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

export default function LayoutContainerTwo({ children }: Props) {
  const navigate = useNavigate();
  return (
    <div className="max-h-screen overflow-hidden bg-[#0E2E4E]">
      <div className="flex">
        {/* ---------- content area */}
        <div className="flex flex-col w-full lg:w-6/12">
          <div className="p-4">
            <div
              className="flex gap-x-2 items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="p-2">
                <img src="/logo.svg" alt="logo" className="w-12" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">Telescope</h1>
            </div>
          </div>

          {/* -----content */}
          <div className="max-h-screen lg:px-20 w-full text-white">
            {children}
          </div>

          {/* ------- */}
        </div>

        <div className="hidden lg:block lg:w-6/12  dark:bg-slate-800">
          <div className="flex flex-col py-4 px-6 h-screen">
            <div className="w-full relative">
              <div className=" absolute right-1 top-10">
                <img src="/banner.svg" alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
