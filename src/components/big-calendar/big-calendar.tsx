"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Dot, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface CalendarEvent {
  id: string;
  date: Date;
  name: string;
  time: string;
  duration: string;
  assigned: boolean;
  type: "assigned" | "unassigned";
}

interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

export function BigCalendar({ events = [], onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date()); // December 2025
  const [selectedRange, setselectedRange] = useState("month");

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonthDays = (date: Date) => {
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);

    const daysInPrevMonth = prevMonthDate.getDate();
    const firstDay = getFirstDayOfMonth(date);
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    return Array.from(
      { length: startDay },
      (_, i) => daysInPrevMonth - startDay + i + 1
    );
  };

  const getNextMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    return Array.from({ length: remainingCells }, (_, i) => i + 1);
  };

  const getEventsForDate = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return [];

    // const eventDate = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth(),
    //   day
    // );
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const previousDays = getPreviousMonthDays(currentDate);
  const currentDays = Array.from(
    { length: getDaysInMonth(currentDate) },
    (_, i) => i + 1
  );
  const nextDays = getNextMonthDays(currentDate);

  const allDays = [...previousDays, ...currentDays, ...nextDays];

  return (
    <div className="space-y-4 w-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center  overflow-hidden border border-[#F4F4F5] ">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
            className="bg-[#F4F4F5]  border-0 text-white rounded-none"
          >
            <ChevronLeft color="#333" className="w-5 h-5" />
          </Button>
          <div className="text-[14px] font-semibold w-48 text-center bg-bg-[#F4F4F5] h-6">
            {monthYear}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="bg-[#F4F4F5] border-0 text-white rounded-none"
          >
            <ChevronRight color="#333" className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <div
            className={`p-1 px-4 rounded-lg cursor-pointer text-[#71717A] ${
              selectedRange == "day" && "bg-[#257BD2] text-white"
            }`}
            onClick={() => setselectedRange("day")}
          >
            Day
          </div>
          <div
            className={`p-1 px-4 rounded-lg cursor-pointer text-[#71717A] ${
              selectedRange == "week" && "bg-[#257BD2] text-white"
            }`}
            onClick={() => setselectedRange("week")}
          >
            Week
          </div>
          <div
            className={`p-1 px-4 rounded-lg cursor-pointer text-[#71717A] ${
              selectedRange == "month" && "bg-[#257BD2] text-white"
            }`}
            onClick={() => setselectedRange("month")}
          >
            Month
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <form className="flex items-center border rounded-xl p-1 px-2 min-w-60">
            <Search size={16} />
            <Input
              placeholder="Search assigned caregiver"
              className="w-full h-8 border-0 outnline-none focus:border-0  focus-visible:ring-[0px]"
            />
          </form>
        </div>
      </div>
      <hr className="-mt-2" />
      <div className="my-8 h-4 flex items-center gap-x-4">
        <div className="flex items-center">
          <Dot strokeWidth={8} color="#62C656" />
          <span className="text-[#202224] text-sm font-medium">
            Completed Visit
          </span>
        </div>

        <div className="flex items-center">
          <Dot strokeWidth={8} color="#ED6B60" />
          <span className="text-[#202224] text-sm font-medium">
            Not assigned
          </span>
        </div>

        <div className="flex items-center">
          <Dot strokeWidth={8} color="#257BD2" />
          <span className="text-[#202224] text-sm font-medium">
            Upcoming Schedule
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-[#F1F4F9] border-b border-gray-200">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-2 text-right font-semibold text-gray-700 text-sm mr-1 mt-4 pr-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {allDays.map((day, index) => {
            const isCurrentMonth =
              index >= previousDays.length &&
              index < previousDays.length + currentDays.length;
            const dayEvents = getEventsForDate(day, isCurrentMonth);

            return (
              <div
                key={`${day}-${index}`}
                className={`relative pt-12 min-h-36 border-r border-b border-gray-200 p-1  ${
                  !isCurrentMonth ? "bg-gray-50" : "bg-white "
                }`}
              >
                {/* Diagonal lines for non-current month */}
                {!isCurrentMonth && (
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, #999 10px, #999 12px)",
                    }}
                  />
                )}

                {/* Day Number */}

                <div className="relative z-10 w-full">
                  <p
                    className={`text-sm text-right px-2 font-semibold mb-2 ${
                      isCurrentMonth ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {day}
                  </p>
                  {/* Events */}
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick?.(event)}
                        className={`text-xs p-2 rounded cursor-pointer transition-hover ${
                          event.type === "assigned"
                            ? event.assigned
                              ? "bg-green-100 border-l-4 border-green-500"
                              : "bg-blue-100 border-l-4 border-blue-500"
                            : "bg-pink-100 border-l-4 border-pink-500"
                        }`}
                      >
                        <p
                          className={`font-medium ${
                            event.type === "assigned"
                              ? "text-gray-800"
                              : "text-red-600"
                          }`}
                        >
                          {event.type === "assigned"
                            ? event.name
                            : "Not assigned"}
                        </p>
                        <p className="text-gray-600">{event.time}</p>
                        <p className="text-gray-600">{event.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
