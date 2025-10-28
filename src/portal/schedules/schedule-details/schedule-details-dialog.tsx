import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCareGiverStore } from "@/store/caregiverStore";
import { MoveRight, User } from "lucide-react";
import { useNavigate } from "react-router";

type propT = {
  open: boolean;
  setopen: () => void;
  details: any;
};

export function ScheduleDetails({ open, setopen, details }: propT) {
  const { careGiver } = useCareGiverStore();
  const weeklySchedules = details.weeklySchedule;
  const navigate = useNavigate();

  const Weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isDayPresent = (day: string) => {
    if (!day || !Array.isArray(weeklySchedules)) return false;
    const normalizedDay = day.trim().toLowerCase();
    return weeklySchedules.some(
      (item: any) => item.day_of_the_week.toLowerCase() === normalizedDay
    );
  };

  const getDayTimes = (day: string): any[] => {
    if (!day || !Array.isArray(weeklySchedules)) return [];
    const normalizedDay = day.trim().toLowerCase();
    const found = weeklySchedules.find(
      (item) => item.day_of_the_week.toLowerCase() === normalizedDay
    );
    return [found.time_in, found.time_out];
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="sm:max-w-10/12 w-6/12">
        <DialogHeader>
          <DialogTitle>Schedule details</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="w-full border p-4 rounded-b-2xl">
            <div className="flex flex-col gap-y-4">
              <div className="flex  items-center justify-between w-full">
                <div className="flex gap-x-4">
                  <Label className="font-bold">Employee</Label>
                  <div className="flex gap-x-1 text-sm">
                    <span>{careGiver.firstName}</span>
                    <span>{careGiver.lastName}</span>
                  </div>
                </div>
                <div className="flex gap-x-4 cursor-pointer">
                  <Label className="font-bold cursor-pointer">
                    Schedule Type
                  </Label>
                  <div className="relative">
                    <div className="flex gap-x-1 text-sm">
                      <span>{details.scheduleType}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex  items-center justify-between w-full">
                <div className="flex gap-x-4">
                  <Label className="font-bold">Hours</Label>
                  <div className="flex gap-x-1 text-sm">
                    <span>{details.hours}</span>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <Label className="font-bold">Rate</Label>{" "}
                  <div className="flex gap-x-1 text-sm">
                    <span>{details.rate}/hr</span>
                  </div>
                </div>
              </div>

              <div className="flex  items-center justify-between w-full">
                <div className="flex gap-x-4">
                  <Label className="font-bold">Start Date</Label>
                  <div className="flex gap-x-1 text-sm">
                    <span>{details.startDate}</span>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <Label className="font-bold">End Date</Label>{" "}
                  <div className="flex gap-x-1 text-sm">
                    <span>${details.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div
            className="my-4 border border-cyan-500 p-4 rounded cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/clients/client/${details.client.id}`);
            }}
          >
            <div className="flex justify-between pr-4">
              <div className="flex items-center gap-x-1">
                <User size={16} />
                <h2 className="font-bold text-gray-500">Client</h2>
              </div>
              <div className="flex items-center gap-x-2 cursor-pointer">
                <span className="text-sm font-bold text-cyan-500">
                  View Client
                </span>
                <MoveRight size={20} />
              </div>
            </div>
            <div className="flex gap-x-4 my-2">
              <Label className="font-bold">Name</Label>
              <div className="relative">
                <div className="flex gap-x-1 text-sm">
                  <span>{details.client.first_name}</span>{" "}
                  <span>{details.client.middle_name}</span>
                  <span>{details.client.last_name}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <h2 className="font-bold text-gray-500">Weekly Schedules</h2>
            <div className="grid grid-cols-3 gap-4 w-full mt-6">
              {Weekdays.map((day, idx: number) => (
                <div
                  className={`p-6  min-w-4/12 h-20 max-20 rounded-lg flex flex-col items-center justify-center ${
                    isDayPresent(day)
                      ? "border-3 border-cyan-500 font-bold"
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}
                  key={idx}
                >
                  {day}
                  {isDayPresent(day) ? (
                    <div className="w-full text-sm font-normal flex justify-between mt-2">
                      <p>
                        From:{" "}
                        <span className=" font-bold">
                          {getDayTimes(day)[0]}
                        </span>
                      </p>
                      <p>
                        To:{" "}
                        <span className=" font-bold">
                          {getDayTimes(day)[1]}
                        </span>{" "}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
