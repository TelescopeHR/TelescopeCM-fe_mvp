import React, { useEffect, useState } from "react";
import { ClientdefColumns } from "./client-columns";
import { DataTable } from "@/components/data-table";
// import PageHeader from "@/components/ui/page-header/page-header";
import { useNavigate } from "react-router";
import { useClientStore } from "@/store/clientStore";
import { Button } from "@/components/ui/button";
// import Avatar from "@/assets/avatar.png";
// import { getClients } from "@/services/employee-service/employee-service";

import LoadingSkeleton from "@/components/skeleton/skeleton";
import { Plus } from "lucide-react";
import StatCard from "@/components/stat-card/stat-card";
import { clientsData } from "./dummyClients";

export function ClientsPage() {
  const [clientsArr] = useState<any>([...clientsData]);
  const [isLoadn] = useState(false);
  const [skeletonMessage] = useState("Processing.");

  const { setClient } = useClientStore();
  const navigate = useNavigate();

  const handleViewNavigation = (data: any) => {
    setClient(data);
    navigate(`/dashboard/clients/client/${data.id}`);
  };

  const handleSchedules = (data: any) => {
    setClient(data);
    navigate(`/dashboard/clients/schedule/${data.id}`);
  };

  const handleStatusUpdate = () => {};

  const columns = ClientdefColumns(
    handleViewNavigation,
    handleStatusUpdate,
    handleSchedules
  );

  // const fetchClients = () => {
  //   setisLoadn(true);
  //   setskeletonMessage("Fetching clients");
  //   return getClients().subscribe({
  //     next: (response) => {
  //       if (response) {
  //         const res = response.data;
  //         const transformed = res.map((obj: any) => {
  //           return {
  //             id_: obj.uuid,
  //             id: obj.uuid,
  //             photo: obj.profile_picture ?? Avatar,
  //             clientId: "---",
  //             firstName: obj.first_name,
  //             lastName: obj.last_name,
  //             middleName: obj.middle_name ?? "---",
  //             gender: "---",
  //             phone: "---",
  //             email: "---",
  //             status: "inactive",
  //             dob: "---",
  //             SocialSecurity: "---",
  //             location: {
  //               address: "---",
  //               city: "---",
  //               state: "---",
  //               zip: "---",
  //             },
  //             phones: [
  //               { type: "Login", phoneNumber: "---" },
  //               { type: "Work", phoneNumber: "---" },
  //             ],
  //             medicalInfo: {
  //               admitted: "---",
  //               livingWith: "---",
  //               ableToRespond: "---",
  //               allergies: "---",
  //               classification: "---",
  //               condition: "---",
  //               priority: "---",
  //             },
  //           };
  //         });
  //         setclientsArr(transformed);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       setisLoadn(false);
  //     },
  //     complete: () => {
  //       setisLoadn(false);
  //     },
  //   });
  // };

  const statsData = [
    {
      title: "Total Clients",
      value: 204,
      isGain: true,
      percent: 12,
    },

    {
      title: "Active Clients",
      value: 24,
      isGain: true,
      percent: 12,
    },
    {
      title: "New Clients Added",
      value: 24,
      isGain: false,
      percent: 1,
      extra: "this month",
    },
  ];

  useEffect(() => {
    // const clientSub = fetchClients();
    // return () => {
    //   clientSub.unsubscribe();
    // };
  }, []);

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h4>Clients</h4>
          </div>
        </div>

        <div className="mt-10 mb-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statsData.map((obj, idx: number) => (
            <StatCard
              title={obj.title}
              value={obj.value}
              isGain={obj.isGain}
              percent={obj.percent}
              extra={obj.extra}
              key={idx}
            />
          ))}
        </div>
        <div className="w-full border rounded-2xl p-4">
          <div className="w-full flex justify-between">
            <h2 className=" font-bold">Client Directory</h2>
            <Button
              className=" cursor-pointer bg-[#257BD2] hover:bg-[#257BD2] flex items-center gap-x-2"
              onClick={() => {
                navigate("/dashboard/settings/onboard/client");
              }}
            >
              <Plus />
              Add Client
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={clientsArr}
            searchPlaceholder="Search"
            filterArray={[]}
            showSerialNumber={false}
            withExport={true}
            withDate={false}
            searchColumn="productType"
          />
        </div>
      </div>
      {isLoadn && <LoadingSkeleton name={skeletonMessage} />}
    </React.Fragment>
  );
}
