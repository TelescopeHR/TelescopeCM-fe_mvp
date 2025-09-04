import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router";

type PropT = {
  title: string;
  hasBack?: boolean;
};
export default function PageHeader({ title, hasBack = false }: PropT) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        {hasBack && (
          <div className=" cursor-pointer">
            <MoveLeft onClick={() => navigate(-1)} />
          </div>
        )}
        <h1 className=" text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
