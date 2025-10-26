import React, { useEffect, useState } from "react";
import { ClientdefColumns } from "./client-columns";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";
import { useNavigate } from "react-router";
import { useClientStore } from "@/store/clientStore";
import { Button } from "@/components/ui/button";
import Avatar from "@/assets/avatar.png";
import { getClients } from "@/services/employee-service/employee-service";

import LoadingSkeleton from "@/components/skeleton/skeleton";

export function ClientsPage() {
  const [clientsArr, setclientsArr] = useState<any>([]);
  const [isLoadn, setisLoadn] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Processing.");

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

  const handleVisits = (data: any) => {
    setClient(data);
  };

  const handleAdminNotes = (data: any) => {
    setClient(data);
    navigate(`/dashboard/clients/notes/${data.id}`);
  };

  const handleStatusUpdate = () => {};

  const columns = ClientdefColumns(
    handleViewNavigation,
    handleStatusUpdate,
    handleSchedules,
    handleVisits,
    handleAdminNotes
  );

  const fetchClients = () => {
    setisLoadn(true);
    setskeletonMessage("Fetching clients");
    return getClients().subscribe({
      next: (response) => {
        if (response) {
          const res = response.data;
          const transformed = res.map((obj: any) => {
            return {
              id_: obj.uuid,
              id: obj.uuid,
              photo: obj.profile_picture ?? Avatar,
              clientId: "---",
              firstName: obj.first_name,
              lastName: obj.last_name,
              middleName: obj.middle_name ?? "---",
              gender: "---",
              phone: "---",
              email: "---",
              status: "inactive",
              dob: "---",
              SocialSecurity: "---",
              location: {
                address: "---",
                city: "---",
                state: "---",
                zip: "---",
              },
              phones: [
                { type: "Login", phoneNumber: "---" },
                { type: "Work", phoneNumber: "---" },
              ],
              medicalInfo: {
                admitted: "---",
                livingWith: "---",
                ableToRespond: "---",
                allergies: "---",
                classification: "---",
                condition: "---",
                priority: "---",
              },
            };
          });
          setclientsArr(transformed);
        }
      },
      error: (err) => {
        console.log(err);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  useEffect(() => {
    const clientSub = fetchClients();
    return () => {
      clientSub.unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <PageHeader title="Clients" />
          <Button
            className=" cursor-pointer"
            onClick={() => {
              navigate("/dashboard/settings/onboard/client");
            }}
          >
            Add Client
          </Button>
        </div>

        <div className="mt-10 mb-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Total</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>
          <div className="h-36  border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Active</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>
          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Expired</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-500">
              0
            </h1>
          </div>
          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Pending</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>
          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Terminated</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>

          <div className="h-36  border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Hospitalized</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>

          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">On Hold</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-500">
              0
            </h1>
          </div>

          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Suspended</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>

          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Transfer</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>

          <div className="h-36 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Waiting Active Coverage</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              0
            </h1>
          </div>
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
      {isLoadn && <LoadingSkeleton name={skeletonMessage} />}
    </React.Fragment>
  );
}
