import { employeesData } from "@/utils/data";

import { EmployeedefColumns } from "./employee-columns";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export function EmployeePage() {
  const handleViewNavigation = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data));
    // router.push("./products/product");
  };
  const triggerDelete = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data));
  };
  const handleStatusUpdate = () => {};

  const columns = EmployeedefColumns(
    handleViewNavigation,
    triggerDelete,
    handleStatusUpdate
  );
  return (
    <div className="w-full pb-20">
      <PageHeader title="Employees" />
      <div className="mt-10 mb-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="min-h-40 border rounded p-4">
          <h2 className=" font-semibold">Total</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
            100
          </h1>
        </div>
        <div className="min-h-40 border rounded p-4 cursor-pointer">
          <h2 className=" font-semibold">Active</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
            60
          </h1>
        </div>
        <div className="min-h-40 border rounded p-4 cursor-pointer">
          <h2 className=" font-semibold">Inactive</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-500">
            22
          </h1>
        </div>
        <div className="min-h-40 border rounded p-4 cursor-pointer">
          <h2 className=" font-semibold">Terminated</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-red-400 dark:text-red-400">
            18
          </h1>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={employeesData}
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
