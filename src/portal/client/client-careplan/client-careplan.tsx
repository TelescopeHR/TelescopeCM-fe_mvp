import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Dot, Pencil } from "lucide-react";

export default function ClientCarePlan() {
  return (
    <div className="min-h-60 flex flex-col gap-y-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-xl font-bold text-gray-800">Jeny Wilson</h4>
          <p className="text-sm">Client ID: 10122011201</p>
        </div>
        <div className="flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex bg-[#333E49]">
                <span className="">Active</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => ""} className=" cursor-pointer">
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className=" cursor-pointer bg-[#257BD2] hover:bg-[#257BD2] flex items-center gap-x-2"
            onClick={() => {}}
          >
            <Pencil />
            Edit Care Plan
          </Button>
        </div>
      </div>

      <div className="flex justify-between w-full min-h-80 gap-x-4">
        <div className="w-full lg:w-1/2 bg-[#F8F9FA] p-5">
          {/* ------ */}
          <div className="w-full flex items-center justify-between mb-2">
            <h4 className="text-base font-medium">Care Goals</h4>
          </div>
          {/* -------- */}
          <div className="w-full">
            <div className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ornare vitae urna pharetra malesuada. Maecenas dignissim leo a
              porta luctus. Etiam posuere, sem non eleifend commodo, ante mi
              vestibulum nulla, quis tristique libero est eget leo. Praesent a
              dolor sed turpis sodales euismod. Phasellus quis tellus risus.
              Fusce sodales sapien sapien, sit amet rhoncus sem sollicitudin
              quis. Vestibulum efficitur lobortis quam at rhoncus.
            </div>
          </div>
          <hr className="my-4" />

          <div className="w-full flex items-center justify-between mb-2">
            <h4 className="text-base font-medium">Care Summary</h4>
          </div>
          <div className="w-full flex flex-col gap-y-3 px-2 mb-4">
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">
                Cognitive Status:
              </div>
              <div className="w-1/2 text-sm text-right">Forgetful</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">
                Primary Condition:
              </div>
              <div className="w-1/2 text-sm text-right">Anxiety Disorder</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Mobility Level:</div>
              <div className="w-1/2 text-sm text-right">N/A</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Allergies:</div>
              <div className="w-1/2 text-sm text-right">Sea food</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Visit Type:</div>
              <div className="w-1/2 text-sm text-right">Morning Visit</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">
                Adititonal Information
              </div>
              <div className="w-1/2 text-sm text-right">--</div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="w-full flex items-center justify-between mb-2">
            <h4 className="text-base font-medium">Additional Information</h4>
          </div>
          <div className="w-full">
            <div className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ornare vitae urna pharetra malesuada. Maecenas dignissim leo a
              porta luctuste mi vestibulum nulla, quis tristique libero est eget
              leo.sollicitudin quis. Vestibulum efficitur lobortis quam at
              rhoncus.
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#F8F9FA] p-5 mb-2 flex flex-col gap-y-6">
            {/* -------------------- */}
            <div>
              <div className="w-full flex items-center justify-between">
                <h4 className="text-base font-medium">Tasks</h4>
              </div>
              <div className="flex flex-col gap-y-4">
                {/* 1 */}
                <div className="mt-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img src="/icons/pcare.svg" alt="icons" />
                      <span className="text-sm font-medium">Personal Care</span>
                    </div>
                    <span className="text-[0.50rem] font-bold bg-[#6941C6] text-white rounded-full py-[0.20rem] px-2">
                      UPDATED
                    </span>
                  </div>
                  <div className="flex w-full flex-wrap mt-4 gap-x-2  gap-y-1">
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Dressing
                      </span>
                    </div>
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Bathing
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Grooming
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Shaving and Oral Care
                      </span>
                    </div>
                  </div>
                </div>
                {/* -- */}

                {/* 2 */}
                <div className="mt-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img src="/icons/nutri.svg" alt="icons" />
                      <span className="text-sm font-medium">
                        Nutrition & Daily Support
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap mt-4 gap-x-2  gap-y-1">
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Feeding and Eating
                      </span>
                    </div>
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Meal Preparation
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Laundry
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Cleaning
                      </span>
                    </div>
                  </div>
                </div>
                {/* -- */}

                {/* 3*/}
                <div className="mt-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img src="/icons/health.svg" alt="icons" />
                      <span className="text-sm font-medium">
                        Health & Mobility
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap mt-4 gap-x-2  gap-y-1">
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Assist with Medication
                      </span>
                    </div>
                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Transfer
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Exercise
                      </span>
                    </div>

                    <div className="w-[48%] py-1 flex items-center gap-x-1">
                      <Dot strokeWidth={6} color="#257BD2" />
                      <span className=" text-[#757575] text-[14px] font-[500]">
                        Ambulation
                      </span>
                    </div>
                  </div>
                </div>
                {/* -- */}
              </div>
            </div>
            {/* -------------------- */}

            {/* -------------------- */}
            <div>
              <div className="w-full flex items-center justify-between">
                <h4 className="text-base font-medium">Medication</h4>
              </div>
              <div className="flex flex-col gap-y-4">
                {/* 1 */}
                <div className="mt-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img src="/icons/pill.svg" alt="icons" />
                      <span className="text-sm font-medium">Paracetamol</span>
                    </div>
                    <span className="text-[0.50rem] font-bold bg-[#6941C6] text-white rounded-full py-[0.20rem] px-2">
                      UPDATED
                    </span>
                  </div>
                  <div className="flex flex-col w-full mt-2 gap-x-2  gap-y-1">
                    <p className="text-[12px] text-[#757575]">
                      Prescription: Use 200mg daily morning and night
                    </p>
                    <p className="text-[12px] text-[#757575]">
                      Time: Morning, Evening
                    </p>

                    <p className="text-[12px] text-[#757575]">Day: Everyday</p>
                  </div>
                </div>
                {/* -- */}

                {/* 1 */}
                <div className="mt-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img src="/icons/pill.svg" alt="icons" />
                      <span className="text-sm font-medium">Ibuprofen</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full mt-2 gap-x-2  gap-y-1">
                    <p className="text-[12px] text-[#757575]">
                      Prescription: Use 200mg daily morning and night
                    </p>
                    <p className="text-[12px] text-[#757575]">
                      Time: Morning, Evening
                    </p>

                    <p className="text-[12px] text-[#757575]">Day: Everyday</p>
                  </div>
                </div>
                {/* -- */}
              </div>
            </div>
            {/* -------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
