import React from "react";
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
import { Controller, useForm } from "react-hook-form";

type PropT = {
  setformPart: (x: number) => void;
};

type FormValues = {
  patient: string;
  eventType: string;
  status: string;
  payRate: string;
};

export default function SecondPart({ setformPart }: PropT) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({});

  const handleNext = async (data: FormValues) => {
    console.log("data", data);
    if (isValid) setformPart(2);
  };
  return (
    <form className="grid gap-4 -mt-1" onSubmit={handleSubmit(handleNext)}>
      <div className="my-2">
        <div className="flex flex-col gap-y-8 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Patient</Label>
            <Controller
              name="patient"
              control={control}
              rules={{ required: "Select a patient" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="h-10 w-full"
                    style={{ height: "40px" }}
                  >
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="2">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.patient && (
              <p className="text-xs text-red-400">
                {`${errors.patient.message}`}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <Label>Type of event</Label>

            <Controller
              name="eventType"
              control={control}
              rules={{ required: "Select an event" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="h-10 w-full"
                    style={{ height: "40px" }}
                  >
                    <SelectValue placeholder="Select Type of event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type of event</SelectLabel>
                      <SelectItem value="Daily fixed">Daily Fixed</SelectItem>
                      <SelectItem value="Daily variable">
                        Daily Variable
                      </SelectItem>
                      <SelectItem value="No schedule">No Schedule</SelectItem>
                      <SelectItem value="Weekly variable">
                        Weekly Variable
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.eventType && (
              <p className="text-xs text-red-400">
                {`${errors.eventType.message}`}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <Label>Status</Label>

            <Controller
              name="status"
              control={control}
              rules={{ required: "Select a status" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="h-10 w-full"
                    style={{ height: "40px" }}
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-400">
                {`${errors.status.message}`}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <Label>Pay rate</Label>
            <Input
              {...register("payRate", {
                required: "Pay rate is required",
              })}
              placeholder="Pay rate"
              className="border h-10"
            />
            {errors.payRate && (
              <p className="text-red-500 text-sm">Pay rate is required</p>
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
        <Button type="submit" className="h-8 w-[100px] cursor-pointer ">
          Submit
        </Button>
      </div>
    </form>
  );
}
