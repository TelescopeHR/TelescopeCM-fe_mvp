import { MoveDown, MoveUp } from "lucide-react";

type PropT = {
  title: string;
  value: number;
  isGain: boolean;
  percent: number;
  extra?: string;
};
export default function StatCard({
  title,
  value,
  isGain,
  percent,
  extra,
}: PropT) {
  return (
    <div className="h-24 bg-[#F8F9FA] border-[1px] rounded p-4 cursor-pointer flex flex-col gap-y-4">
      <div>
        <span className="text-sm">{title}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-x-1">
          <span className="font-bold text-xl">{value}</span>
          {extra?.length ? (
            <span className="text-xs mt-2">{extra}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center">
          {isGain ? (
            <MoveUp className="text-green-400" size={14} strokeWidth={4} />
          ) : (
            <MoveDown className="text-red-400" size={14} strokeWidth={4} />
          )}

          <span
            className={`font-bold text-sm ${
              isGain ? "text-green-500" : "text-red-500 "
            }`}
          >
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
