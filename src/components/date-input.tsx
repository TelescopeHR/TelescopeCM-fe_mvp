import { ChevronDownIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

type PropT = {
  title: string;
  date: Date | undefined;
  setDate: (x: Date) => void;
  minDate?: any;
};
export default function DateInput({ title, date, setDate, minDate }: PropT) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="date" className="px-1">
          {title}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="h-10 justify-between font-normal w-full"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date: any) => {
                setDate(date);
                setOpen(false);
              }}
              className="dark:bg-slate-900"
              hidden={{ after: minDate }}
              toYear={2050}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
