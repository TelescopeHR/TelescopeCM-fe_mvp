import { useUserStore } from "@/store/userStore";

export default function SidebarProfileTab() {
  const { user } = useUserStore();
  const { email, name, avatar } = user;

  // useEffect(() => {
  //   console.log("==>", user);
  // }, []);

  return (
    <div className="p-2 -ml-1 mt-10">
      <div className="flex items-center w-full gap-x-2">
        <div className="w-10 h-10 rounded-lg bg-slate-300 overflow-hidden">
          <img src={avatar} alt="" className="w-10 h-10" />
        </div>
        <div className=" text-white text-sm">
          <p className=" font-bold">{name}</p>
          <p className=" text-[0.65rem]">{email}</p>
        </div>
      </div>
    </div>
  );
}
