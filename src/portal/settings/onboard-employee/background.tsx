import DateInput from "@/components/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Background() {
  const [dob, setDob] = useState<Date | undefined>(undefined);
  return (
    <div className="mt-4">
      <form className="w-w-full lg:w-8/12 py-4 flex flex-col gap-y-8">
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput title="Hire date" date={dob} setDate={setDob} />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput title="Application date" date={dob} setDate={setDob} />
          </div>
        </div>
        {/*  */}
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput
              title="Signed job description date"
              date={dob}
              setDate={setDob}
            />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput title="Orientation date" date={dob} setDate={setDob} />
          </div>
        </div>

        {/*  */}

        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput
              title="Signed policy procedure date"
              date={dob}
              setDate={setDob}
            />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput
              title="Evaluated assigned tasks date"
              date={dob}
              setDate={setDob}
            />
          </div>
        </div>
        {/*  */}
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput
              title="Last evaluation date"
              date={dob}
              setDate={setDob}
            />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <DateInput title="Termination date" date={dob} setDate={setDob} />
          </div>
        </div>
        {/*  */}

        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="Number of references">Number of references</Label>
            <Input
              type="number"
              required
              placeholder="Number of references"
              className=" border h-10"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
