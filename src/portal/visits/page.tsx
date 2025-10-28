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
  getCurrentDate,
} from "@/utils/utils";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { toast } from "react-toastify";
import { getAllVisits } from "@/services/visits-service/visit-service";
import { IVistsResponse } from "@/models/vistis-model";
import { ExportExcelService } from "@/services/export-service/export-excel.service";

export default function Visitspage() {
  const [isLoadn, setisLoadn] = useState(false);
  const [employees, setemployees] = useState<any>([]);
  const [clientsArr, setclientsArr] = useState<any>([]);
  const [visitsArr, setvisitsArr] = useState<any>([]);
  const [mergedparams, setmergedparams] = useState<any>({
    page: 1,
    paginate: true,
    per_page: 10,
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

  // ===== export functions =================================
  const onExport = (exportType: string, details: any) => {
    if (exportType === "Excel") {
      setisLoadn(true);
      const edata: any = [];
      const _rawData: any = [];
      const fileName = `Visits - ${getCurrentDate().date} - ${
        getCurrentDate().time
      }`;
      const udt: any = {
        data: [],
      };

      details.forEach((item: any, id: number) => {
        udt.data.push({
          "S/N": id + 1,
          "Employee ID": item.employeeId,
          "Employe Name": item.employeeName,
          "Client Name": item.clientName,
          "Pay Rate": item.pay_rate,
          date: item.date,
          "Time In": item.timeIn,
          "Time Out": item?.timeOut,
          "Verified In": item.verifiedIn,
          "Verified Out": item.verifiedOut,
          Status: item.status,
        });
      });

      edata.push(udt);
      edata[0].data.forEach((row: any) => {
        _rawData.push(Object.values(row));
      });

      const reportData = {
        title: "VISITS",
        fileName: fileName,
        data: _rawData,
        headers: Object.keys(udt.data[0]),
      };
      const exportService = new ExportExcelService();
      exportService.exportExcel(reportData, {
        adjustColums: [
          {
            columnNumber: 2,
            columWidth: 30,
          },
          {
            columnNumber: 3,
            columWidth: 45,
          },
          {
            columnNumber: 4,
            columWidth: 37,
          },
          {
            columnNumber: 5,
            columWidth: 26,
          },
          {
            columnNumber: 6,
            columWidth: 22,
          },
          {
            columnNumber: 7,
            columWidth: 18,
          },

          {
            columnNumber: 8,
            columWidth: 18,
          },
        ],
      });
      setisLoadn(false);
    }
  };
  // =================================================================

  useEffect(() => {
    const fetchEmplySub = fetchEmployees();
    const fetchClientSub = fetchClients();

    return () => {
      fetchEmplySub.unsubscribe();
      fetchClientSub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setisLoadn(true);
    const visitsSub = fetchVisits();
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
          handleExport={onExport}
          withDate={true}
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
          apicall={fetchVisits}
          setOpen={() => {
            setdialogData({ open: false, name: "" });
          }}
        />
      )}

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
