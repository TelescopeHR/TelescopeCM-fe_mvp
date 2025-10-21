import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";
import { useCareGiverStore } from "@/store/caregiverStore";
// import { ScheduleData } from "./em-schudele-data";

import { useEffect, useState } from "react";
import { getSchedulesVisits } from "@/services/employee-service/employee-service";
import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { ScheduleVisitDefColumns } from "./schedule-visit-columns";
import { useNavigate, useParams } from "react-router-dom";
import { formatAndCapitalizeString, formatDate } from "@/utils/utils";
import { Clock9 } from "lucide-react";

export default function EmployeeScheduleVisits() {
  const [mergedParams, setmergedParams] = useState({
    paginate: true,
    page: 1,
    per_page: 20,
  });
  const [visitsArr, setvisitssArr] = useState<any[]>([]);
  const [visitsMeta, setvisitsMeta] = useState<any>({});
  const [totalPages, settotalPages] = useState(1);
  const [isLoadn, setisLoadn] = useState(false);
  const { careGiver } = useCareGiverStore();

  const columns = ScheduleVisitDefColumns();
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const fetchSchedulesVisits = () => {
    setisLoadn(true);
    if (scheduleId)
      return getSchedulesVisits(mergedParams, scheduleId).subscribe({
        next: (response) => {
          if (response) {
            const { per_page, total } = response.pagination;
            const totalPagx = Math.ceil(total / per_page);
            console.log(totalPagx);
            settotalPages(totalPagx);
            const visitsArray = response.data;
            const metaObj = {
              totalHours: visitsArray.total_scheduled_hours,
              verifieldHours: visitsArray.total_verified_hours,
            };
            setvisitsMeta(metaObj);
            console.log("response", metaObj);
            const transformed = visitsArray.visits.map(
              (obj: any, idx: number) => {
                console.log("obj", obj);
                return {
                  id: obj.id,
                  sn: idx + 1,
                  date: formatDate(obj.date),
                  timeIn: obj.time_in,
                  timeOut: obj.time_out,
                  verifiedIn: obj.verified_in ?? "---",
                  verifiedOut: obj.verified_out ?? "---",
                  status: formatAndCapitalizeString(obj.status),
                };
              }
            );
            setvisitssArr(transformed);
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
    if (!scheduleId) navigate(-1);
    const subscription = fetchSchedulesVisits()!;
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
        <div className="flex items-center justify-between pr-10 w-full">
          <div className="w-1/2">
            <PageHeader title="Schedule visits" hasBack={true} />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-x-10">
            <div className="flex items-center gap-x-1">
              <Clock9 size={20} />
              <div className="flex gap-x-2">
                <span>Total Hours:</span>
                <span>{parseFloat(visitsMeta.totalHours).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="flex items-center gap-x-1">
                <Clock9 size={20} />
                <span>Verified Hours</span>
                <span className="font-bold">
                  {parseFloat(visitsMeta.verifieldHours).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <DataTable
          columns={columns}
          data={visitsArr}
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

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
