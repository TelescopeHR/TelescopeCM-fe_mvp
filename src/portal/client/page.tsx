import { useState } from "react";
// import { useClientStore } from "@/store/clientStore";
import ProfileTab from "./profile-tab/profile-tab";
import ClientProfile from "./profile/client-profile";
import ClientCarePlan from "./client-careplan/client-careplan";
import ClientSchedule from "./client-schedule/client-schedule";

export default function ClientHome() {
  const [activeTab, setactiveTab] = useState("Client profile");
  // const { client } = useClientStore();

  return (
    <>
      <div className="w-full pb-20">
        <h2 className="mb-2 text-sm font-semibold">Client Overview</h2>
        <div className="w-full flex flex-col gap-y-4">
          <ProfileTab activeTab={activeTab} setActiveTab={setactiveTab} />
          <div>
            {activeTab === "Client profile" && <ClientProfile />}
            {activeTab === "Care Plan" && <ClientCarePlan />}
            {activeTab === "Client Schedule" && <ClientSchedule />}
          </div>
        </div>
        {/* ======== */}
      </div>
    </>
  );
}
