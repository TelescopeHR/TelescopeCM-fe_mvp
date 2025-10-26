"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatToYMD } from "@/utils/utils";

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date | any, endDate: Date | any) => void;
  className?: string;
}

export function DateRangePicker2({
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [, setIsSelectingEnd] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
      setIsSelectingEnd(false);
    } else {
      if (selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
      setIsSelectingEnd(true);
      setIsOpen(false);
    }
  };

  function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isDateInRange(day: number) {
    if (!startDate || !endDate) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date >= startDate && date <= endDate;
  }

  function isDateSelected(day: number) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString())
    );
  }

  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  }

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleClearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setIsSelectingEnd(false);
    onDateRangeChange?.(null, null);
  };

  React.useEffect(() => {
    if (startDate && endDate && onDateRangeChange) {
      onDateRangeChange(formatToYMD(startDate), formatToYMD(endDate));
    }
  }, [startDate, endDate]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-sm", className)}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        // variant="outline"
        className="w-full justify-start text-left font-normal flex items-center"
      >
        <Calendar className="mr-2 h-4 w-4" />
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : "Pick a date range"}

        {(startDate || endDate) && (
          <button
            onClick={handleClearDates}
            className="absolute -right-2 pr-1 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
            aria-label="Clear dates"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 rounded-lg border border-border bg-card p-4 w-80">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {monthYear}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousMonth}
                className="h-8 w-8 p-0 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextMonth}
                className="h-8 w-8 p-0 bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "relative h-8 w-8 rounded text-sm font-medium transition-colors",
                  isDateSelected(day)
                    ? "bg-primary text-primary-foreground"
                    : isDateInRange(day)
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Selected date range display */}
          {(startDate || endDate) && (
            <div className="mt-4 border-t border-border pt-4">
              <div className="text-sm text-muted-foreground">
                {startDate && (
                  <div>
                    <span className="font-medium text-foreground">Start:</span>{" "}
                    {startDate.toLocaleDateString()}
                  </div>
                )}
                {endDate && (
                  <div>
                    <span className="font-medium text-foreground">End:</span>{" "}
                    {endDate.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
