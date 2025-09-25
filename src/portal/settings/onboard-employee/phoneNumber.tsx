import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function PhoneNumber() {
  const [phoneNumbers, setPhoneNumbers] = useState<any[]>([]);
  return (
    <div className="mt-4">
      <form className="w-w-full lg:w-8/12 py-4 flex flex-col gap-y-8">
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="city">Login Phone Number</Label>
            <Input
              type="text"
              required
              placeholder="Example: 14155552671"
              className=" border h-10"
            />
          </div>
        </div>

        {phoneNumbers.map((obj, idx: number) => (
          <div className="w-full  border p-4" key={idx}>
            <div className="w-full flex justify-end">
              <div className="flex items-center cursor-pointer">
                <Trash size={16} color="red" />
              </div>
            </div>
            <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="gender">Type</Label>
                <Select>
                  <SelectTrigger className="w-full" style={{ height: "40px" }}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="zip">Phone Number</Label>
                <Input
                  type="number"
                  required
                  placeholder="Example: 14155552671"
                  maxLength={5}
                  className=" border h-10"
                />
              </div>
            </div>
          </div>
        ))}

        {phoneNumbers.length < 3 && (
          <div className="w-full flex justify-end">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (phoneNumbers.length < 3) {
                  setPhoneNumbers((prev: any) => {
                    return [
                      ...prev,
                      { id: phoneNumbers.length + 1, type: "", phone: "" },
                    ];
                  });
                }
              }}
            >
              <Plus /> <span>Add</span>
            </div>
          </div>
        )}

        <Button className="h-8 w-[100px]">Proceed</Button>
      </form>
    </div>
  );
}
