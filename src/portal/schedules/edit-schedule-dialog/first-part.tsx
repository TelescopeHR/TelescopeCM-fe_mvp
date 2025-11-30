import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertToISO, formatToYMD } from "@/utils/utils";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface IData {
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  patient_id: string;
  type_id: string;
  status: string;
  payRate: string;
  isAllDay: boolean;
  days: any[];
}

type PropT = {
  setformPart: (x: number) => void;
  setformData: (x: any) => void;
  data: IData;
  scheduleData: any;
};

type FormValues = {
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  isAllDay: boolean;
  days: string[];
};

export default function FirstPart({
  setformPart,
  setformData,
  scheduleData,
}: PropT) {
  const Weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const {
    control,
    register,
    watch,
    handleSubmit,

    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fromDate: "",
      toDate: "",
      fromTime: "",
      toTime: "",
      isAllDay: false,
      days: [],
    },
  });

  const isAllDay = watch("isAllDay");

  const handleSelectDay = (day: string) => {
    const currentDays = getValues("days");
    let updatedDays: string[];

    if (currentDays.includes(day)) {
      updatedDays = currentDays.filter((d) => d !== day);
    } else {
      updatedDays = [...currentDays, day];
    }

    setValue("days", updatedDays, { shouldValidate: true });
  };

  const handleNext = async (formData: FormValues) => {
    setformData((prev: IData) => ({
      ...prev,
      ...formData,
    }));
    setformPart(2);
  };

  useEffect(() => {
    const wkdays = scheduleData.weeklySchedule.map(
      (obj: any) => obj.day_of_the_week
    );
    reset({
      fromDate: formatToYMD(convertToISO(scheduleData.startDate)) || "",
      toDate: formatToYMD(convertToISO(scheduleData.endDate)) || "",
      fromTime: scheduleData.weeklySchedule[0].time_in || "",
      toTime: scheduleData.weeklySchedule[0].time_out || "",
      isAllDay:
        (scheduleData.weeklySchedule[0].time_in == "00:00" &&
          scheduleData.weeklySchedule[0].time_out == "23:59") ||
        false,
      days: wkdays || [],
    });
  }, [scheduleData, reset]);

  return (
    <form className="grid gap-4 -mt-1" onSubmit={handleSubmit(handleNext)}>
      {/* --- Date Section --- */}
      <div className="my-2">
        <h2 className="font-bold mb-4 text-gray-500">Timeframe</h2>
        <div className="flex flex-col lg:flex-row gap-x-10 w-full">
          {/* From Date */}
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="fromDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DateInput
                  title="From"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) => field.onChange(formatToYMD(val))}
                />
              )}
            />
            {errors.fromDate && (
              <p className="text-red-500 text-xs">Select a start date</p>
            )}
          </div>

          {/* To Date */}
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="toDate"
              control={control}
              rules={{
                required: "End date is required",
                validate: (value) => {
                  const from = new Date(getValues("fromDate"));
                  const to = new Date(value);

                  if (!from || !to) return true;
                  if (to < from) return "End date cannot be before start date";

                  return true;
                },
              }}
              render={({ field }) => (
                <DateInput
                  title="To"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) => field.onChange(formatToYMD(val))}
                />
              )}
            />
            {errors.toDate && (
              <p className="text-red-500 text-xs">{errors.toDate.message}</p>
            )}
          </div>
        </div>
      </div>

      <hr />

      {/* --- Day Selection --- */}
      <div className="my-2 mb-10">
        <h2 className="mb-4 text-sm">Select (multiple) days</h2>

        <Controller
          name="days"
          control={control}
          rules={{
            validate: (value) =>
              value && value.length > 0
                ? true
                : "Please select at least one day",
          }}
          render={({ field }) => (
            <>
              <div className="flex flex-wrap gap-2 justify-around">
                {Weekdays.map((day, idx) => (
                  <div
                    key={idx}
                    className={`px-2 h-10 rounded-full flex items-center justify-center cursor-pointer text-xs font-bold ${
                      field.value.includes(day)
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                    onClick={() => handleSelectDay(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {errors.days && (
                <p className="text-red-500 text-xs text-center mt-2">
                  {errors.days.message?.toString()}
                </p>
              )}
            </>
          )}
        />

        {/* --- Time Section --- */}
        <div className="mt-8 mb-4 border p-4 rounded">
          <h2 className="font-bold mb-4 text-gray-500">
            Time <span className="text-xs">(24-hour)</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-x-10 w-full">
            {/* From Time */}
            <div className="flex flex-col gap-y-3 w-full">
              <Label>From</Label>
              <Input
                {...register("fromTime", {
                  required: !getValues("isAllDay") && "Start time is required",
                })}
                type="time"
                className="border h-10"
                disabled={isAllDay}
              />
              {errors.fromTime && (
                <p className="text-red-500 text-xs">Select start time</p>
              )}
            </div>

            {/* To Time */}
            <div className="flex flex-col gap-y-3 w-full">
              <Label>To</Label>
              <Input
                {...register("toTime", {
                  required: !getValues("isAllDay") && "End time is required",
                  validate: (value) => {
                    const from = getValues("fromTime");

                    // Only validate when not all-day and both times exist
                    if (!isAllDay && from && value) {
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
                disabled={isAllDay}
              />
              {errors.toTime && (
                <p className="text-red-500 text-xs">{errors.toTime.message}</p>
              )}
            </div>
          </div>

          {/* All Day Checkbox */}
          <div className="flex items-center gap-3 mt-4">
            <Controller
              name="isAllDay"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="allday"
                  className="border border-gray-400"
                  checked={field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    if (val) {
                      // clear time values when all-day is checked
                      setValue("fromTime", "");
                      setValue("toTime", "");
                    }
                    // trigger(["fromTime", "toTime"]);
                  }}
                />
              )}
            />
            <Label htmlFor="allday">All day</Label>
          </div>
        </div>
      </div>

      {/* --- Submit Button --- */}
      <div className="flex justify-end gap-x-4">
        <Button type="submit" className="h-8 w-[100px] cursor-pointer">
          Proceed
        </Button>
      </div>
    </form>
  );
}
