"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Dot, MoreHorizontal } from "lucide-react";

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
export type clientT = {
  id: string;
  id_: string;
  dob: string;
  status: string;
  priorityLevel: string;
  client: {
    img: any;
    name: string;
  };
  age: any;
  clientId: string;
};

const getColor = (priority: string): string => {
  if (priority === "High") return "#FA0505";
  if (priority === "Medium") return "#E89702";
  else return "#424242";
};

export const ClientdefColumns = (
  handleNavigation: (x: any) => void,
  handleStatus: (x: any) => void,
  handleVisits: (x: any) => void
): ColumnDef<clientT>[] => [
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
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 bg-red-400 rounded-full overflow-hidden">
            <img
              src={row.original.client.img}
              className="w-8 h-8 object-cover"
            />
          </div>
          <span>{row.original.client.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "clientId",
    header: "Client ID",
  },

  {
    accessorKey: "age",
    header: "Age",
  },

  {
    accessorKey: "primaryCondition",
    header: "Primary Condition",
  },

  {
    accessorKey: "classification",
    header: "Classification",
  },

  {
    accessorKey: "priorityLevel",
    header: "Priority Level",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Dot
            strokeWidth={4}
            style={{ color: getColor(row.original.priorityLevel) }}
          />
          <span style={{ color: getColor(row.original.priorityLevel) }}>
            {row.original.priorityLevel}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "careTeam",
    header: "CareTeam",
  },

  {
    accessorKey: "nextVisit",
    header: "Next Visit",
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

              <DropdownMenuItem
                onClick={() => handleVisits(record)}
                className=" cursor-pointer"
              >
                Edit Details
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
