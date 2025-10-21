"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduleT = {
  id: string;
  status: string;
};

export const ScheduleDefColumns = (
  handleNavigation: (x: any) => void,
  handleEdit: (x: any) => void,
  handleDelete: (x: any) => void,
  handleStatus: (x: any) => void
): ColumnDef<ScheduleT>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "scheduleId",
    header: "S/N",
  },

  {
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => {
      const record: any = row.original;

      return (
        <span>{record.client.first_name + " " + record.client.first_name}</span>
      );
    },
  },

  {
    accessorKey: "scheduleType",
    header: "Type",
  },

  {
    accessorKey: "startDate",
    header: "Start Date",
  },

  {
    accessorKey: "endDate",
    header: "End Date",
  },

  {
    accessorKey: "hours",
    header: "Hours",
  },

  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const record = row.original;

      const color =
        record.status === "active"
          ? "#28A745"
          : record.status === "inactive"
          ? "#DC3545"
          : "#DC3545";

      return (
        <span style={{ color }}>
          <span style={{ textTransform: "capitalize" }}>{record.status}</span>
        </span>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleNavigation(record)}
                className=" cursor-pointer"
              >
                View Details
              </DropdownMenuItem>

              <DropdownMenuItem className=" cursor-pointer">
                Visits
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleEdit(record)}
                className=" cursor-pointer"
              >
                Edit Schedule
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  handleStatus(record);
                }}
                className=" cursor-pointer"
              >
                {record.status === "active" ? "Deactivate" : "Activate"}
              </DropdownMenuItem>

              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => handleDelete(record)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
