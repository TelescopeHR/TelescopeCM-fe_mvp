import DateInput from "@/components/date-input";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IVisitPayload } from "@/models/vistis-model";
import { getAllSchedule } from "@/services/schedule-service/schedule-service";
import { createVisit } from "@/services/visits-service/visit-service";
import { visitsReasons } from "@/utils/data";
import { formatToYMD } from "@/utils/utils";
import { Portal } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type propT = {
  open: boolean;
  setOpen: () => void;
  apicall: () => void;
};

export interface IVistPayload {
  date: string;
  schedule_id: string;
  visit_type: string;
  verified_in: string;
  verified_out: string;
  reason: string;
  reasoninput: string;
}

export function AddVisitDialog({ open, setOpen, apicall }: propT) {
  const [isLoadn, setisLoadn] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("");
  const [scheduleArr, setscheduleArr] = useState<any[]>([]);
  const [currentView, setcurrentView] = useState("form");
  const [payload, setpayload] = useState<IVisitPayload | any>({});
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IVisitPayload>({
    defaultValues: {},
  });

  const handleOnSubmit = (payload: IVisitPayload) => {
    setisLoadn(true);
    setskeletonMessage("Creating visit");
    return createVisit(payload).subscribe({
      next: (response) => {
        if (response) {
          toast.success("Visit created succeefully!");
          setOpen();
          apicall();
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };
  const handleNext = (formData: IVisitPayload) => {
    setpayload(formData);
    setcurrentView("confirm");
  };

  const fetchSchedules = () => {
    setisLoadn(true);
    setskeletonMessage("Fetching schedules");
    return getAllSchedule().subscribe({
      next: (response) => {
        if (response) {
          const scheduleArray = response.data;
          const transformed = scheduleArray.map((obj: any) => {
            return {
              id: obj.id,
              value: obj.id,
              label: obj.schedule_id ?? "---",
            };
          });
          setscheduleArr(transformed);
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  const reasonValue = watch("reason");
  const getScheduleID = (id: string) => {
    const obj = scheduleArr.filter((obj) => obj.id == id);
    return obj[0].label;
  };

  const CreateVisitForm = () => {
    return (
      <form onSubmit={handleSubmit(handleNext)}>
        <div className="grid gap-4">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col lg:flex-row gap-x-10 w-full items-center">
              <div className="w-full flex flex-col gap-y-2">
                <Label htmlFor="status">Date</Label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DateInput
                      title=""
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={(val) => field.onChange(formatToYMD(val))}
                    />
                  )}
                />
                {errors.date && (
                  <p className="text-xs text-red-400">
                    {`${errors.date.message}`}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <Label className="mb-3" htmlFor="status">
                  Schedule
                </Label>
                <Controller
                  name="schedule_id"
                  control={control}
                  rules={{ required: "Select a Schedule" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="h-10 w-full"
                        style={{ height: "40px" }}
                      >
                        <SelectValue placeholder="Select Schedule" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-scroll">
                        <SelectGroup>
                          {scheduleArr.map((obj: any, idx: number) => (
                            <SelectItem value={obj.value} key={idx}>
                              {obj.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.schedule_id && (
                  <p className="text-xs text-red-400">
                    {errors.schedule_id.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Visit Type</Label>
              <Controller
                name="visit_type"
                control={control}
                rules={{ required: "Select a Visit type" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="Select Visit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Employee">Employee</SelectItem>
                        <SelectItem value="Orientation">Orientation</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.visit_type && (
                <p className="text-xs text-red-400">
                  {errors.visit_type.message}
                </p>
              )}
            </div>

            <div className="border p-4 rounded">
              <h2 className="font-bold mb-4 text-gray-500">
                Time <span className="text-xs">(24-hour)</span>
              </h2>

              <div className="flex flex-col lg:flex-row gap-x-10 w-full">
                {/* From Time */}
                <div className="flex flex-col gap-y-3 w-full">
                  <Label>Verified In</Label>
                  <Input
                    {...register("verified_in", {
                      required: "verified in time is required",
                    })}
                    type="time"
                    className="border h-10"
                  />
                  {errors.verified_in && (
                    <p className="text-red-500 text-xs">
                      Select verified in time
                    </p>
                  )}
                </div>

                {/* To Time */}
                <div className="flex flex-col gap-y-3 w-full">
                  <Label>Verified Out</Label>
                  <Input
                    {...register("verified_out", {
                      required: "verified out time is required",
                      validate: (value) => {
                        const from = getValues("verified_in");

                        // Only validate when not all-day and both times exist
                        if (from && value) {
                          const [fromH, fromM] = from.split(":").map(Number);
                          const [toH, toM] = value.split(":").map(Number);

                          const fromMinutes = fromH * 60 + fromM;
                          const toMinutes = toH * 60 + toM;

                          if (toMinutes <= fromMinutes)
                            return "End time must be later than start time";
                        }

                        return true;
                      },
                    })}
                    type="time"
                    className="border h-10"
                  />
                  {errors.verified_out && (
                    <p className="text-red-500 text-xs">
                      {errors.verified_out.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <Label>Reason</Label>
              {reasonValue !== "other" && (
                <div className="flex flex-col gap-y-1">
                  <Controller
                    name="reason"
                    control={control}
                    rules={{ required: "Select a Schedule" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="h-10 w-full"
                          style={{ height: "40px" }}
                        >
                          <SelectValue placeholder="Select Schedule" />
                        </SelectTrigger>
                        <Portal>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              <SelectLabel>Reasons</SelectLabel>
                              {visitsReasons.map((obj, idx: number) => (
                                <SelectItem
                                  value={obj.code}
                                  key={idx}
                                  className="whitespace-normal break-words"
                                >
                                  {obj.code} – {obj.name}
                                </SelectItem>
                              ))}

                              {/* <SelectItem value="other">Other</SelectItem> */}
                            </SelectGroup>
                          </SelectContent>
                        </Portal>
                      </Select>
                    )}
                  />
                  {errors.reason && (
                    <p className="text-xs text-red-400">
                      {errors.reason.message}
                    </p>
                  )}
                </div>
              )}

              {reasonValue == "other" && (
                <div className="flex flex-col gap-y-1">
                  <Textarea
                    {...register("reasoninput", {
                      required: "Reason is required",
                    })}
                    placeholder="Reason"
                    className="border h-10"
                  />
                  {errors.reasoninput && (
                    <p className="text-red-500 text-xs">Reason is required</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-x-4 mt-4">
            <div
              className="h-8 w-[100px] cursor-pointer text-sm flex items-center justify-center border rounded"
              onClick={() => setOpen()}
            >
              Cancel
            </div>
            <Button type="submit" className="h-8 w-[100px] cursor-pointer ">
              Proceed
            </Button>
          </div>
        </div>
      </form>
    );
  };

  const ConfirmView = () => {
    return (
      <div>
        <h2 className="-mt-4">Please confirm your inputs before proceeding.</h2>
        <hr className="mt-4" />
        <div className="mt-10 flex flex-col gap-y-4 border p-4 rounded">
          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Date:</div>
            <span className="mr-2">{payload.date}</span>
          </div>

          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Schedule:</div>
            <span className="mr-2">{getScheduleID(payload.schedule_id)}</span>
          </div>

          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Visit Type:</div>
            <span className="mr-2">{payload.visit_type}</span>
          </div>

          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Verified In:</div>
            <span className="mr-2">{payload.verified_in}</span>
          </div>

          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Verified Out:</div>
            <span className="mr-2">{payload.verified_out}</span>
          </div>

          <div className="w-full flex items-center">
            <div className="font-bold mr-2 w-3/12">Reason:</div>
            <span className="mr-2">{payload.reason}</span>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 mt-4">
          <div
            className="h-8 w-[100px] cursor-pointer text-sm flex items-center justify-center border rounded"
            onClick={() => setcurrentView("form")}
          >
            Back
          </div>
          <Button
            className="h-8 w-[100px] cursor-pointer "
            onClick={() => handleOnSubmit(payload)}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const scheduleSub = fetchSchedules();
    return () => {
      scheduleSub.unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-[425px] lg:max-w-5/10">
          <DialogHeader>
            <DialogTitle>
              {currentView == "form" ? "Add Visit" : "Confirm Inputs"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {currentView === "form" && <CreateVisitForm />}
          {currentView === "confirm" && <ConfirmView />}
        </DialogContent>
      </Dialog>
      {isLoadn && <LoadingSkeleton name={skeletonMessage} />}
    </React.Fragment>
  );
}
