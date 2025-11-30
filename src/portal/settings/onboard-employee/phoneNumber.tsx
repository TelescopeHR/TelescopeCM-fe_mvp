import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICreateEmployee } from "@/models/employee-model";
import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";

type PropT = {
  data: ICreateEmployee;
  setData: (x: any) => void;
  setValidSteps: (x: any) => void;
  setActiveStep: (x: any) => void;
};

export default function PhoneNumber({
  data,
  setData,
  setValidSteps,
  setActiveStep,
}: PropT) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      login_phone: data?.login_phone || "",
      phone_numbers: data?.phone_numbers || [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_numbers",
  });

  const handleOnSubmit = (formData: ICreateEmployee) => {
    setData((prev: any) => ({ ...prev, ...formData }));
    setValidSteps((prev: any) => ({ ...prev, "Phone Numbers": isValid }));
    setActiveStep(3);
  };

  useEffect(() => {
    setValidSteps((prev: any) => {
      return { ...prev, "Phone Numbers": isValid };
    });
  }, [isValid]);

  return (
    <div className="mt-4">
      <form
        className="w-full lg:w-8/12 py-4 flex flex-col gap-y-8"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {/* Login Phone */}
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label>Login Phone Number</Label>
            <Input
              {...register("login_phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Must be at least 10 digits" },
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    {errors.phone_numbers[idx]?.phone_number?.message as string}
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

        <Button className="h-8 w-[100px]">Proceed</Button>
      </form>
    </div>
  );
}
