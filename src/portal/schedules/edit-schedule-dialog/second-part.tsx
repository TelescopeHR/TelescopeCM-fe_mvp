import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  patient_id: string;
  type_id: string;
  status: string;
  rate: string;
};

type PropT = {
  setformPart: (x: number) => void;
  clientsArr: any[];
  handleUpdate: (x: FormValues) => void;
  scheduleData: any;
};

export default function SecondPart({
  setformPart,
  clientsArr,
  handleUpdate,
  scheduleData,
}: PropT) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      patient_id: "",
      type_id: "",
      status: "",
      rate: "",
    },
  });

  const handleNext = (data: FormValues) => {
    handleUpdate(data);
  };

  const eventTypx = [
    { id: "1", label: "Daily Fixed" },
    { id: "2", label: "Daily Variable" },
    { id: "3", label: "No Schedule" },
    { id: "4", label: "Weekly Variable" },
  ];

  useEffect(() => {
    if (scheduleData) {
      const evtype = eventTypx.find(
        (obj) => obj.label === scheduleData.scheduleType
      );

      const obj = {
        patient_id: String(scheduleData.client?.id ?? ""),
        type_id: String(evtype?.id ?? ""),
        status: scheduleData.status === "active" ? "1" : "3",
        rate: String(scheduleData.rateNumber ?? ""),
      };

      setTimeout(() => reset(obj), 0);
    }
  }, [scheduleData, reset]);

  return (
    <form
      className="grid gap-4 -mt-1"
      onSubmit={handleSubmit(handleNext)}
      noValidate
    >
      <div className="my-2">
        <div className="flex flex-col gap-y-8 w-full">
          {/* Patient Select */}
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Patient</Label>
            <Controller
              name="patient_id"
              control={control}
              rules={{ required: "Select a patient" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Clients</SelectLabel>
                      {clientsArr.map((obj: any, idx: number) => (
                        <SelectItem key={idx} value={String(obj.id)}>
                          {obj.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.patient_id && (
              <p className="text-xs text-red-400">
                {errors.patient_id.message}
              </p>
            )}
          </div>

          {/* Event Type */}
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Type of event</Label>
            <Controller
              name="type_id"
              control={control}
              rules={{ required: "Select an event" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Type of event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type of event</SelectLabel>
                      {eventTypx.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type_id && (
              <p className="text-xs text-red-400">{errors.type_id.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Select a status" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="3">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-400">{errors.status.message}</p>
            )}
          </div>

          {/* Pay Rate */}
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Pay rate (USD)</Label>
            <Input
              {...register("rate", {
                required: "Pay rate is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Only valid numbers are allowed",
                },
              })}
              type="number"
              placeholder="Pay rate"
              className="border h-10"
            />
            {errors.rate && (
              <p className="text-xs text-red-400">{errors.rate.message}</p>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div className="flex justify-end gap-x-4">
        <div
          className="h-8 w-[100px] cursor-pointer text-sm flex items-center justify-center border rounded"
          onClick={() => setformPart(1)}
        >
          Previous
        </div>
        <Button type="submit" className="h-8 w-[100px] cursor-pointer">
          Submit
        </Button>
      </div>
    </form>
  );
}
