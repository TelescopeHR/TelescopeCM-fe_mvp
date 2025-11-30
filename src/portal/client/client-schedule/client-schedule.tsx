import { BigCalendar } from "@/components/big-calendar/big-calendar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function ClientSchedule() {
  const sampleEvents = [
    {
      id: "1",
      date: new Date(2025, 10, 2),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "2",
      date: new Date(2025, 11, 4),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "3",
      date: new Date(2025, 11, 5),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "4",
      date: new Date(2025, 11, 6),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
    {
      id: "5",
      date: new Date(2025, 11, 7),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
    {
      id: "6",
      date: new Date(2025, 11, 9),
      name: "Sarah Rose, Jane Do...",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
    {
      id: "7",
      date: new Date(2025, 11, 10),
      name: "Not assigned",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "unassigned" as const,
    },
    {
      id: "8",
      date: new Date(2025, 11, 12),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "9",
      date: new Date(2025, 11, 14),
      name: "Not assigned",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "unassigned" as const,
    },
    {
      id: "10",
      date: new Date(2025, 11, 16),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
    {
      id: "11",
      date: new Date(2025, 11, 17),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "12",
      date: new Date(2025, 11, 19),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "13",
      date: new Date(2025, 11, 20),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "14",
      date: new Date(2025, 11, 21),
      name: "Not assigned",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "unassigned" as const,
    },
    {
      id: "15",
      date: new Date(2025, 11, 23),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
    {
      id: "16",
      date: new Date(2025, 11, 24),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "17",
      date: new Date(2025, 11, 26),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: true,
      type: "assigned" as const,
    },
    {
      id: "18",
      date: new Date(2025, 11, 27),
      name: "Not assigned",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "unassigned" as const,
    },
    {
      id: "19",
      date: new Date(2025, 11, 30),
      name: "Sarah Rose, Jane Doe",
      time: "9:00 - 14:00",
      duration: "Time: 5 hours",
      assigned: false,
      type: "assigned" as const,
    },
  ];

  const navigate = useNavigate();

  const handleScheduleDetails = (schedule: any) => {
    switch (schedule.type) {
      case "assigned":
        if (!schedule.assigned) {
          navigate("./schedule/upcoming");
        }
        break;

      default:
        break;
    }

    console.log(schedule);
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
            <Plus />
            Create Schedule
          </Button>
        </div>
      </div>
      <div className="flex justify-between w-full min-h-80 mt-10">
        {/* calendar here */}
        <BigCalendar
          events={sampleEvents}
          onEventClick={(event) => handleScheduleDetails(event)}
        />
      </div>
    </div>
  );
}
