import { EllipsisVertical } from "lucide-react";

type PropT = {
  setOpen: (x: boolean) => void;
  open: boolean;
};
export default function PortalHeader({ setOpen, open }: PropT) {
  return (
    <div
      className="w-full  bg-slate-100 px-2 py-4 h-14 flex items-center"
      onClick={() => setOpen(!open)}
    >
      <div className="cursor-pointer">
        <EllipsisVertical />
      </div>
    </div>
  );
}
