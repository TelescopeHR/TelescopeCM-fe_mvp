import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header/page-header";
import { ScheduleDefColumns } from "./schedule-columns";
import { ScheduleData } from "./client-schedule-data";
import { useClientStore } from "@/store/clientStore";

export default function ClientSchedule() {
  const { client } = useClientStore();

  const handleViewNavigation = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleStatus = () => {};

  const columns = ScheduleDefColumns(
    handleViewNavigation,
    handleEdit,
    handleDelete,
    handleStatus
  );

  return (
    <>
      <div className="flex items-center mb-2">
        <h2 className="text-sm text-cyan-600 font-bold mr-2">CLIENT</h2> /
        <span className="font-bold text-sm ml-2">
          {" "}
          {client.firstName + " " + client.lastName}
        </span>
      </div>

      <div className="w-full flex items-center justify-between">
        <PageHeader title="Schedule" hasBack={true} />
        <div className="mr-2">
          <Button
            variant="outline"
            className=" cursor-pointer bg-slate-800 dark:bg-white text-white dark:text-slate-800"
          >
            Add Schedule
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <DataTable
          columns={columns}
          data={ScheduleData}
          searchPlaceholder="Search"
          filterArray={[]}
          showSerialNumber={false}
          withExport={true}
          withDate={false}
          searchColumn="productType"
        />
      </div>
    </>
  );
}
