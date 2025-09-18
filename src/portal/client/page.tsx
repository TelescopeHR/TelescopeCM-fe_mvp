import PageHeader from "@/components/ui/page-header/page-header";
import { useClientStore } from "@/store/clientStore";
import { CalendarCheck2, LocateFixed, Plus, SquarePen } from "lucide-react";
import { useEffect } from "react";

export default function ClientHome() {
  const { client } = useClientStore();
  const clientObj = client;

  useEffect(() => {
    console.log("==> client", clientObj);
    return () => {};
  }, [clientObj]);

  return (
    <>
      <div className="w-full pb-20">
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-1 lg:items-center">
          <div className="lg:w-4/12">
            <PageHeader
              title={clientObj.firstName + " " + clientObj.lastName}
              hasBack
            />
          </div>

          <div className="w-full flex gap-x-8 mt-1">
            <div className="font-bold cursor-pointer flex items-center gap-1">
              <CalendarCheck2 size={20} />
              Schedules
            </div>
            <div className="font-bold cursor-pointer flex items-center gap-1">
              <LocateFixed />
              Visits
            </div>
          </div>
        </div>
        {/* ======== */}
        <div className="w-full min-h-screen mt-4 lg:p-10 border rounded-2xl">
          <div className="w-full flex justify-center mb-10">
            <div className="w-32 h-32 rounded-4xl bg-slate-200 overflow-hidden flex items-center justify-center ring-0 ring-blue-300">
              {clientObj.photo ? (
                <img
                  src={clientObj.photo}
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
                  <span className="font-semibold"> {clientObj.firstName}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Middle Name :
                  </div>
                  <span className="font-semibold">
                    {clientObj.middleName ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Last Name :
                  </div>
                  <span className="font-semibold"> {clientObj.lastName}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Email :
                  </div>
                  <span className="font-semibold"> {clientObj.email}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Employee's ID :
                  </div>
                  <span className="font-semibold"> {clientObj.employeeId}</span>
                </div>
              </div>

              {/* ---- */}
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Status:
                  </div>
                  <span className="font-semibold"> {clientObj.status}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Birth Date :
                  </div>
                  <span className="font-semibold">
                    {clientObj.dob ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Gender :
                  </div>
                  <span className="font-semibold"> {clientObj.gender}</span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Social security :
                  </div>
                  <span className="font-semibold">
                    {clientObj.SocialSecurity}
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
                    {clientObj.location.address ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    City :
                  </div>
                  <span className="font-semibold">
                    {clientObj.location.city ?? "---"}
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
                    {clientObj.location.state ?? "---"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="font-semibold text-gray-500 w-4/12">
                    Zip :
                  </div>
                  <span className="font-semibold">
                    {clientObj.location.zip ?? "---"}
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
              {clientObj.phones &&
                clientObj.phones.map((obj: any, idx: number) => (
                  <div
                    className="w-full  flex flex-col gap-y-4 border p-4 py-8 rounded"
                    key={idx}
                  >
                    <div className="flex items-center">
                      <div className="font-semibold  w-4/12">Type</div>
                      <div className="font-semibold text-gray-500 w-4/12">
                        {obj.type ?? "--"}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="font-semibold w-4/12">Number</div>
                      <div className="font-semibold text-gray-500 w-4/12">
                        {obj.phoneNumber}
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
              <h2 className=" text-xl font-bold">Medical Info</h2>
              <div className="cursor-pointer">
                <SquarePen size={18} />
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row gap-2 items-start justify-start">
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Admitted :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.admitted ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Living With:
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.livingWith ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Able to Respond :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.ableToRespond ?? "---"}
                  </div>
                </div>
              </div>

              {/* ---- */}
              <div className="w-full lg:w-6/12 flex flex-col gap-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Allergies :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.allergies ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Classification :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.classification ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Condition :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.condition ?? "---"}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="font-semibold text-gray-500 w-full lg:w-1/2">
                    Priority :
                  </div>
                  <div className="font-semibold">
                    {clientObj.medicalInfo.priority ?? "---"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
