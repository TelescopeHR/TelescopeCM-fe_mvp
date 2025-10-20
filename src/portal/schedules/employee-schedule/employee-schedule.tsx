import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header/page-header";
import { useCareGiverStore } from "@/store/caregiverStore";
import { ScheduleDefColumns } from "./schedule-columns";
// import { ScheduleData } from "./em-schudele-data";
import { AddScheduleDialog } from "../add-scheudle-dialog/add-schedule";
import { useEffect, useState } from "react";
import { getSchedules } from "@/services/employee-service/employee-service";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { IScheduleResponse } from "@/models/schedule-module";
import { formatDate } from "@/utils/utils";

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

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
