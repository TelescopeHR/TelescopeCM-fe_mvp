type PropT = {
  activeTab: string;
  setActiveTab: (x: string) => void;
};

export default function ProfileTab({ activeTab, setActiveTab }: PropT) {
  const tabList = ["Client profile", "Care Plan", "Client Schedule"];
  return (
    <div className="w-full bg-[#F5F5F5] p-2 flex items-center gap-x-2 flex-wrap">
      {tabList.map((tab, idx: number) => (
        <div
          className={` text-sm p-2 rounded-full cursor-pointer min-w-28 text-center ${
            activeTab === tab && "bg-white shadow font-bold"
          }`}
          key={idx}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
