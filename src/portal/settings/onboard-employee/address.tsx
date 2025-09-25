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
import { AllStates } from "@/utils/data";

export default function Address() {
  return (
    <div className="mt-4">
      <form className="w-w-full lg:w-8/12 py-4 flex flex-col gap-y-8">
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              required
              placeholder="Address"
              className=" border h-10"
            />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              required
              placeholder="City"
              className=" border h-10"
            />
          </div>
        </div>

        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="gender">State</Label>
            <Select>
              <SelectTrigger className=" h-8 w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>State</SelectLabel>
                  {AllStates.map((obj, idx: number) => (
                    <SelectItem value={obj.code} key={idx}>
                      {obj.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="zip">Zip</Label>
            <Input
              type="number"
              required
              placeholder="Zip code"
              maxLength={5}
              className=" border h-10"
            />
          </div>
        </div>

        <Button className="h-8 w-[100px]">Proceed</Button>
      </form>
    </div>
  );
}
