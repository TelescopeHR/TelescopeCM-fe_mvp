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
  handleCreate: (x: FormValues) => void;
};

export default function SecondPart({
  setformPart,
  clientsArr,
  handleCreate,
}: PropT) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});

  const handleNext = async (data: FormValues) => {
    handleCreate(data);
  };

  useEffect(() => {
    console.log("clients", clientsArr);
  }, []);

  return (
    <form className="grid gap-4 -mt-1" onSubmit={handleSubmit(handleNext)}>
      <div className="my-2">
        <div className="flex flex-col gap-y-8 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Patient</Label>
            <Controller
              name="patient_id"
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
                      <SelectLabel>Clients</SelectLabel>
                      {clientsArr.map((obj: any, idx: number) => (
                        <SelectItem key={idx} value={obj.id}>
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
                {`${errors.patient_id.message}`}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <Label>Type of event</Label>

            <Controller
              name="type_id"
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
                      <SelectItem value="1">Daily Fixed</SelectItem>
                      <SelectItem value="2">Daily Variable</SelectItem>
                      <SelectItem value="3">No Schedule</SelectItem>
                      <SelectItem value="4">Weekly Variable</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.type_id && (
              <p className="text-xs text-red-400">
                {`${errors.type_id.message}`}
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
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="3">Inactive</SelectItem>
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
            <Label>Pay rate (USD)</Label>
            <Input
              {...register("rate", {
                required: "Pay rate is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                },
              })}
              type="number"
              placeholder="Pay rate"
              className="border h-10"
            />
            {errors.rate && (
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
