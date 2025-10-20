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
  createSchedule,
  getClients,
} from "@/services/employee-service/employee-service";
import { Subscription } from "rxjs";
import LoadingSkeleton from "@/components/skeleton/skeleton";
// import { useCareGiverStore } from "@/store/caregiverStore";

type PropT = {
  setOpen: (x: any) => void;
  open: boolean;
  makeApiCall: () => void;
  userId: string;
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

export function AddScheduleDialog({
  setOpen,
  open,
  makeApiCall,
  userId,
}: PropT) {
  const [formData, setformData] = useState(initialData);
  const [formpart, setformpart] = useState(1);
  const [isloading, setisloading] = useState(false);
  const [clientsArr, setclientsArr] = useState<any>([]);
  const [skeletonMessage, setskeletonMessage] = useState("Processing");
  // const { careGiver } = useCareGiverStore();

  // const onSubmit = (data: FormValues) => {
  //   console.log("Final data:", data);
  //   setOpen(false);
  // };

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

  const handleCreateSchedule = (obj: any) => {
    const formObj = { ...formData, ...obj };
    const payload = {
      patient_id: formObj.patient_id,
      care_worker_id: userId,
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
    setskeletonMessage("Creating schedule...");
    return createSchedule(payload).subscribe({
      next: (response) => {
        if (response) {
          makeApiCall();
          setOpen(false);
          toast.success("Schedule created successfully!");
          console.log("response", response);
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
          {formpart === 2 && (
            <SecondPart
              setformPart={setformpart}
              clientsArr={clientsArr}
              handleCreate={handleCreateSchedule}
            />
          )}
        </DialogContent>
      </div>
      {isloading && <LoadingSkeleton name={skeletonMessage} />}
    </Dialog>
  );
}
