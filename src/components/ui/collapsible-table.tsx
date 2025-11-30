"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ColumnDef,
  flexRender,
  type SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import DateRangePicker from "./date-range-picker";

type FilterObj = {
  label: string;
  value: any;
};

interface CollapsibleTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  filterArray: FilterObj[];
  handleFilter?: (x: any) => void;
  renderDetails?: (row: TData) => React.ReactNode;

  withExport: boolean;
  exportTypes?: "Excel" | "PDF" | "All";
  handleExport?: (exportType: string, data: any) => void;
  withDate: boolean;
  handleDate?: (obj: any) => void;
  searchColumn?: string;
  searchPlaceholder?: string;
  totalCount?: number;
  currentPage?: number;
  apiCall?: (x: any) => void;
}

export function CollapsibleTable<TData extends { id: string | number }>({
  columns,
  data,
  filterArray,
  handleFilter,
  renderDetails,
  searchColumn = "name",
  withExport = true,
  handleExport,
  exportTypes = "Excel",
  withDate = true,
  searchPlaceholder = "Search...",
  handleDate,
  totalCount,
  currentPage,
  apiCall,
}: CollapsibleTableProps<TData>) {
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const toggleRow = (rowId: string | number) => {
    const newExpanded = new Set<string | number>();
    if (!expandedRows.has(rowId)) {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const expandColumn: ColumnDef<TData> = {
    id: "expand",
    header: "",
    cell: ({ row }) => {
      if (!renderDetails) return null;
      return (
        <ChevronDown
          className={`h-4 w-4 transition-transform pointer-events-none ${
            expandedRows.has((row.original as any).id) ? "rotate-180" : ""
          }`}
        />
      );
    },
  };

  const table = useReactTable({
    data,
    columns: [expandColumn, ...columns],
    pageCount: totalCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="flex items-center justify-between py-4 w-full">
        <div className="flex items-center gap-x-2">
          {/* Search */}
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

          {/* Filter */}
          <Select
            onValueChange={(value) => {
              console.log("filter selected", value);
              if (handleFilter) handleFilter(value);
            }}
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

          {/* Date Range */}
          {withDate && <DateRangePicker onRangeChange={handleRangeChange} />}
        </div>

        {/* Column & Export */}
        <div className="flex items-center gap-x-4 w-6/12 justify-end">
          {/* Column toggle */}
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

          {/* Export */}
          {withExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
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
                  )}

                  {exportTypes == "PDF" && (
                    <DropdownMenuCheckboxItem
                      className="capitalize cursor-pointer"
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

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getPaginationRowModel().rows?.length ? (
              table.getPaginationRowModel().rows.map((row) => [
                <TableRow
                  key={row.id}
                  onClick={() => {
                    if (renderDetails) {
                      toggleRow((row.original as any).id);
                    }
                  }}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>,
                expandedRows.has((row.original as any).id) && renderDetails ? (
                  <TableRow key={`${row.id}-details`}>
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="bg-muted/30 px-4 py-4"
                    >
                      <div className="space-y-2">
                        {renderDetails(row.original)}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null,
              ])
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* Footer with page size + pagination */}
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center gap-x-2">
          {/* Page size selector */}
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  Show {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Pagination controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              if (currentPage && apiCall) apiCall(currentPage - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => table.nextPage()}
            onClick={() => {
              table.nextPage();
              if (currentPage && apiCall) apiCall(currentPage + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
