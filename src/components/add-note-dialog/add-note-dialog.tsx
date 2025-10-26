import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";
import { createAdminNote } from "@/services/note-service/note-service";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { RichTextEditor } from "../rich-text-editor/rich-text-editor";

type propT = {
  open: boolean;
  setOpen: () => void;
  mode: string;
  userId: string;
  apiCall: () => void;
};

type formvaluesT = {
  notetitle: string;
  type: string;
  description: string;
};

export function AddNoteDialog({ open, setOpen, mode, userId, apiCall }: propT) {
  const [isLoadn, setisLoadn] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formvaluesT>({
    defaultValues: {},
  });

  const handleOnSubmit = (formData: formvaluesT) => {
    setisLoadn(true);
    const { type, description, notetitle } = formData;
    const payload = {
      title: notetitle,
      type,
      description,
      client_id: userId,
      mode,
    };

    return createAdminNote(payload).subscribe({
      next: (response) => {
        if (response) {
          toast.success("Note created successfully!");
          apiCall();
          setOpen();
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {},
    });
  };

  const noteTypeArr = {
    client: [
      "ATTENDANT COMPLAINT",
      "REFUSAL OF SERVICES",
      "AGENCY COMPLAINT",
      "NON-COMPLIANT",
      "CLIENT COMPLIANT",
    ],
    employee: ["TERMINATION"],
  };
  const noteTypes =
    mode === "client" ? noteTypeArr.client : noteTypeArr.employee;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-6/12 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Admin Note</DialogTitle>
          <DialogDescription>
            Add note to this client for reference
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex flex-col gap-y-8 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input
                {...register("notetitle", {
                  required: "Title is required",
                  minLength: {
                    value: 12,
                    message: "Title is too short",
                  },
                })}
              />
              {errors.notetitle && (
                <p className="text-red-500 text-xs">
                  {errors.notetitle.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-3 w-full">
              <Label>Type</Label>
              <div className="flex flex-col gap-y-1">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Select a note type" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="h-10 w-full"
                        style={{ height: "40px" }}
                      >
                        <SelectValue placeholder="Select note type" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Types</SelectLabel>
                          {noteTypes.map((obj, idx: number) => (
                            <SelectItem value={obj} key={idx}>
                              {obj}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-xs text-red-400">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-y-3 w-full ">
              <Label>Description</Label>
              {/* <div className="flex flex-col gap-y-1">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Select a note type" }}
                  render={() => (
                    <Textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="border min-h-40"
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div> */}

              <div className="flex flex-col gap-y-1">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Select a note type" }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Start typing your content..."
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-x-4 mt-4">
            <div
              className="h-8 w-[100px] cursor-pointer text-sm flex items-center justify-center border rounded"
              onClick={() => setOpen()}
            >
              Cancel
            </div>
            <Button type="submit" className="h-8 w-[100px] cursor-pointer ">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
      {isLoadn && <LoadingSkeleton name="Creating note" />}
    </Dialog>
  );
}
