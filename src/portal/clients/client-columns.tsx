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
  status: string;
};

export const ClientdefColumns = (
  handleNavigation: (x: any) => void,
  handleStatus: (x: any) => void,
  handleSchedules: (x: any) => void,
  handleVisits: (x: any) => void,
  handleAdminNotes: (x: any) => void
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
    accessorKey: "clientId",
    header: "Client ID",
  },

  {
    accessorKey: "firstName",
    header: "First Name",
  },

  // {
  //   accessorKey: "middleName",
  //   header: "Middle Name",
  // },

  {
    accessorKey: "lastName",
    header: "Last Name",
  },

  // {
  //   accessorKey: "gender",
  //   header: "Gender",
  // },

  // {
  //   accessorKey: "dob",
  //   header: "Birth Date",
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const record = row.original;

  //     const color =
  //       record.status === "active"
  //         ? "#28A745"
  //         : record.status === "inactive"
  //         ? "#DC3545"
  //         : "#DC3545";

  //     return (
  //       <span style={{ color }}>
  //         <span style={{ textTransform: "capitalize" }}>{record.status}</span>
  //       </span>
  //     );
  //   },
  // },

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
                onClick={() => handleAdminNotes(record)}
                className=" cursor-pointer"
              >
                View Notes
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleVisits(record)}
                className=" cursor-pointer"
              >
                Visits
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleStatus(record)}
                className=" cursor-pointer"
              >
                {record.status === "active" ? "Deactivate" : "Activate"}
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
