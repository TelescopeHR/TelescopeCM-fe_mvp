import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";

type ItemT = {
  title: string;
  path: string;
  Icon?: string;
};
type PropT = {
  title: string;
  path: string;
  Icon: LucideIcon;
  items?: ItemT[];
};
export default function MenuItem({ title, path, Icon, items }: PropT) {
  const [openItems, setopenItems] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="mb-[0.1rem] ">
      <div
        className={`w-full cursor-pointer transition-all duration-300 ease-in-out flex justify-between  hover:bg-slate-800 px-2 py-4 lg:py-3 text-white ${
          pathname === path ? "bg-slate-800" : "bg-slate-900"
        }`}
      >
        <NavLink className="flex items-center gap-x-2 w-full" to={path}>
          <Icon size={16} />
          <span className="text-sm">{title}</span>
        </NavLink>
        {items?.length ? (
          <div
            onClick={() => setopenItems(!openItems)}
            className="cursor-pointer"
          >
            <ChevronRight
              size={20}
              className={`transition-transform duration-300 ${
                openItems ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      {items?.length && openItems ? (
        <div className="border-l-2 border-dotted border-slate-500 p-1 ml-4">
          {items.map((obj) => (
            <NavLink to={obj.path}>
              <div
                className={` text-white p-2 hover:bg-slate-800  text-sm transition-transform duration-300 ${
                  pathname === obj.path ? "bg-slate-800" : "bg-slate-900"
                }`}
              >
                <span>{obj.title}</span>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
