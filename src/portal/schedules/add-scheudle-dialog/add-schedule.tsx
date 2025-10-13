import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type PropT = {
  setOpen: () => void;
  open: boolean;
};
export function AddScheduleDialog({ setOpen, open }: PropT) {
  const [selectedDays, setselectedDays] = useState(["Mon"]);
  const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleSelectDay = (day: string) => {
    if (selectedDays.includes(day)) {
      const filtr = selectedDays.filter((d) => d !== day);
      setselectedDays(filtr);
    } else {
      setselectedDays((prev: any) => {
        return [...prev, day];
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form className="w-full">
        <DialogContent className="sm:max-w-xl w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Schedule</DialogTitle>
            <DialogDescription>
              Add a new schedule to the selected employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div className="my-2">
              <h2 className="font-bold mb-4 text-gray-500">Timeframe</h2>
              <div className="flex flex-col lg:flex-row gap-x-10 w-full">
                <div className="flex flex-col gap-y-3 w-full">
                  <DateInput
                    title="From"
                    date={new Date()}
                    setDate={(val) => {
                      console.log(val);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-y-3 w-full">
                  <DateInput
                    title="To"
                    date={new Date()}
                    setDate={(val) => {
                      console.log(val);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="my-2 mb-10">
              <h2 className="mb-4 text-sm">Select (multiple) days</h2>
              <div className="flex flex-wrap gap-2 justify-around">
                {Weekdays.map((day, idx: number) => (
                  <div
                    key={idx}
                    className={`w-14 h-14 rounded-xl  flex items-center justify-center cursor-pointer text-sm  font-bold ${
                      selectedDays.includes(day)
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                    onClick={() => handleSelectDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="font-bold mb-4 text-gray-500">Time</h2>
                <div className="flex flex-col lg:flex-row gap-x-10 w-full ">
                  <div className="flex flex-col gap-y-3 w-full">
                    <Label>From</Label>
                    <Input
                      type="time"
                      placeholder=""
                      className="border h-10"
                      defaultValue="06:30"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3 w-full">
                    <Label>To</Label>
                    <Input
                      type="time"
                      placeholder=""
                      className="border h-10"
                      defaultValue="06:30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
