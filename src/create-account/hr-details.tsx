import { Button } from "@/components/ui/button";
import LayoutContainerThree from "@/public_layout/layout-container-three";
import { Mail, MapPin, Phone } from "lucide-react";

// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

export default function HRDetailsPage() {
  // const { setUser } = useUserStore();
  // const navigate = useNavigate();

  return (
    <>
      <LayoutContainerThree>
        <div className="flex flex-col w-full min-h-screen overflow-y-scroll ">
          <div className="flex w-full justify-end">
            <span className="font-bold cursor-pointer">Log out</span>
          </div>
          {/* ----- */}
          <div className="w-full flex justify-between items-center">
            <div className="lg:w-5/12 flex flex-col gap-y-4">
              <h2 className="text-4xl font-bold w-8/12">
                Welcome To Telescope CM
              </h2>
              <p className="text-xl lg:w-8/12">
                Please review your agency details below before proceeding to the
                dashboard.
              </p>
            </div>
            <div className="lg:w-5/12 flex justify-end">
              <Button className="h-12 bg-[#257BD2] hover:bg-[#216db9] text-white font-bold cursor-pointer text-lg px-8">
                Proceed To Dashboard
              </Button>
            </div>
          </div>
          {/* ------ */}

          {/* ---------- */}
          <div className="mt-20 flex flex-col gap-y-4 mb-40">
            <div className="w-full  bg-[#257BD2] text-white rounded-lg p-4 px-10">
              <div className="flex items-center gap-x-4">
                <img src="/icons/hr-details.svg" alt="" />
                <h2 className="text-2xl font-bold">Caring Hands Healthcare</h2>
              </div>
            </div>
            {/* =============== */}
            <div className=" flex justify-between w-full mt-8 lg:gap-x-20">
              <div className="">
                <h4 className="text-xl font-medium">Contact Information</h4>
                <div className="mt-4 flex flex-col gap-y-4">
                  <div className="w-full flex items-start gap-x-2">
                    <MapPin color="#99A1AF" size={16} className="mt-1" />
                    <div>
                      <p className="text-sm text-[#424242]">Address</p>
                      <p className="text-base">
                        1425 Market Street, Suite 300, San Francisco, CA 94103
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex items-start gap-x-2">
                    <Mail color="#99A1AF" size={16} className="mt-1" />
                    <div>
                      <p className="text-sm text-[#424242]">Email</p>
                      <p className="text-base">contact@caringhandshc.com</p>
                    </div>
                  </div>

                  <div className="w-full flex items-start gap-x-2">
                    <Phone color="#99A1AF" size={16} className="mt-1" />
                    <div>
                      <p className="text-sm text-[#424242]">Phone</p>
                      <p className="text-base">+1 (415) 555-0198</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium">Agency Owner Details</h4>
                <div className="mt-4 flex flex-col gap-y-2">
                  <div className="flex gap-x-2 items-start">
                    <img src="/icons/detailsuser.svg" alt="" />
                    <div className="flex flex-col -mt-1">
                      <h3 className="font-medium">Sarah Mitchell</h3>
                      <p className="text-sm">Agency Director & Owner</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-y-2">
                    <div className="flex gap-x-2">
                      <Mail color="#99A1AF" size={16} className="mt-1" />
                      <span className="text-sm">
                        sarah.mitchell@caringhandshc.com
                      </span>
                    </div>

                    <div className="flex gap-x-2">
                      <Phone color="#99A1AF" size={16} className="mt-1" />
                      <span className="text-sm">+1 (415) 555-0199</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h4 className="text-xl font-medium -ml-20">
                  Agency Statistics
                </h4>
                <div className="mt-4 flex flex-col items-center gap-y-2 p-4">
                  <div className="">
                    <div className="flex items-center p-4 border gap-x-4 bg-[#F9FAFB]">
                      <img src="/icons/detailsusers.svg" alt="icon" />
                      <div className="flex flex-col gap-y-1">
                        <h1 className="text-3xl font-bold">24</h1>
                        <p>Active Employees</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------- */}
        </div>
      </LayoutContainerThree>
    </>
  );
}
