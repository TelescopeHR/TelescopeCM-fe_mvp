import DateInput from "@/components/date-input";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IVisitPayload } from "@/models/visits-model";
import { formatToYMD } from "@/utils/utils";
import { Controller, useForm } from "react-hook-form";

type propT = {
  open: boolean;
  setOpen: () => void;
};
export function AddVisitDialog({ open, setOpen }: propT) {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IVisitPayload>({
    defaultValues: {},
  });

  const handleOnSubmit = (formData: IVisitPayload) => {
    console.log(formData);
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-5/10">
        <DialogHeader>
          <DialogTitle>Add Visit</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid gap-4">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col lg:flex-row gap-x-10 w-full items-center">
                <div className="w-full flex flex-col gap-y-2">
                  <Label htmlFor="status">Date</Label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date of birth required" }}
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
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="item">item</SelectItem>
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
                  name="schedule_id"
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
                          <SelectItem value="item">item</SelectItem>
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

              <div className="flex flex-col gap-y-3 w-full">
                <Label>Reason</Label>
                <Textarea
                  {...register("reason", {
                    required: "Reason is required",
                  })}
                  placeholder="Reason"
                  className="border h-10"
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm">Reason is required</p>
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
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
