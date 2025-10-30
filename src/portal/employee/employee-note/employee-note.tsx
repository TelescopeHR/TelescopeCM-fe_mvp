import { AddNoteDialog } from "@/components/add-note-dialog/add-note-dialog";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DateRangePicker2 } from "@/components/ui/date-range-picker2";
import PageHeader from "@/components/ui/page-header/page-header";
import { INoteResponse } from "@/models/note-model";
import { getAdminNotes } from "@/services/note-service/note-service";
import { useCareGiverStore } from "@/store/caregiverStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoteCard from "./note-card";

export default function EmployeeNote() {
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
  const { careGiver } = useCareGiverStore();

  const fetchNotes = () => {
    setisLoadn(true);
    return getAdminNotes(mergedParams, careGiver.id).subscribe({
      next: (response) => {
        if (response) {
          // const { per_page, total } = response.pagination;
          // const totalPagx = Math.ceil(total / per_page);
          // settotalPages(totalPagx);
          const noteArray = response.data;
          const transformed = noteArray.map((obj: any) => {
            return {
              ...obj,
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
    <div>
      <div className="flex items-center mb-2">
        <h2 className="text-sm text-cyan-600 font-bold mr-2">EMPLOYEE</h2> /
        <span className="font-bold text-sm ml-2">
          {" "}
          {careGiver.firstName + " " + careGiver.lastName}
        </span>
      </div>
      <div className="flex items-center justify-between lg:mr-10">
        <PageHeader title="Notes" hasBack />

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
            className=" cursor-pointer hidden lg:block"
            onClick={() => {
              setdialogData({ open: true, name: "add" });
            }}
          >
            Add Note
          </Button>
          <div
            className="lg:hidden mx-4"
            onClick={() => {
              setdialogData({ open: true, name: "add" });
            }}
          >
            <Plus />
          </div>
        </div>
      </div>
      <hr className="mt-4" />

      {notesArr.length ? (
        <div className="mt-10 mb-80">
          <div className="w-full py-6 rounded lg:w-11/12 px-2 mx-auto border">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              defaultValue="item-1"
            >
              {notesArr.map((note: INoteResponse, idx: number) => (
                <NoteCard key={idx} note={note} apiCall={fetchNotes} />
              ))}
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
          mode="employee"
          userId={careGiver.id}
          setOpen={() => {
            setdialogData({ open: false, name: "" });
          }}
          apiCall={fetchNotes}
        />
      )}
    </div>
  );
}
