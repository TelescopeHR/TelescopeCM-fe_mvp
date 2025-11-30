import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { IEmployeeTableRespArr } from "@/models/employee-model";

import Avatar from "@/assets/avatar.png";
import { ScheduleDefColumns } from "./schedule-columns";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { capitalizeFirst, containsActive, formatDate } from "@/utils/utils";
import { toast } from "react-toastify";
import { getEmployees } from "@/services/employee-service/employee-service";

export default function ScheduleCalendar() {
  const [isLoadn, setisLoadn] = useState(false);
  const [employees, setemployees] = useState<IEmployeeTableRespArr | any>([]);
  const [mergedParams, setmergedParams] = useState({
    paginate: true,
    page: 1,
    per_page: 20,
    status: 0,
  });
  const [totalPages, settotalPages] = useState(1);

  const columns = ScheduleDefColumns();

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
              photo: obj.profile_picture ?? Avatar,
              employeeId: obj.employee_id,
              employee:
                capitalizeFirst(obj.first_name) +
                " " +
                capitalizeFirst(obj?.middle_name ?? " ") +
                " " +
                capitalizeFirst(obj.last_name),
              firstName: capitalizeFirst(obj.first_name),
              lastName: capitalizeFirst(obj.last_name),
              middleName: obj.middle_name
                ? capitalizeFirst(obj.middle_name)
                : "---",
              gender: obj.gender,
              phone: obj.phone,
              email: obj?.email ?? "---",
              status: obj.employee_status,
              tablestatus: containsActive(obj.employee_status)
                ? "Active"
                : "Inactive",
              dob: obj.birthday ? formatDate(obj.birthday) : "---",
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
      error: (err: any) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, [mergedParams]);

  return (
    <>
      <div>
        {/* <div className="w-full flex items-center gap-x-2 border">
        <div className="w-2/12">Employee</div>
        <div className="w-2/12 border-r">Mon</div>
        <div className="w-2/12 border-r">Tue</div>
        <div className="w-2/12 border-r">Wed</div>
        <div className="w-2/12 border-r">Thur</div>
        <div className="w-2/12 border-r">Fri</div>
        <div className="w-2/12 border-r">Sat</div>
        <div className="w-2/12 border-r">Sun</div>
      </div>

      <div className="flex flex-col"></div> */}

        <DataTable
          columns={columns}
          data={employees}
          searchPlaceholder="Search by Employee ID"
          filterArray={[]}
          handleFilter={() => {}}
          showSerialNumber={false}
          withExport={true}
          withDate={false}
          handleExport={() => ""}
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
    </>
  );
}
