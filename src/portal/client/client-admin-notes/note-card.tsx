import { DeleteDialog } from "@/components/delete-dialog/delete-dialog";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INoteResponse } from "@/models/note-model";
import { deleteNote } from "@/services/note-service/note-service";
import { formatDateTime } from "@/utils/utils";
import { CalendarDays, SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

type propT = {
  note: INoteResponse;
  apiCall: () => void;
};

export default function NoteCard({ note, apiCall }: propT) {
  const [isLoadn, setisLoadn] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("");
  const [dialogData, setdialogData] = useState({
    open: false,
    name: "",
  });

  const handleDelete = () => {
    setisLoadn(true);
    setskeletonMessage("Deleting note");
    return deleteNote(note.id).subscribe({
      next: () => {
        toast.success("Note deleted!");
        apiCall();
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {},
    });
  };

  return (
    <React.Fragment>
      <AccordionItem value={note.id} className="rounded">
        <AccordionTrigger className="text-xl text-cyan-600 p-2">
          <div className="flex w-full justify-between">{note.title}</div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance w-full mt-2">
          <div>
            <label className="text-[0.60rem] font-bold bg-cyan-500  ml-2 rounded-full  p-2 mt-2">
              {note.type}
            </label>
          </div>
          <div className="px-2 pt-2 w-full">
            <div className=" w-full">{note.description}</div>
          </div>
          <div className="mt-4 -mb-4">
            <hr />
            <div className="flex justify-between w-full items-center lg:pr-8">
              <div className="flex items-center gap-x-2 bg-slate-100 p-4">
                <CalendarDays size={16} />
                <span className="text-xs">
                  {formatDateTime(note.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-x-4">
                <SquarePen size={16} className=" cursor-pointer" />
                <Trash
                  color="red"
                  size={16}
                  className=" cursor-pointer"
                  onClick={() => {
                    setdialogData({ open: true, name: "delete" });
                  }}
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {dialogData.open && dialogData.name == "delete" && (
        <DeleteDialog
          open={dialogData.open}
          setopen={() => setdialogData({ name: "", open: false })}
          description={`You're about to delete this note,  Do you want to proceed?`}
          handleProceed={handleDelete}
        />
      )}

      {isLoadn && <LoadingSkeleton name={skeletonMessage} />}
    </React.Fragment>
  );
}
