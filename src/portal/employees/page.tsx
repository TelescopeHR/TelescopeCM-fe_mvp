// import { employeesData } from "@/utils/data";

import { EmployeedefColumns } from "./employee-columns";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";
import Avatar from "@/assets/avatar.png";
import { useCareGiverStore } from "@/store/caregiverStore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState, Fragment } from "react";
import {
  getEmployees,
  getEmployeesStats,
} from "@/services/employee-service/employee-service";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import {
  IEmployeesStatResp,
  IEmployeeTableRespArr,
} from "@/models/employee-model";
import { containsActive, formatDate, getCurrentDate } from "@/utils/utils";
import { ExportExcelService } from "@/services/export-service/export-excel.service";
import { Button } from "@/components/ui/button";
// import { useQuery } from "@tanstack/react-query";

export function EmployeePage() {
  const [isLoadn, setisLoadn] = useState(false);
  const [statsData, setstatsData] = useState<IEmployeesStatResp>({
    total: 0,
    active_full: 0,
    active_part: 0,
    inactive: 0,
    terminated: 0,
    terminated_not_eligible: 0,
  });
  const [employees, setemployees] = useState<IEmployeeTableRespArr | any>([]);
  const [mergedParams, setmergedParams] = useState({
    paginate: true,
    page: 1,
    per_page: 20,
  });
  const [totalPages, settotalPages] = useState(1);
  const { setCareGiver } = useCareGiverStore();

  const navigate = useNavigate();

  const handleViewNavigation = (data: any) => {
    setCareGiver(data);
    navigate(`/dashboard/employees/employee/${data.id}`);
  };

  const handleSchedules = (data: any) => {
    setCareGiver(data);
    navigate(`/dashboard/employees/schedule/${data.id}`);
  };

  const handleVisits = (data: any) => {
    setCareGiver(data);
  };
  const handleStatusUpdate = () => {};

  const columns = EmployeedefColumns(
    handleViewNavigation,
    handleStatusUpdate,
    handleSchedules,
    handleVisits
  );

  // ===== export functions =================================
  const onExport = (exportType: string, details: any) => {
    if (exportType === "Excel") {
      setisLoadn(true);
      const edata: any = [];
      const _rawData: any = [];
      const fileName = `Employees - ${getCurrentDate().date} - ${
        getCurrentDate().time
      }`;
      const udt: any = {
        data: [],
      };

      details.forEach((item: any, id: number) => {
        udt.data.push({
          "S/N": id + 1,
          "Employee ID": item.employeeId,
          "First Name": item.firstName,
          "Middele Name": item.middleName,
          "Last Name": item.lastName,
          Email: item.email,
          Phone: item?.phone,
          Gender: item.gender,
          Status: item.status,
          DateAdded: `${
            item?.rowData?.created_at
              ? formatDate(item?.rowData?.created_at)
              : "---"
          }`,
        });
      });

      edata.push(udt);
      edata[0].data.forEach((row: any) => {
        _rawData.push(Object.values(row));
      });

      const reportData = {
        title: "EMPLOYEES",
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

  const fetchEmployeesStats = () => {
    return getEmployeesStats().subscribe({
      next: (response) => {
        if (response) {
          const stats: IEmployeesStatResp = response.data;
          setstatsData(stats);
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {},
    });
  };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["emplyStats"],
  //   queryFn: fetchEmployeesStats,
  // });

  const fetchEmployees = () => {
    setisLoadn(true);
    return getEmployees(mergedParams).subscribe({
      next: (response) => {
        if (response) {
          const { per_page, total } = response.pagination;
          const totalPagx = Math.ceil(total / per_page);
          settotalPages(totalPagx);
          const emplyArray: IEmployeeTableRespArr = response.data;
          const transformed = emplyArray.map((obj) => {
            return {
              id_: obj.id,
              id: obj.id,
              photo: obj.photo ?? Avatar,
              employeeId: obj.employee_id,
              firstName: obj.first_name,
              lastName: obj.last_name,
              middleName: obj.middle_name ?? "---",
              gender: obj.gender,
              phone: obj.phone,
              email: obj?.email ?? "---",
              status: obj.employee_status,
              tablestatus: containsActive(obj.employee_status)
                ? "Active"
                : "Inactive",
              dob: obj.birth_date ? formatDate(obj.birth_date) : "---",
              SocialSecurity: obj.social_security ?? "---",
              location: {
                address: obj.address?.address ?? "---",
                city: obj.address?.city ?? "---",
                state: obj.address?.state ?? "---",
                zip: obj.address?.zip ?? "---",
              },
              phones: obj.phone_numbers,
              backgroundData: {
                hiredate: obj.background?.hire_date ?? "---",
                applicationDate: obj.background?.application_date ?? "---",
                orientationDate: obj.background?.orientation_date ?? "---",
                signedJobDescriptionDate:
                  obj.background?.signed_job_description_date ?? "---",
                signedPolicyProcedureDate:
                  obj.background?.signed_policy_procedure_date ?? "---",
                evaluatedAssignedTaskDate:
                  obj.background?.evaluated_assigned_date ?? "---",
                lastEvaluationDate:
                  obj.background?.last_evaluation_date ?? "---",
                terminationDate: obj.background?.termination_date ?? "---",
                numberOfReferences:
                  obj.background?.number_of_references ?? "---",
              },
            };
          });
          setemployees(transformed);
          // console.log("employees response===>", emplyArray);
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
    const subscription = fetchEmployees();
    const statsSub = fetchEmployeesStats();

    return () => {
      subscription.unsubscribe();
      statsSub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [mergedParams]);

  return (
    <Fragment>
      <div className="w-full pb-20">
        <div className="w-full flex items-center justify-between pr-4">
          <PageHeader title="Employees" />
          <Button
            className=" cursor-pointer"
            onClick={() => {
              navigate("/dashboard/settings/onboard/employee");
            }}
          >
            Add Employee
          </Button>
        </div>
        {/* stats */}
        <div className="mt-10 mb-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="min-h-40 border rounded p-4">
            <h2 className=" font-semibold">Total</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              {statsData.total}
            </h1>
          </div>
          <div className="min-h-40 border rounded p-4 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <h2 className=" font-semibold">Active </h2>{" "}
              <span className=" text-xs">(Full time)</span>
            </div>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
              {statsData.active_full}
            </h1>
          </div>
          <div className="min-h-40 border rounded p-4 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <h2 className=" font-semibold">Active </h2>{" "}
              <span className=" text-xs">(Part time)</span>
            </div>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-500">
              {statsData.active_part}
            </h1>
          </div>

          <div className="min-h-40 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Inactive</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-500">
              {statsData.inactive}
            </h1>
          </div>

          <div className="min-h-40 border rounded p-4 cursor-pointer">
            <h2 className=" font-semibold">Terminated</h2>
            <h1 className=" mt-5 font-bold text-4xl text-center text-red-400 dark:text-red-400">
              {statsData.terminated}
            </h1>
          </div>

          <div className="min-h-40 border rounded p-4 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <h2 className=" font-semibold">Terminated</h2>
              <span className=" text-xs">(Not eligible)</span>
            </div>
            <h1 className=" mt-5 font-bold text-4xl text-center text-red-400 dark:text-red-400">
              {statsData.terminated_not_eligible}
            </h1>
          </div>
        </div>
        {/* ======= */}
        <DataTable
          columns={columns}
          data={employees}
          searchPlaceholder="Search by Employee ID"
          filterArray={[]}
          showSerialNumber={false}
          withExport={true}
          withDate={false}
          handleExport={onExport}
          searchColumn="employeeId"
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
    </Fragment>
  );
}
