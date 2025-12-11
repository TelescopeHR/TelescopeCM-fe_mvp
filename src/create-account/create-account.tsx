import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LayoutContainerThree from "@/public_layout/layout-container-three";

// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

export default function CreateAccountPage() {
  // const { setUser } = useUserStore();
  // const navigate = useNavigate();

  return (
    <>
      <LayoutContainerThree>
        <div className="w-full flex flex-col gap-y-6 mb-20">
          {/* ======= Agency details ============= */}
          <div>
            <p className="text-lg font-bold">Agency Details</p>
            <div className="flex flex-col gap-y-4 mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">Agency Name</Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Agency Name"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="agency address">Agency Address</Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Agency Address"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">No of Existing Clients</Label>
                  <Select onValueChange={() => ""} value={""}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="---Select Option---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={() => ""} value={""}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="---Select Option---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="province">State/Province</Label>
                  <Select onValueChange={() => ""} value={""}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="---Select Option---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Zip Code"
                    className=" border h-10"
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* ==================================== */}

          {/* ======= Agency Admin Details ============= */}
          <div>
            <p className="text-lg font-bold">Agency Admin Details</p>
            <div className="flex flex-col gap-y-4 mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your First Name"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Last Name"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">
                    Middle Name{" "}
                    <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    type="text"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Middle Name"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    value=""
                    onChange={() => ""}
                    required
                    placeholder="Your Email"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">Phone</Label>
                  <Select onValueChange={() => ""} value={""}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">Role</Label>
                  <Select onValueChange={() => ""} value={""}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="---Select Role---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="item">Item</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {/* ==================================== */}
          <div className="w-full flex gap-x-4 items-center justify-end">
            <div className="rounded-md border-1 border-[#257BD2] min-w-40 text-[#257BD2] font-bold cursor-pointer py-1 text-center">
              Cancel
            </div>
            <Button className="bg-[#257BD2] hover:bg-[#2275c9] cursor-pointer min-w-40 text-white font-bold">
              Next
            </Button>
          </div>
        </div>
      </LayoutContainerThree>
    </>
  );
}
