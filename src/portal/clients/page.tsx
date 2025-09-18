import { clientData } from "@/utils/data";

import { ClientdefColumns } from "./client-columns";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";
import { useNavigate } from "react-router";
import { useClientStore } from "@/store/clientStore";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export function ClientsPage() {
  const { setClient } = useClientStore();
  const navigate = useNavigate();

  const handleViewNavigation = (data: any) => {
    setClient(data);
    navigate(`/dashboard/clients/client/${data.id}`);
  };

  const handleSchedules = (data: any) => {
    setClient(data);
  };

  const handleVisits = (data: any) => {
    setClient(data);
  };

  const handleStatusUpdate = () => {};

  const columns = ClientdefColumns(
    handleViewNavigation,
    handleStatusUpdate,
    handleSchedules,
    handleVisits
  );
  return (
    <div className="w-full">
      <PageHeader title="Clients" />
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
        data={clientData}
        searchPlaceholder="Search"
        filterArray={[]}
        showSerialNumber={false}
        withExport={true}
        withDate={false}
        searchColumn="productType"
      />
    </div>
  );
}
