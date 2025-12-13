"use client";
import { ChevronDown } from "lucide-react";

export interface DateOfBirthSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) =>
  (currentYear - i).toString()
);

export function DateOfBirthSelect({
  value = "",
  onChange,
}: DateOfBirthSelectProps) {
  const parsedDate = value
    ? {
        year: value.split("-")[0],
        month: Number.parseInt(value.split("-")[1], 10).toString(), // Remove leading zero
        day: Number.parseInt(value.split("-")[2], 10).toString(), // Remove leading zero
      }
    : { year: "", month: "", day: "" };

  const handleChange = (field: "day" | "month" | "year", newValue: string) => {
    const updatedDate = {
      ...parsedDate,
      [field]: newValue,
    };

    // Only emit the date if all three fields are filled
    if (updatedDate.year && updatedDate.month && updatedDate.day) {
      const paddedMonth = updatedDate.month.padStart(2, "0");
      const paddedDay = updatedDate.day.padStart(2, "0");
      const formattedDate = `${updatedDate.year}-${paddedMonth}-${paddedDay}`;

      onChange?.(formattedDate);
    } else {
      // Emit empty string if incomplete
      onChange?.("");
    }
  };

  return (
    <div className="flex items-center border border-border rounded-xl overflow-hidden h-11 mt-1">
      <div className="relative flex-1 border-r border-border">
        <select
          value={parsedDate.day || ""}
          onChange={(e) => handleChange("day", e.target.value)}
          className="w-full appearance-none bg-transparent px-6 text-sm text-foreground focus:outline-none cursor-pointer"
        >
          <option value="" disabled hidden>
            Day
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      </div>

      <div className="relative flex-1 border-r border-border">
        <select
          value={parsedDate.month || ""}
          onChange={(e) => handleChange("month", e.target.value)}
          className="w-full appearance-none bg-transparent px-6  text-sm text-foreground focus:outline-none cursor-pointer"
        >
          <option value="" disabled hidden>
            Month
          </option>
          {months.map((month, index) => (
            <option key={month} value={(index + 1).toString()}>
              {month}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      </div>

      <div className="relative flex-1">
        <select
          value={parsedDate.year || ""}
          onChange={(e) => handleChange("year", e.target.value)}
          className="w-full appearance-none bg-transparent px-6 text-sm text-foreground focus:outline-none cursor-pointer"
        >
          <option value="" disabled hidden>
            Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
