import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header/page-header";
import ScheduleCalendar from "./schedule-calendar/schedule-calendar";

export default function ScheduleModule() {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <PageHeader title="Schedules Overview" hasBack />
        <Button className=" cursor-pointer" onClick={() => {}}>
          Add Schedule
        </Button>
      </div>
      <hr className="mt-5" />
      <div className="mt-10 px-2 mb-20">
        <ScheduleCalendar />
      </div>
    </div>
  );
}
