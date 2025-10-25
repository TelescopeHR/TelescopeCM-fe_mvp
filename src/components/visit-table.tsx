"use client";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
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

import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { SearchableSelect } from "./ui/searchable-select";
import { DateRangePicker2 } from "./ui/date-range-picker2";

type FilterObj = {
  label: string;
  value: any;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  clientArr: FilterObj[];
  employeeArr: FilterObj[];
  searchPlaceholder: string;
  handleFilter?: (x: any) => void;
  showSerialNumber: boolean;
  withExport: boolean;
  exportTypes?: "Excel" | "PDF" | "All";
  handleExport?: (exportType: string, data: any) => void;
  withDate: boolean;
  searchColumn?: string;
  handleDate?: (obj: any) => void;
  totalCount?: number;
  currentPage?: number;
  apiCall?: (x: any) => void;
  setparams: (x: any) => void;
  params: any;
}

export function VisitTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder,
  showSerialNumber = false,
  withExport = true,
  clientArr,
  employeeArr,
  handleExport,
  exportTypes = "Excel",
  withDate = true,
  searchColumn = "name",
  handleDate,
  totalCount,
  currentPage,
  apiCall,
  params,
  setparams,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const [filterObj, setfilterObj] = useState({
    category: "",
    selectedValue: "",
  });

  const toggle = (value: string) => {
    if (value === filterObj.category) {
      setfilterObj((prev) => {
        return { ...prev, selectedValue: "", category: "" };
      });
    } else {
      setfilterObj((prev) => {
        return { ...prev, category: value };
      });
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: totalCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
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
      if (range.startDate == null && range.endDate) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date_from, date_to, ...rest } = params;
        setparams({ ...rest });
      } else {
        handleDate(range);
      }
    }
  };

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((obj) => obj.original);

  useEffect(() => {
    if (filterObj.category === "Client" && filterObj.selectedValue) {
      setparams({ ...params, client_id: filterObj.selectedValue });
    } else if (filterObj.category === "Employee" && filterObj.selectedValue) {
      setparams({ ...params, page: 1, employee_id: filterObj.selectedValue });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { employee_id, client_id, ...rest } = params;
      setparams({ ...rest });
    }
  }, [filterObj.selectedValue]);

  return (
    <div className="rounded-md border p-4">
      {/* Top Filters */}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto min-w-28">
                Filter <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="lg:w-5/12"
              style={{ width: "26rem" }}
            >
              <div className="flex w-full">
                <div className="w-4/12 p-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="client"
                        checked={filterObj.category === "Client"}
                        onCheckedChange={() => toggle("Client")}
                      />
                      <Label htmlFor="client">Client</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="employee"
                        checked={filterObj.category === "Employee"}
                        onCheckedChange={() => toggle("Employee")}
                      />
                      <Label htmlFor="employee">Employee</Label>
                    </div>
                  </div>
                </div>
                <div className="w-10/12 border-l px-2 min-h-40">
                  <SearchableSelect
                    options={
                      filterObj.category === "Employee"
                        ? employeeArr
                        : clientArr
                    }
                    value={filterObj.selectedValue}
                    onValueChange={(value) =>
                      setfilterObj((prev) => {
                        return { ...prev, selectedValue: value };
                      })
                    }
                    placeholder={`Select ${filterObj.category}`}
                    searchPlaceholder={`Search ${filterObj.category}s`}
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Range */}
          {withDate && (
            <DateRangePicker2
              onDateRangeChange={(startDate: any, endDate: any) => {
                handleRangeChange({ startDate, endDate });
              }}
            />
          )}
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
          {table.getPaginationRowModel().rows?.length ? (
            table.getPaginationRowModel().rows.map((row, index: number) => (
              <TableRow
                key={index}
                data-state={row.getIsSelected() && "selected"}
                className="dark:hover:bg-slate-800"
              >
                {showSerialNumber && (
                  <TableCell className="w-5">
                    {row.index +
                      1 +
                      table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize}
                  </TableCell>
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
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setparams({
                ...params,
                per_page: value,
              });
            }}
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
