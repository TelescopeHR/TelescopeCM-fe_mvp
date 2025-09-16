"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import DateRangePicker from "./ui/date-range-picker";

type FilterObj = {
  label: string;
  value: any;
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder: string;
  filterArray: FilterObj[];
  showSerialNumber: boolean;
  withExport: boolean;
  exportTypes?: "Excel" | "PDF" | "All";
  handleExport?: (exportType: string, data: any) => void;
  withDate: boolean;
  searchColumn?: string;
  handleDate?: (obj: any) => void;
  currentPage?: number;
  handlePagination?: (x: any) => void;
  handleFilter?: (x: any) => void;
  paginationObj?: { hasNextPage: boolean };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder,
  filterArray,
  showSerialNumber = false,
  withExport = true,
  handleExport,
  exportTypes = "Excel",
  withDate = true,
  searchColumn = "name",
  handleDate,
  currentPage,
  handlePagination,
  paginationObj,
  handleFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const handleRangeChange = (range: {
    startDate: string | null;
    endDate: string | null;
  }) => {
    if (handleDate) {
      handleDate(range);
    }
  };

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((obj) => obj.original);

  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center justify-between py-4 w-full">
        <div className="flex items-center gap-x-2">
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-[12rem]"
          />
          <Select
            onValueChange={(value) => handleFilter && handleFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                {filterArray.length ? (
                  filterArray.map((obj, index: number) => (
                    <SelectItem value={obj.value} key={index}>
                      {obj.label}
                    </SelectItem>
                  ))
                ) : (
                  <></>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            {withDate && <DateRangePicker onRangeChange={handleRangeChange} />}
          </div>
        </div>
        <div className="flex items-center gap-x-4 w-6/12 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column?.columnDef?.header === "string"
                        ? column?.columnDef?.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {withExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  Export{" "}
                  {selectedRows.length === 0
                    ? ""
                    : selectedRows.length == data.length
                    ? "All"
                    : selectedRows.length}
                </Button>
              </DropdownMenuTrigger>
              {data.length && (
                <DropdownMenuContent>
                  {exportTypes == "All" && (
                    <>
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        checked={exportTypes == "All"}
                        // onCheckedChange={(value) => ""}
                        onClick={() =>
                          handleExport &&
                          handleExport(
                            "Excel",
                            selectedRows.length ? selectedRows : data
                          )
                        }
                      >
                        To Excel
                      </DropdownMenuCheckboxItem>

                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        checked={exportTypes == "All"}
                        // onCheckedChange={(value) => ""}
                        onClick={() =>
                          handleExport &&
                          handleExport(
                            "Pdf",
                            selectedRows.length ? selectedRows : data
                          )
                        }
                      >
                        To Pdf
                      </DropdownMenuCheckboxItem>
                    </>
                  )}
                  {exportTypes == "Excel" && (
                    <DropdownMenuCheckboxItem
                      className="capitalize cursor-pointer"
                      checked={exportTypes == "Excel"}
                      // onCheckedChange={(value) => ""}
                      onClick={() => {
                        if (handleExport) {
                          handleExport(
                            "Excel",
                            selectedRows.length ? selectedRows : data
                          );
                        }
                      }}
                    >
                      To Excel
                    </DropdownMenuCheckboxItem>
                  )}

                  {exportTypes == "PDF" && (
                    <DropdownMenuCheckboxItem
                      className="capitalize cursor-pointer"
                      checked={exportTypes == "PDF"}
                      // onCheckedChange={(value) => ""}
                      onClick={() =>
                        handleExport &&
                        handleExport(
                          "Pdf",
                          selectedRows.length ? selectedRows : data
                        )
                      }
                    >
                      To Pdf
                    </DropdownMenuCheckboxItem>
                  )}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {showSerialNumber && <TableHead>S/N</TableHead>}
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index: number) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="dark:hover:bg-slate-800"
              >
                {showSerialNumber && (
                  <TableCell className="w-5">{index + 1}</TableCell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between w-full">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (currentPage && currentPage > 1 && handlePagination) {
                handlePagination(currentPage - 1);
              }
            }}
            disabled={currentPage && currentPage > 1 ? false : true}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (paginationObj?.hasNextPage && handlePagination)
                handlePagination(currentPage! + 1);
            }}
            disabled={!paginationObj?.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
