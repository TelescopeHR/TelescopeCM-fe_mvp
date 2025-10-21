import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header/page-header";
import { useCareGiverStore } from "@/store/caregiverStore";
import { ScheduleDefColumns } from "./schedule-columns";
// import { ScheduleData } from "./em-schudele-data";
import { AddScheduleDialog } from "../add-scheudle-dialog/add-schedule";
import { useEffect, useState } from "react";
import {
  deleteSchedules,
  getSchedules,
} from "@/services/employee-service/employee-service";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { IScheduleResponse } from "@/models/schedule-module";
import { formatDate } from "@/utils/utils";
import { ScheduleDetails } from "../schedule-details/schedule-details-dialog";
import { DeleteDialog } from "@/components/delete-dialog/delete-dialog";
import { EditScheduleDialog } from "../edit-schedule-dialog/edit-schedule";

export default function EmployeeSchedule() {
  const [openDialog, setopenDialog] = useState({
    isopen: false,
    name: "",
  });
  const [mergedParams, setmergedParams] = useState({
    paginate: true,
    page: 1,
    per_page: 20,
  });
  const [schedulesArr, setschedulesArr] = useState<any[]>([]);
  const [totalPages, settotalPages] = useState(1);
  const [isLoadn, setisLoadn] = useState(false);
  const [selectedRow, setselectedRow] = useState<any>({});
  const { careGiver } = useCareGiverStore();

  const handleViewNavigation = (row: any) => {
    setselectedRow(row);
    setopenDialog({ name: "details", isopen: true });
  };

  const handleEdit = (row: any) => {
    setselectedRow(row);
    setopenDialog({ name: "edit", isopen: true });
  };

  const handleDeleteDialog = (row: any) => {
    setselectedRow(row);
    setopenDialog({ name: "delete", isopen: true });
  };

  const handleStatus = () => {};

  const columns = ScheduleDefColumns(
    handleViewNavigation,
    handleEdit,
    handleDeleteDialog,
    handleStatus
  );

  const fetchSchedules = () => {
    setisLoadn(true);
    return getSchedules(mergedParams, careGiver.id).subscribe({
      next: (response) => {
        if (response) {
          const { per_page, total } = response.pagination;
          const totalPagx = Math.ceil(total / per_page);
          settotalPages(totalPagx);
          const schedulesArray = response.data;
          const transformed = schedulesArray.map(
            (obj: IScheduleResponse, idx: number) => {
              return {
                id: obj.id,
                scheduleId: idx + 1,
                scheduleType: obj.type.name,
                startDate: formatDate(obj.start_date),
                endDate: formatDate(obj.end_date),
                hours: obj.hours,
                rate: `$${obj.rate}`,
                rateNumber: obj.rate,
                client: obj.client,
                status: obj.status.toLowerCase(),
                weeklySchedule: obj.weekly_schedule,
              };
            }
          );
          setschedulesArr(transformed);
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  const handleDelete = () => {
    setisLoadn(true);
    return deleteSchedules(selectedRow.id).subscribe({
      next: (response) => {
        if (response) {
          toast.success("Schedule deleted!");
          fetchSchedules();
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  useEffect(() => {
    const subscription = fetchSchedules();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
          data={schedulesArr}
          searchPlaceholder="Search"
          filterArray={[]}
          showSerialNumber={false}
          withExport={true}
          withDate={false}
          searchColumn="clientName"
          currentPage={mergedParams.page}
          totalCount={totalPages}
          apiCall={(pageNo: number) => {
            setmergedParams((prev) => {
              return { ...prev, page: pageNo };
            });
          }}
        />
      </div>

      {openDialog.isopen && openDialog.name == "addSchedule" && (
        <AddScheduleDialog
          open={openDialog.isopen}
          setOpen={() => setopenDialog({ name: "", isopen: false })}
          makeApiCall={fetchSchedules}
          userId={careGiver.id}
        />
      )}

      {openDialog.isopen && openDialog.name == "edit" && (
        <EditScheduleDialog
          open={openDialog.isopen}
          setOpen={() => setopenDialog({ name: "", isopen: false })}
          makeApiCall={fetchSchedules}
          data={selectedRow}
        />
      )}

      {openDialog.isopen && openDialog.name == "details" && (
        <ScheduleDetails
          open={openDialog.isopen}
          setopen={() => setopenDialog({ name: "", isopen: false })}
          details={selectedRow}
        />
      )}

      {openDialog.isopen && openDialog.name == "delete" && (
        <DeleteDialog
          open={openDialog.isopen}
          setopen={() => setopenDialog({ name: "", isopen: false })}
          description={`You're about to delete a schedule,  Do you want to proceed?`}
          handleProceed={handleDelete}
        />
      )}

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
