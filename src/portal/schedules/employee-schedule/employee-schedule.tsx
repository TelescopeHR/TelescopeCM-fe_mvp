import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header/page-header";
import { useCareGiverStore } from "@/store/caregiverStore";
import { ScheduleDefColumns } from "./schedule-columns";
import { ScheduleData } from "./em-schudele-data";
import { AddScheduleDialog } from "../add-scheudle-dialog/add-schedule";
import { useState } from "react";

export default function EmployeeSchedule() {
  const [openDialog, setopenDialog] = useState({
    isopen: false,
    name: "",
  });
  const { careGiver } = useCareGiverStore();

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
        <h2 className="text-sm text-cyan-600 font-bold mr-2">EMPLOYEE</h2> /
        <span className="font-bold text-sm ml-2">
          {" "}
          {careGiver.firstName + " " + careGiver.lastName}
        </span>
      </div>

      <div className="w-full flex items-center justify-between">
        <PageHeader title="Schedule" hasBack={true} />
        <div className="mr-2">
          <Button
            className=" cursor-pointer bg-slate-800 text-white"
            onClick={() => setopenDialog({ name: "addSchedule", isopen: true })}
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

      {openDialog.isopen && openDialog.name == "addSchedule" && (
        <AddScheduleDialog
          open={openDialog.isopen}
          setOpen={() => setopenDialog({ name: "", isopen: false })}
        />
      )}
    </>
  );
}
