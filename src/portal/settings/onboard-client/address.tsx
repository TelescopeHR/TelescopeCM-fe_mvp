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
import { AllStates } from "@/utils/data";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type PropT = {
  data: ICreateEmployee;
  setData: (x: any) => void;
  setValidSteps: (x: any) => void;
  setActiveStep: (x: any) => void;
};

export default function Address({
  data,
  setData,
  setValidSteps,
  setActiveStep,
}: PropT) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      address: data?.address || "",
      city: data?.city || "",
      state: data?.state || "",
      zip: data?.zip || "",
    },
  });

  const handleOnSubmit = (formData: ICreateEmployee) => {
    setData((prev: any) => {
      return { ...prev, ...formData };
    });
    setValidSteps((prev: any) => {
      return { ...prev, Address: isValid };
    });
    setActiveStep(2);
  };

  useEffect(() => {
    setValidSteps((prev: any) => {
      return { ...prev, Address: isValid };
    });
  }, [isValid]);

  return (
    <div className="mt-4">
      <form
        className="w-w-full lg:w-8/12 py-4 flex flex-col gap-y-8"
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

        <Button type="submit" className="h-8 w-[100px]">
          Proceed
        </Button>
      </form>
    </div>
  );
}
