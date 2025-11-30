"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScheduleT = {
  id: string;
  status: string;
};

export const ScheduleVisitDefColumns = (): ColumnDef<ScheduleT>[] => [
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
    accessorKey: "sn",
    header: "S/N",
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
    cell: () => {
      return (
        <div className="flex justify-end">
          <div className="h-8"></div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
