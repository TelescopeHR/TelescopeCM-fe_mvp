import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  Dot,
  FileText,
  Mail,
  Pencil,
  Phone,
} from "lucide-react";

export default function ClientProfile() {
  const getColor = (status: string) => {
    if (status === "active")
      return {
        color: "#257BD2",
        accent: "#F2F7FD",
      };
    else
      return {
        color: "#257BD2",
        accent: "#F2F7FD",
      };
  };
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
            Edit Informaton
          </Button>
        </div>
      </div>
      <div className="flex justify-between w-full min-h-80 gap-x-4">
        <div className="w-full lg:w-1/2 bg-[#F8F9FA] p-5">
          {/* ------ */}
          <div className="w-full flex items-center justify-between">
            <h4 className="text-base font-medium">Personal Information</h4>
            <div
              className="flex items-center rounded p-1 pr-4"
              style={{
                backgroundColor: getColor("active").accent,
              }}
            >
              <Dot
                strokeWidth={4}
                style={{
                  color: getColor("active").color,
                }}
              />
              <span
                className="text-sm"
                style={{
                  color: getColor("active").color,
                }}
              >
                Active
              </span>
            </div>
          </div>
          {/* -------- */}
          <div className="w-full flex justify-between mt-4 mb-8">
            <div className="w-44 h-44 overflow-hidden border rounded">
              <img src="/img/cl1.png" className=" object-cover w-44 h-44" />
            </div>
            <div className="w-9/12 flex flex-col gap-y-3 px-4">
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">First Name:</div>
                <div className="w-1/2 text-sm text-right">Jeny</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Middle Name:</div>
                <div className="w-1/2 text-sm text-right">--</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Last Name:</div>
                <div className="w-1/2 text-sm text-right">Wilson</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Birth Date:</div>
                <div className="w-1/2 text-sm text-right">1966-07-14</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Gender:</div>
                <div className="w-1/2 text-sm text-right">Female</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">SSN:</div>
                <div className="w-1/2 text-sm text-right">123-45-6789</div>
              </div>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="w-full flex flex-col gap-y-3 px-2 mb-4">
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Address:</div>
              <div className="w-1/2 text-sm text-right">203, Caston way</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">City:</div>
              <div className="w-1/2 text-sm text-right">Bostonville</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">State:</div>
              <div className="w-1/2 text-sm text-right">CA</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Zip Code::</div>
              <div className="w-1/2 text-sm text-right">19664</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Country:</div>
              <div className="w-1/2 text-sm text-right">United States</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Phone Number:</div>
              <div className="w-1/2 text-sm text-right">123-45-6789</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="w-1/2 text-sm text-gray-500">Email:</div>
              <div className="w-1/2 text-sm text-right">
                example@example.com
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-3 px-2 mt-8">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-base font-medium">Emergency Contacts</h4>
            </div>
            <div className="flex flex-col gap-y-4">
              {/* contact 1 */}
              <div className="mt-2">
                <h4 className="text-base font-medium">Tom Coastal</h4>
                <div className="flex flex-col gap-y-2 mt-2">
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Relationship: Son
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Phone Number: (+1) 123-4567
                    </div>
                    <div className="w-1/2 flex justify-end text-sm text-right">
                      <Phone
                        size={16}
                        className="text-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Email Address: tomcosta7@gmail.com
                    </div>
                    <div className="w-1/2 flex justify-end text-sm text-right">
                      <Mail
                        size={16}
                        className="text-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* contact 1 */}
              <div className="mt-2">
                <h4 className="text-base font-medium">Tom Coastal</h4>
                <div className="flex flex-col gap-y-2 mt-2">
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Relationship: Son
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Phone Number: (+1) 123-4567
                    </div>
                    <div className="w-1/2 flex justify-end text-sm text-right">
                      <Phone
                        size={16}
                        className="text-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-sm text-gray-500">
                      Email Address: tomcosta7@gmail.com
                    </div>
                    <div className="w-1/2 flex justify-end text-sm text-right">
                      <Mail
                        size={16}
                        className="text-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#F8F9FA] p-5 mb-2">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-base font-medium">Medical Information</h4>
            </div>
            <div className="w-full flex flex-col gap-y-3 my-4">
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Admitted:</div>
                <div className="w-1/2 text-sm text-right">20/04/2025</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">
                  Primary Condition:
                </div>
                <div className="w-1/2 text-sm text-right">Anxiety Disorder</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">
                  Classification:
                </div>
                <div className="w-1/2 text-sm text-right">Social Support</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">
                  Priority Level:
                </div>
                <div className="w-1/2 text-sm text-right">High</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">Allergies:</div>
                <div className="w-1/2 text-sm text-right">Sea food</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">
                  Able to Respond:
                </div>
                <div className="w-1/2 text-sm text-right">Yes</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/2 text-sm text-gray-500">
                  Underlying Ailment:
                </div>
                <div className="w-1/2 text-sm text-right">--</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="w-full flex items-center justify-between mb-2">
              <h4 className="text-sm text-gray-500 font-semibold">
                Additional Information
              </h4>
            </div>
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
          <div className="bg-[#F8F9FA] p-5 mb-4 border">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-base font-medium">Documents</h4>
            </div>
            <div className="mt-4 flex flex-col gap-y-4">
              {/* doc 1 */}
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-x-2">
                  <FileText size={18} />
                  <p className="text-sm">Care plan for Nov 2025</p>
                </div>
                <ChevronRight size={16} />
              </div>
              {/* doc 2 */}
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-x-2">
                  <FileText size={18} />
                  <p className="text-sm">Care plan for Nov 2025</p>
                </div>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
