"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduleT = {
  id: string;
  status: string;
};

export const VisitDefColumns = (
  handleUpdate: (x: any) => void,
  handleDelete: (x: any) => void
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

  // {
  //   accessorKey: "sn",
  //   header: "S/N",
  // },

  // {
  //   accessorKey: "employeeId",
  //   header: "Employee ID",
  // },

  {
    accessorKey: "employeeName",
    header: "Employee",
  },

  {
    accessorKey: "clientName",
    header: "Client",
  },

  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "timeIn",
    header: "Time In",
  },

  {
    accessorKey: "timeOut",
    header: "Time Out",
  },

  {
    accessorKey: "verifiedIn",
    header: "Verified In",
  },

  {
    accessorKey: "verifiedOut",
    header: "Verified Out",
  },

  {
    accessorKey: "status",
    header: "Status",
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
                onClick={() => handleUpdate(record)}
                className=" cursor-pointer"
              >
                Update
              </DropdownMenuItem>

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
