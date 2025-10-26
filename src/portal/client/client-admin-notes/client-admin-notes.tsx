import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DateRangePicker2 } from "@/components/ui/date-range-picker2";
import PageHeader from "@/components/ui/page-header/page-header";
import { getAdminNotes } from "@/services/note-service/note-service";
import { useClientStore } from "@/store/clientStore";
import { CalendarDays } from "lucide-react";

import { toast } from "react-toastify";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { AddNoteDialog } from "@/components/ui/add-note-dialog/add-note-dialog";

export default function ClientAdminNotes() {
  const [isLoadn, setisLoadn] = useState(false);
  const [notesArr, setnotesArr] = useState([]);
  const [dialogData, setdialogData] = useState({
    open: false,
    name: "",
  });
  // const [totalPages, settotalPages] = useState(1);
  const [mergedParams, setmergedParams] = useState<any>({
    paginate: true,
    page: 1,
    per_page: 20,
    status: 0,
  });
  // const [noteType, setnoteType] = useState("admin");
  const { client } = useClientStore();
  const clientObj = client;

  const fetchNotes = () => {
    setisLoadn(true);
    return getAdminNotes(mergedParams, clientObj.id).subscribe({
      next: (response) => {
        if (response) {
          // const { per_page, total } = response.pagination;
          // const totalPagx = Math.ceil(total / per_page);
          // settotalPages(totalPagx);
          const noteArray = response.data;
          const transformed = noteArray.map((obj: any) => {
            return {
              id_: obj.id,
              id: obj.id,
            };
          });
          setnotesArr(transformed);
          console.log("note response===>", transformed);
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
  };

  useEffect(() => {
    const noteSub = fetchNotes();
    return () => {
      noteSub.unsubscribe();
    };
  }, [mergedParams]);

  return (
    <React.Fragment>
      <h2 className="mb-2 font-bold text-cyan-600 text-sm">
        Client<span className="px-1"> / </span>
        <span className=" text-gray-600">
          {clientObj.firstName + " " + clientObj.lastName}
        </span>
      </h2>
      <div className="flex items-center justify-between">
        <div className="lg:w-3/12">
          <PageHeader title="Notes" hasBack />
        </div>
        <div className="flex items-center lg:gap-x-14 lg:w-8/12 lg:justify-end">
          {/* <div
            className={`font-bold border rounded flex items-center gap-1 text-xs lg:text-sm py-1 px-2 ${
              noteType == "admin" ? "border-cyan-500" : ""
            }`}
            onClick={() => setnoteType("admin")}
            style={{ cursor: "pointer" }}
          >
            <NotepadTextDashedIcon className="w-4 lg:w-5 cursor-pointer" />
            Admin Notes
          </div>

          <div
            className={`font-bold border rounded flex items-center gap-1 text-xs lg:text-sm py-1 px-2 ${
              noteType == "care" ? "border-cyan-500" : ""
            }`}
            onClick={() => setnoteType("care")}
          >
            <NotepadText className="w-4 lg:w-5 cursor-pointer" />
            Care Notes
          </div> */}
          <div className="lg:w-4/12">
            <DateRangePicker2
              onDateRangeChange={(startDate: any, endDate: any) => {
                if (startDate && endDate) {
                  setmergedParams((prev: any) => {
                    return { ...prev, date_from: startDate, date_to: endDate };
                  });
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { date_from, date_to, ...rest } = mergedParams;
                  setmergedParams({ ...rest });
                }
              }}
            />
          </div>
          <Button
            className=" cursor-pointer"
            onClick={() => {
              setdialogData({ open: true, name: "add" });
            }}
          >
            Add Admin Note
          </Button>
        </div>
      </div>
      <hr className="mt-4" />

      {notesArr.length ? (
        <div className="mt-2">
          <div className="w-full min-h-40 rounded lg:w-11/12 px-2 mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1" className="rounded">
                <AccordionTrigger className="text-xl text-cyan-600 p-2">
                  Product Information
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance w-full">
                  <div className="px-2 pt-2 w-full">
                    <p className="leading-6 text-md w-full">
                      Our flagship product combines cutting-edge technology with
                      sleek design. Built with premium materials, it offers
                      unparalleled performance and reliability.
                    </p>
                  </div>
                  <div className="mt-4 -mb-4">
                    <hr />
                    <div className="flex items-center gap-x-2 bg-slate-100 p-4">
                      <CalendarDays size={16} />
                      <span className="text-xs">10/09/2025 08:55 PM</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="rounded">
                <AccordionTrigger className="text-xl text-cyan-600 p-2">
                  Product Information
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance w-full">
                  <div className="px-2 pt-2 w-full">
                    <p className="leading-6 text-md w-full">
                      Our flagship product combines cutting-edge technology with
                      sleek design. Built with premium materials, it offers
                      unparalleled performance and reliability.
                    </p>
                  </div>
                  <div className="mt-4 -mb-4">
                    <hr />
                    <div className="flex items-center gap-x-2 bg-slate-100 p-4">
                      <CalendarDays size={16} />
                      <span className="text-xs">10/09/2025 08:55 PM</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-60 border rounded w-10/12 mx-auto mt-20">
          <h2 className="text-xl text-slate-400">No notes available.</h2>
        </div>
      )}

      {isLoadn && <LoadingSkeleton name="Fetching notes" />}

      {dialogData.open && dialogData.name === "add" && (
        <AddNoteDialog
          open={dialogData.open}
          mode="client"
          userId={clientObj.id}
          setOpen={() => {
            setdialogData({ open: false, name: "" });
          }}
          apiCall={fetchNotes}
        />
      )}
    </React.Fragment>
  );
}
