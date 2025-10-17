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
export type StudentT = {
  id: string;
  id_: string;
  dob: string;
  tablestatus: string;
  photo?: string;
};

export const EmployeedefColumns = (
  handleNavigation: (x: any) => void,
  handleStatus: (x: any) => void,
  handleSchedules: (x: any) => void,
  handleVisits: (x: any) => void,
  handleDelete: (x: any) => void
): ColumnDef<StudentT>[] => [
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
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex justify-start">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center ring-0 ring-blue-300">
            {record.photo ? (
              <img
                src={record.photo}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-slate-500 text-sm font-medium">👤</span>
            )}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "firstName",
    header: "First Name",
  },

  {
    accessorKey: "middleName",
    header: "Middle Name",
  },

  {
    accessorKey: "lastName",
    header: "Last Name",
  },

  {
    accessorKey: "gender",
    header: "Gender",
  },

  {
    accessorKey: "dob",
    header: "Birth Date",
  },
  {
    accessorKey: "tablestatus",
    header: "Status",
    cell: ({ row }) => {
      const record = row.original;

      const color =
        record.tablestatus === "Active"
          ? "#28A745"
          : record.tablestatus === "inactive"
          ? "#DC3545"
          : "#DC3545";

      return (
        <span style={{ color }}>
          <span style={{ textTransform: "capitalize" }}>
            {record.tablestatus}
          </span>
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
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleSchedules(record)}
                className=" cursor-pointer"
              >
                Schedules
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleVisits(record)}
                className=" cursor-pointer"
              >
                Visits
              </DropdownMenuItem>

              {/* <DropdownMenuItem
                onClick={() => handleStatus(record)}
                className=" cursor-pointer"
              >
                {record.tablestatus === "Active" ? "Deactivate" : "Activate"}
              </DropdownMenuItem> */}

              <DropdownMenuItem
                onClick={() => handleDelete(record)}
                className=" cursor-pointer"
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
