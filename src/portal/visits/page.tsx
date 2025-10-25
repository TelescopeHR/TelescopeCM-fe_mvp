import PageHeader from "@/components/ui/page-header/page-header";
import { useEffect, useState } from "react";
import { VisitDefColumns } from "./visit-columns";
import { Button } from "@/components/ui/button";

import { AddVisitDialog } from "./add-visit-dialog";
import { VisitTable } from "@/components/visit-table";
import {
  getClients,
  getEmployees,
} from "@/services/employee-service/employee-service";
import {
  capitalizeFirst,
  formatAndCapitalizeString,
  formatDate,
} from "@/utils/utils";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { toast } from "react-toastify";
import { getAllVisits } from "@/services/visits-service/visit-service";
import { IVistsResponse } from "@/models/vistis-model";

export default function Visitspage() {
  const [isLoadn, setisLoadn] = useState(false);
  const [employees, setemployees] = useState<any>([]);
  const [clientsArr, setclientsArr] = useState<any>([]);
  const [visitsArr, setvisitsArr] = useState<any>([]);
  const [mergedparams, setmergedparams] = useState<any>({
    page: 1,
    paginate: true,
    per_page: 50,
  });
  const [totalPages, settotalPages] = useState(1);

  const columns = VisitDefColumns();
  const [dialogData, setdialogData] = useState({ open: false, name: "" });

  const fetchEmployees = () => {
    setisLoadn(true);
    return getEmployees({}).subscribe({
      next: (response) => {
        if (response) {
          const emplyArray = response.data;
          const transformed = emplyArray.map((obj: any) => {
            return {
              id: obj.id,
              value: obj.id,
              label:
                capitalizeFirst(obj.first_name) +
                " " +
                capitalizeFirst(obj.last_name) +
                "(" +
                obj.employee_id +
                ")",
            };
          });
          setemployees(transformed);
        }
      },
      error: () => {
        setisLoadn(false);
      },
      complete: () => {},
    });
  };

  const fetchClients = () => {
    setisLoadn(true);
    return getClients().subscribe({
      next: (response) => {
        if (response) {
          const res = response.data;
          const transformed = res.map((obj: any) => {
            return {
              id: obj.uuid,
              value: obj.uuid,
              label: `${obj.first_name} ${obj.middle_name ?? ""} ${
                obj.last_name
              }`,
            };
          });
          setclientsArr(transformed);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  };

  const fetchVisits = () => {
    return getAllVisits(mergedparams).subscribe({
      next: (response) => {
        if (response) {
          const { per_page, total } = response.pagination;
          const totalPagx = Math.ceil(total / per_page);
          settotalPages(totalPagx);
          const visitArray = response.data.visits;
          const transformed = visitArray.map((obj: IVistsResponse) => {
            return {
              id_: obj.id,
              id: obj.id,

              employeeId: "---",
              employeeName: `${obj.employee.full_name}`,
              clientName: obj.client.full_name,
              date: formatDate(obj.date),
              timeIn: obj.time_in,
              timeOut: obj.time_out,
              verifiedIn: obj.verified_in ?? "---",
              verifiedOut: obj.verified_out ?? "---",
              status: formatAndCapitalizeString(obj.status),
              pay_rate: obj.pay_rate,
            };
          });
          setvisitsArr(transformed);
          console.log("visit response===>", visitArray);
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
    const fetchEmplySub = fetchEmployees();
    const fetchClientSub = fetchClients();

    return () => {
      fetchEmplySub.unsubscribe();
      fetchClientSub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const visitsSub = fetchVisits();
    // console.log("===>", mergedparams);
    return () => {
      visitsSub.unsubscribe();
    };
  }, [mergedparams]);

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <PageHeader title="Visits" hasBack />
        <Button
          className=" cursor-pointer"
          onClick={() => {
            setdialogData({ open: true, name: "addvisit" });
          }}
        >
          Add Visit
        </Button>
      </div>

      {/* ==== table ======= */}
      <div className="mt-10 mb-20">
        <VisitTable
          columns={columns}
          data={visitsArr}
          searchPlaceholder={"Search by Employee ID"}
          clientArr={clientsArr}
          employeeArr={employees}
          handleFilter={(value) => {
            setmergedparams((prev: any) => {
              return { ...prev, status: value };
            });
          }}
          handleDate={(obj) => {
            if (obj.startDate == null && obj.endDate == null) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { date_from, date_to, ...rest } = mergedparams;
              setmergedparams({ ...rest });
            } else {
              setmergedparams((prev: any) => {
                return {
                  ...prev,
                  date_from: obj.startDate,
                  date_to: obj.endDate,
                };
              });
            }
          }}
          showSerialNumber={false}
          withExport={true}
          withDate={true}
          handleExport={() => ""}
          searchColumn="employeeId"
          currentPage={mergedparams.page}
          totalCount={totalPages}
          params={mergedparams}
          setparams={setmergedparams}
          apiCall={(pageNo: number) => {
            setmergedparams((prev: any) => {
              return { ...prev, page: pageNo };
            });
          }}
        />
      </div>

      {dialogData.name == "addvisit" && dialogData.open && (
        <AddVisitDialog
          open={dialogData.open}
          setOpen={() => {
            setdialogData({ open: false, name: "" });
          }}
        />
      )}

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
