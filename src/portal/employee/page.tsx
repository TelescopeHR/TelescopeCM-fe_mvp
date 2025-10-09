import LoadingSkeleton from "@/components/skeleton/skeleton";
import PageHeader from "@/components/ui/page-header/page-header";
import { getEmployee } from "@/services/employee-service/employee-service";
import { useCareGiverStore } from "@/store/caregiverStore";
import Avatar from "@/assets/avatar.png";
import {
  containsActive,
  ellipsisText,
  formatAndCapitalizeString,
  formatDate,
} from "@/utils/utils";
import { CalendarCheck2, LocateFixed, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function EmployeeHome() {
  const { careGiver } = useCareGiverStore();
  const [isLoadn, setisLoadn] = useState(false);
  const navigate = useNavigate();
  const { setCareGiver } = useCareGiverStore();

  const name = careGiver.firstName + " " + careGiver.lastName;

  const fetchEmployee = () => {
    setisLoadn(true);
    return getEmployee(careGiver.id).subscribe({
      next: (response) => {
        if (response) {
          // console.log("emp data", response.data);
          const obj: any = response.data;
          const transformed = {
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
              lastEvaluationDate: obj.background?.last_evaluation_date ?? "---",
              terminationDate: obj.background?.termination_date ?? "---",
              numberOfReferences: obj.background?.number_of_references ?? "---",
            },
          };

          setCareGiver(transformed);
          console.log("employees response===>", transformed);
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
    if (!careGiver) navigate(-1);
  }, [careGiver, navigate]);

  useEffect(() => {
    const sub = fetchEmployee();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="w-full pb-20">
        <h2 className="mb-2 font-bold text-cyan-600 text-sm">EMPLOYEE</h2>
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-1 lg:items-center">
          <div className="lg:w-4/12">
            <PageHeader title={ellipsisText(name, 14)} hasBack />
          </div>

          <div className="w-full flex gap-x-4 lg:gap-x-8 mt-1">
            <div
              className="font-bold cursor-pointer flex items-center gap-1 text-xs lg:text-sm"
              onClick={() =>
                navigate(`/dashboard/employees/schedule/${careGiver.id}`)
              }
            >
              <CalendarCheck2 className="w-4 lg:w-5" />
              Schedules
            </div>
            <div className="font-bold cursor-pointer flex items-center gap-1 text-xs lg:text-sm">
              <LocateFixed className="w-4 lg:w-5" />
              Visits
            </div>
          </div>
        </div>
        {/* ======== */}
        <div className="w-full min-h-screen mt-4 lg:p-10 border rounded-2xl">
          <div className="w-full flex justify-center mb-10 bg-[#AED6F1] dark:bg-[#15374d] py-10 rounded-md">
            <div className="w-32 h-32 border-2 border-[#3c7da7] rounded-4xl bg-slate-200 overflow-hidden flex items-center justify-center ring-0 ring-blue-300">
              {careGiver.photo ? (
                <img
                  src={careGiver.photo}
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-slate-500 text-sm font-medium">👤</span>
              )}
            </div>
          </div>

          <hr />
          {/* ==== bio ==== */}
          <div className="py-6 px-5 rounded my-10 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-x-4 w-full">
              <h2 className=" text-xl font-bold">Bio Data</h2>
              <div className="cursor-pointer">
                <SquarePen size={18} />
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row gap-2 items-start justify-start">
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    First Name :
                  </div>
                  <span className="font-semibold"> {careGiver.firstName}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Middle Name :
                  </div>
                  <span className="font-semibold">
                    {careGiver.middleName ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Last Name :
                  </div>
                  <span className="font-semibold"> {careGiver.lastName}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Email :
                  </div>
                  <span className="font-semibold"> {careGiver.email}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Employee's ID :
                  </div>
                  <span className="font-semibold"> {careGiver.employeeId}</span>
                </div>
              </div>

              {/* ---- */}
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Status:
                  </div>
                  <span className="font-semibold"> {careGiver.status}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Birth Date :
                  </div>
                  <span className="font-semibold">
                    {careGiver.dob ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Gender :
                  </div>
                  <span className="font-semibold"> {careGiver.gender}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Social security :
                  </div>
                  <span className="font-semibold">
                    {careGiver.SocialSecurity}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Company :
                  </div>
                  <span className="font-semibold"> ABC Agency</span>
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* ====== address ==== */}
          <div className="py-6 px-5 rounded my-10 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-x-4 w-full">
              <h2 className=" text-xl font-bold">Address</h2>
              <div className="cursor-pointer">
                <SquarePen size={18} />
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row gap-2 items-start justify-start">
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Address:
                  </div>
                  <span className="font-semibold">
                    {careGiver.location.address ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    City :
                  </div>
                  <span className="font-semibold">
                    {careGiver.location.city ?? "---"}
                  </span>
                </div>
              </div>

              {/* ---- */}
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    State:
                  </div>
                  <span className="font-semibold">
                    {" "}
                    {careGiver.location.state ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Zip :
                  </div>
                  <span className="font-semibold">
                    {careGiver.location.zip ?? "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* ====== phone numbers ==== */}
          <div className="py-6 px-5 rounded my-10 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-x-4 w-full">
              <h2 className=" text-xl font-bold">Phone Numbers</h2>
              <div className="cursor-pointer">
                <Plus size={18} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 items-start justify-start">
              {careGiver.phones &&
                careGiver.phones.map((obj: any, idx: number) => (
                  <div
                    className="w-full  flex flex-col gap-y-4 border p-4 py-8 rounded"
                    key={idx}
                  >
                    <div className="flex items-center">
                      <div className="font-semibold  w-4/12">Type</div>
                      <div className="font-semibold text-gray-500 w-4/12">
                        {formatAndCapitalizeString(obj.type) ?? "--"}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="font-semibold w-4/12">Number</div>
                      <div className="font-semibold text-gray-500 w-4/12">
                        {obj.phone_number}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <hr />

          {/* ==== background ==== */}
          <div className="py-6 px-5 rounded my-10 bg-slate-50 dark:bg-slate-900">
            <div className="flex gap-x-4 w-full">
              <h2 className=" text-xl font-bold">Background</h2>
              <div className="cursor-pointer">
                <SquarePen size={18} />
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row gap-2 items-start justify-start">
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Hire date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.hiredate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Application date:
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.applicationDate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Orientation date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.orientationDate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Signed job description date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.signedJobDescriptionDate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Signed policy procedure date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.signedPolicyProcedureDate ??
                      "---"}
                  </div>
                </div>
              </div>

              {/* ---- */}
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Evaluated assigned task date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.evaluatedAssignedTaskDate ??
                      "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Last evaluation date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.lastEvaluationDate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Termination date :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.terminationDate ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Number of references :
                  </div>
                  <div className="font-semibold">
                    {careGiver.backgroundData.numberOfReferences ?? "---"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>

      {isLoadn && <LoadingSkeleton />}
    </>
  );
}
