import { Dot } from "lucide-react";
import PersonalInfo from "./personal-info";
import { useState } from "react";
import { ClientDTO } from "./client.dto";

export default function CreateClient() {
  const [clientPayload, setclientPayload] = useState<ClientDTO | any>({});
  const [currentTab, setcurrentTab] = useState("Personal Information");
  const tabList = ["Personal Information", "Medical Information", "Care Plan"];

  return (
    <div className="w-full ">
      <div>
        <h2 className="font-semibold">Add Client</h2>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-6">
        {tabList.map((tab: string, idx: number) => (
          <div className="flex items-center" key={idx}>
            <Dot
              strokeWidth={12}
              color={currentTab == tab ? "black" : "#a3a3a3"}
            />
            <p
              className={`${
                currentTab == tab ? "font-bold" : "font-bold text-[#a3a3a3]"
              }`}
            >
              {tab}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 mt-6">
        {tabList.map((tb: string, idx: number) => (
          <div
            className={`h-2 ${
              currentTab == tb ? "bg-gray-900" : "bg-gray-400"
            }`}
            key={idx}
          ></div>
        ))}
      </div>
      <div className="w-full mt-4 min-h-screen overflow-y-scroll pb-20">
        {currentTab === "Personal Information" && (
          <PersonalInfo
            data={clientPayload}
            setcurrentTab={setcurrentTab}
            setpayload={setclientPayload}
          />
        )}
      </div>
    </div>
  );
}
