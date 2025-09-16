import React, { useState } from "react";

interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

const DateRangePicker = ({
  onRangeChange,
}: {
  onRangeChange: (range: DateRange) => void;
}) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    if (endDate && new Date(value) > new Date(endDate)) {
      setEndDate(null); // Reset end date if start date is after it
    }
    onRangeChange({ startDate: value, endDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);
    onRangeChange({ startDate, endDate: value });
  };

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center border rounded-md">
      <div className="flex flex-col">
        <input
          type="date"
          id="startDate"
          value={startDate || ""}
          onChange={handleStartDateChange}
          onFocus={(e) => e.target.showPicker()}
          className="mt-1 w-full rounded-lg px-3 py-[0.36rem] shadow-sm outline-none sm:text-sm bg-transparent"
        />
      </div>
      -
      <div className="flex">
        <input
          type="date"
          id="endDate"
          value={endDate || ""}
          onChange={handleEndDateChange}
          onFocus={(e) => e.target.showPicker()}
          className="mt-1 w-full py-[0.36rem] rounded-lg  px-3 shadow-sm  sm:text-sm outline-none bg-transparent"
          min={startDate || ""}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
