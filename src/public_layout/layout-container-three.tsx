import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

export default function LayoutContainerThree({ children }: Props) {
  const navigate = useNavigate();
  return (
    <div className="max-h-screen">
      <div className="flex flex-col w-full">
        <div className="sticky top-10 w-full bg-white">
          <div className="p-4 px-12 bg-[#0E2E4E] pt-5">
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
        </div>
        <div className="w-11/12 mx-auto mt-20">{children}</div>
      </div>
    </div>
  );
}
