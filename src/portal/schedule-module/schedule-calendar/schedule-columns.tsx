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
  photo?: string;
};

export const ScheduleDefColumns = (): ColumnDef<ScheduleT>[] => [
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
  //   accessorKey: "photo",
  //   header: "",
  //   cell: ({ row }) => {
  //     const record = row.original;

  //     return (
  //       <div className="flex justify-start">
  //         <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center ring-0 ring-blue-300">
  //           {record.photo ? (
  //             <img
  //               src={record.photo}
  //               alt="User Avatar"
  //               width={40}
  //               height={40}
  //               className="object-cover w-full h-full"
  //             />
  //           ) : (
  //             <span className="text-slate-500 text-sm font-medium">👤</span>
  //           )}
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: "employee",
    header: "Employee",
  },

  {
    accessorKey: "monday",
    header: "Mon",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">04/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "tuesday",
    header: "Tue",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">05/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "wednesday",
    header: "Wed",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">06/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "thursday",
    header: "Thur",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">07/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "friday",
    header: "Fri",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">08/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "saturday",
    header: "Sat",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">09/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    accessorKey: "sunday",
    header: "Sun",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const record = row.original;

      return (
        <div className="w-full px-4 bg-indigo-100  min-h-20 rounded flex flex-col  justify-center text-[0.70rem]">
          <p className="font-bold">10/11/2025</p>
          <p>IN:08:00</p>
          <p> OUT:17:00</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: () => {
      // const record = row.original;

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
              <DropdownMenuItem onClick={() => ""} className=" cursor-pointer">
                Update
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => ""} className=" cursor-pointer">
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
