import LoadingSkeleton from "@/components/skeleton/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICreateEmployee } from "@/models/employee-model";
import { updateEmployee } from "@/services/employee-service/employee-service";
import { useCareGiverStore } from "@/store/caregiverStore";
import { AllStates } from "@/utils/data";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type PropT = {
  open: boolean;
  setopen: (x: boolean) => void;
  makeApiCall: () => void;
};
export function AddressDialogUpdate({ open, setopen, makeApiCall }: PropT) {
  const { careGiver } = useCareGiverStore();
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const handleOnSubmit = (formData: ICreateEmployee) => {
    if (isValid) {
      setisloading(true);
      setskeletonMessage("Updating");
      const payload = {
        type: "address",
        ...formData,
      };
      return updateEmployee(payload, careGiver.id).subscribe({
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

  useEffect(() => {
    const location = careGiver.location;
    if (careGiver) {
      reset({
        address: location.address || "",
        city: location.city || "",
        state: location.state || "",
        zip: location.zip || "",
      });
    }
  }, [careGiver, open, reset]);

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>UPDATE ADDRESS</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <form
          className="w-w-full py-4 flex flex-col gap-y-8"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
            <div className="flex flex-col gap-y-3 w-full">
              <Label htmlFor="address">Address</Label>
              <Input
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="text"
                placeholder="Address"
                className=" border h-10"
              />
              {errors.address && (
                <p className="text-xs text-red-400">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-3 w-full">
              <Label htmlFor="city">City</Label>
              <Input
                {...register("city", {
                  required: "City is required",
                  minLength: { value: 1, message: "Too short" },
                })}
                type="text"
                placeholder="City"
                className=" border h-10"
              />
              {errors.city && (
                <p className="text-xs text-red-400">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
            <div className="flex flex-col gap-y-3 w-full">
              <Label htmlFor="gender">State</Label>

              <Controller
                name="state"
                control={control}
                rules={{ required: "Select a state" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{ height: "40px" }}
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {AllStates.map((obj, idx: number) => (
                          <SelectItem value={obj.code} key={idx}>
                            {obj.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && (
                <p className="text-xs text-red-400">{errors.state.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-3 w-full">
              <Label htmlFor="zip">Zip</Label>
              <Input
                {...register("zip", {
                  required: "Zip is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="number"
                placeholder="Zip code"
                maxLength={5}
                className=" border h-10"
              />
              {errors.zip && (
                <p className="text-xs text-red-400">{errors.zip.message}</p>
              )}
            </div>
          </div>

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
      </AlertDialogContent>
    </AlertDialog>
  );
}
