import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import FirstPart from "./first-part";
import SecondPart from "./second-part";

type PropT = {
  setOpen: (x: any) => void;
  open: boolean;
};

const initialData = {
  fromDate: "",
  toDate: "",
  fromTime: "",
  toTime: "",
  patient: "",
  eventType: "",
  status: "",
  payRate: "",
  isAllDay: false,
  days: [],
};

export function AddScheduleDialog({ setOpen, open }: PropT) {
  const [formData, setformData] = useState(initialData);
  const [formpart, setformpart] = useState(1);

  // const onSubmit = (data: FormValues) => {
  //   console.log("Final data:", data);
  //   setOpen(false);
  // };

  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full ">
        <DialogContent className="sm:max-w-xl w-full max-h-[90vh] overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Schedule</DialogTitle>
            <DialogDescription>
              Add a new schedule to the selected employee.
            </DialogDescription>
          </DialogHeader>
          {formpart === 1 && (
            <FirstPart
              setformPart={setformpart}
              data={formData}
              setformData={setformData}
            />
          )}
          {formpart === 2 && <SecondPart setformPart={setformpart} />}
        </DialogContent>
      </div>
    </Dialog>
  );
}
