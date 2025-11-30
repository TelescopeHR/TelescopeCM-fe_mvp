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
import { toast } from "react-toastify";
import {
  getClients,
  updateSchedule,
} from "@/services/employee-service/employee-service";
import { Subscription } from "rxjs";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { useCareGiverStore } from "@/store/caregiverStore";
// import { useCareGiverStore } from "@/store/caregiverStore";

type PropT = {
  setOpen: (x: any) => void;
  data: any;
  open: boolean;
  makeApiCall: () => void;
};

const initialData = {
  fromDate: "",
  toDate: "",
  fromTime: "",
  toTime: "",
  patient_id: "",
  type_id: "",
  status: "",
  payRate: "",
  isAllDay: false,
  days: [],
};

export interface ISchedulepayload {
  patient_id: string;
  care_worker_id: string;
  type_id: number;
  date_from: string;
  date_to: string;
  rate: number;
  status: number;
  time_from: string;
  time_to: string;
  selected_days: number[];
  all_day_event: boolean;
}

export function EditScheduleDialog({
  setOpen,
  open,
  makeApiCall,
  data,
}: PropT) {
  const [formData, setformData] = useState(initialData);
  const [formpart, setformpart] = useState(1);
  const [isloading, setisloading] = useState(false);
  const [clientsArr, setclientsArr] = useState<any>([]);
  const [skeletonMessage, setskeletonMessage] = useState("Processing");
  const { careGiver } = useCareGiverStore();

  const fetchClients = () => {
    setisloading(true);
    setskeletonMessage("Fetching clients...");
    return getClients().subscribe({
      next: (response) => {
        if (response) {
          const res = response.data;
          const transformed = res.map((obj: any) => {
            return {
              id: obj.uuid,
              label: `${obj.first_name} ${obj.middle_name ?? ""} ${
                obj.last_name
              }`,
            };
          });
          setclientsArr(transformed);
        }
      },
      error: (err) => {
        console.log(err);
        setisloading(false);
      },
      complete: () => {
        setisloading(false);
      },
    });
  };

  const handleUpdateSchedule = (obj: any) => {
    const formObj = { ...formData, ...obj };
    const payload = {
      patient_id: formObj.patient_id,
      care_worker_id: careGiver.id,
      type_id: parseInt(formObj.type_id),
      date_from: formObj.fromDate,
      date_to: formObj.toDate,
      rate: parseFloat(formObj.rate),
      status: parseInt(formObj.status),
      time_from: formObj.isAllDay ? "00:00" : formObj.fromTime,
      time_to: formObj.isAllDay ? "23:59" : formObj.toTime,
      selected_days: formObj.days,
      all_day_event: formObj.isAllDay,
    };
    setisloading(true);
    setskeletonMessage("Updating schedule...");
    return updateSchedule(payload, data.id).subscribe({
      next: (response) => {
        if (response) {
          makeApiCall();
          setOpen(false);
          toast.success("Schedule updated successfully!");
        }
      },
      error: () => {
        setisloading(false);
      },
      complete: () => {
        setisloading(false);
      },
    });
  };

  useEffect(() => {
    const sub: Subscription = fetchClients();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full ">
        <DialogContent className="sm:max-w-xl w-full max-h-[90vh] overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Schedule</DialogTitle>
            <DialogDescription>Update the selected schedule.</DialogDescription>
          </DialogHeader>
          {formpart === 1 && (
            <FirstPart
              setformPart={setformpart}
              data={formData}
              setformData={setformData}
              scheduleData={data}
            />
          )}
          {formpart === 2 && (
            <SecondPart
              setformPart={setformpart}
              clientsArr={clientsArr}
              handleUpdate={handleUpdateSchedule}
              scheduleData={data}
            />
          )}
        </DialogContent>
      </div>
      {isloading && <LoadingSkeleton name={skeletonMessage} />}
    </Dialog>
  );
}
