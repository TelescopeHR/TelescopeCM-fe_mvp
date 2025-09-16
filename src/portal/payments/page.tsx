import { studentsData } from "@/utils/data";

import { StudentdefColumns } from "./student-columns";
import { DataTable } from "@/components/data-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export function FinancePage() {
  const handleViewNavigation = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data));
    // router.push("./products/product");
  };
  const triggerDelete = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data));
  };
  const handleStatusUpdate = () => {};

  const columns = StudentdefColumns(
    handleViewNavigation,
    triggerDelete,
    handleStatusUpdate
  );
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={studentsData}
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
