import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash } from "lucide-react";
import { ICreateEmployee } from "@/models/employee-model";
import { useCareGiverStore } from "@/store/caregiverStore";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { updateEmployeePhones } from "@/services/employee-service/employee-service";
import LoadingSkeleton from "@/components/skeleton/skeleton";

type PropT = {
  open: boolean;
  setopen: (x: boolean) => void;
  makeApiCall: () => void;
};
export function PhoneDialogUpdate({ open, setopen, makeApiCall }: PropT) {
  const { careGiver } = useCareGiverStore();
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      login_phone: "",
      phone_numbers: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_numbers",
  });

  const handleOnSubmit = (formData: ICreateEmployee) => {
    if (isValid) {
      setisloading(true);
      setskeletonMessage("Updating");
      const payload = { phone_numbers: formData.phone_numbers };

      return updateEmployeePhones(payload, careGiver.id).subscribe({
        next: (response) => {
          if (response) {
            toast.success("Updated successfully!");
            setopen(false);
            makeApiCall();
          }
        },
        error: (err) => {
          toast.error(err.response.data.error);
          setisloading(false);
        },
        complete: () => {
          setisloading(false);
        },
      });
    }
  };

  const phoneTypes = [
    { type: "home", value: "1" },
    { type: "mobile", value: "2" },
    { type: "other", value: "3" },
  ];

  useEffect(() => {
    if (careGiver) {
      const filtedredPhones = careGiver.phones.filter(
        (item: any) => item.type !== "login_phone"
      );

      const phn = filtedredPhones.map((obj: any) => {
        return {
          phone_number: obj.phone_number,
          type: phoneTypes.find((s) => s.type === obj.type)?.value || "",
        };
      });

      reset({
        login_phone: careGiver.phone || "",
        phone_numbers: [...phn],
      });
    }
  }, [careGiver, open, reset]);

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>UPDATE PHONE NUMBERS</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>

          <form
            className="w-full  py-4 flex flex-col gap-y-8"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            {/* Login Phone */}
            <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label>Login Phone Number</Label>
                <Input
                  {...register("login_phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Must be at least 10 digits",
                    },
                  })}
                  type="number"
                  placeholder="Example: 14155552671"
                  className="border h-10"
                />
                {errors.login_phone && (
                  <p className="text-xs text-red-400">
                    {errors.login_phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic phone numbers */}
            {fields.map((field, idx) => (
              <div className="w-full border p-4" key={field.id}>
                <div className="w-full flex justify-end">
                  <Trash
                    size={16}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => remove(idx)}
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-x-10 w-full">
                  {/* Type */}
                  <div className="flex flex-col gap-y-3 w-full">
                    <Label>Type</Label>
                    <Controller
                      control={control}
                      name={`phone_numbers.${idx}.type`}
                      rules={{ required: "Type is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="w-full h-10"
                            style={{ height: "40px" }}
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="1">Home</SelectItem>
                              <SelectItem value="2">Mobile</SelectItem>
                              <SelectItem value="3">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.phone_numbers?.[idx]?.type && (
                      <p className="text-xs text-red-400">
                        {errors.phone_numbers[idx]?.type?.message as string}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-y-3 w-full">
                    <Label>Phone Number</Label>
                    <Input
                      type="number"
                      placeholder="Example: 14155552671"
                      className="border h-10"
                      {...register(`phone_numbers.${idx}.phone_number`, {
                        required: "Phone number is required",
                        minLength: {
                          value: 10,
                          message: "Must be at least 10 digits",
                        },
                      })}
                    />
                    {errors.phone_numbers?.[idx]?.phone_number && (
                      <p className="text-xs text-red-400">
                        {
                          errors.phone_numbers[idx]?.phone_number
                            ?.message as string
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add button */}
            {fields.length < 3 && (
              <div
                className="w-full flex justify-end cursor-pointer items-center gap-x-2"
                onClick={() => append({ type: "", phone_number: "" })}
              >
                <Plus /> <span>Add</span>
              </div>
            )}

            <div className="flex items-center gap-x-4">
              <div
                className="h-8 w-[100px] flex items-center text-sm font-bold justify-center cursor-pointer border text-center rounded border-slate-400"
                onClick={() => setopen(false)}
              >
                Cancel
              </div>
              <Button type="submit" className="h-8 w-[100px] cursor-pointer ">
                Update
              </Button>
            </div>
          </form>
          {isloading && <LoadingSkeleton name={skeletonMessage} />}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
