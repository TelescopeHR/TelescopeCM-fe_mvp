import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/ui/page-header/page-header";
import { useState } from "react";
import { VisitDefColumns } from "./visit-columns";
import { Button } from "@/components/ui/button";

import { AddVisitDialog } from "./add-visit-dialog";

export default function Visitspage() {
  const [mergedparams, setmergedparams] = useState({
    type: "client",
    page: 1,
  });

  const columns = VisitDefColumns();
  const [dialogData, setdialogData] = useState({ open: false, name: "" });
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <PageHeader title="Visits" hasBack />
        <Button
          className=" cursor-pointer"
          onClick={() => {
            setdialogData({ open: true, name: "addvisit" });
          }}
        >
          Add Visit
        </Button>
      </div>

      {/* ==== table ======= */}
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={[]}
          searchPlaceholder={
            mergedparams.type === "client"
              ? "Search by Client ID"
              : "Search by Employee ID"
          }
          filterArray={[]}
          handleFilter={(value) => {
            setmergedparams((prev) => {
              return { ...prev, status: value };
            });
          }}
          showSerialNumber={false}
          withExport={true}
          withDate={true}
          handleExport={() => ""}
          searchColumn="employeeId"
          currentPage={mergedparams.page}
          totalCount={0}
          apiCall={(pageNo: number) => {
            setmergedparams((prev) => {
              return { ...prev, page: pageNo };
            });
          }}
        />
      </div>

      {dialogData.name == "addvisit" && dialogData.open && (
        <AddVisitDialog
          open={dialogData.open}
          setOpen={() => {
            setdialogData({ open: false, name: "" });
          }}
        />
      )}
    </>
  );
}
