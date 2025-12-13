import { useEffect } from "react";
import { ClientDTO } from "./client.dto";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateOfBirthSelect } from "@/components/birthday-input/birthday-input";
import { PhoneNumberInput } from "@/components/phone-input/phone-input";
import { AllStates } from "@/utils/data";
import { Button } from "@/components/ui/button";

type propT = {
  data: ClientDTO;
  setcurrentTab?: (x: string) => void;
  setpayload?: (x: string) => void;
};
export default function PersonalInfo({
  data,
}: //   setcurrentTab,
//   setpayload,
propT) {
  const {
    control,
    register,
    // handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ClientDTO>({
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || "",
      middle_name: data?.middle_name || "",
      phone: data.phone || "",
      gender: data?.gender || "",
      date_of_birth: data.date_of_birth || "1940-07-10",
      social_security: data?.social_security || "",
      country: "United states",
      profile_picture: data?.profile_picture || "",
    },
  });

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <div>
        <h2 className=" font-semibold">Client Identity</h2>
        <p className="text-[#414651] text-sm">
          Provide client personal information
        </p>
      </div>
      <form>
        <div className="w-full mt-10 flex justify-between gap-x-4">
          <div className="w-7/12 flex flex-col gap-y-8">
            {/* First + Last Name */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">First Name</Label>
                <Input
                  {...register("first_name", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Too short" },
                  })}
                  placeholder="First Name"
                  className="border h-10"
                />
                {errors.first_name && (
                  <p className="text-xs text-red-400">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Last Name</Label>
                <Input
                  {...register("last_name", {
                    required: "Last name is required",
                    minLength: { value: 3, message: "Too short" },
                  })}
                  placeholder="Last Name"
                  className="border h-10"
                />
                {errors.last_name && (
                  <p className="text-xs text-red-400">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">
                  Middle Name{" "}
                  <span className="text-sm text-gray-400">(Optional)</span>
                </Label>
                <Input
                  {...register("middle_name", {
                    required: "Middle name required",
                    minLength: { value: 3, message: "Too short" },
                  })}
                  placeholder="Middle Name"
                  className="border h-10"
                />
                {errors.middle_name && (
                  <p className="text-xs text-red-400">
                    {errors.middle_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Select a gender" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="h-10 w-full"
                        style={{ height: "41px" }}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="1">Male</SelectItem>
                          <SelectItem value="2">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-xs text-red-400">
                    {`${errors.gender.message}`}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Date of Birth</Label>

                <Controller
                  name="date_of_birth"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <DateOfBirthSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.date_of_birth && (
                  <p className="text-xs text-red-400">
                    {`${errors.date_of_birth.message}`}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">
                  SSN <span className="text-sm text-gray-400">(Optional)</span>
                </Label>
                <Input
                  {...register("social_security", {
                    minLength: { value: 9, message: "Too short" },
                    maxLength: { value: 9, message: "Too long" },
                  })}
                  placeholder="Social Security Number"
                  className="border h-10"
                />
                {errors.social_security && (
                  <p className="text-xs text-red-400">
                    {errors.social_security.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  placeholder="Email"
                  type="email"
                  className="border h-10"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Phone Number</Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number" }}
                  render={({ field }) => (
                    <PhoneNumberInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400">
                    {`${errors.phone.message}`}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Home Address</Label>
                <Input
                  {...register("address", {
                    required: "Address required",
                  })}
                  placeholder="Home address"
                  type="text"
                  className="border h-10"
                />
                {errors.address && (
                  <p className="text-xs text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-y-3 w-full">
                <Label className="text-[#5C5C5C]">Country</Label>
                <Input
                  {...register("country", {
                    required: "Country required",
                  })}
                  placeholder="Country"
                  type="text"
                  disabled
                  className="border h-10"
                />
                {errors.country && (
                  <p className="text-xs text-red-400">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
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
                <Label className="text-[#5C5C5C]">Zip Code</Label>
                <Input
                  {...register("zipcode", {
                    required: "Zipcode required",
                    minLength: { value: 5, message: "Too short" },
                    maxLength: { value: 5, message: "Too long" },
                  })}
                  placeholder="Enter Zip code"
                  type="text"
                  className="border h-10"
                />
                {errors.zipcode && (
                  <p className="text-xs text-red-400">
                    {errors.zipcode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-4/12 flex justify-center  px-4">
            <div>
              <div className="border shadow rounded p-10  cursor-pointer flex flex-col justify-center items-center">
                <div className="w-32 h-32 flex justify-center items-center rounded-full overflow-hidden">
                  <img src="/clients/upload.svg" />
                </div>
                <p className="text-sm text-center font-bold text-[#257BD2] unde">
                  Choose an image
                </p>
                <p className="text-sm">or drag and drop the image here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-4/12 flex gap-x-4">
          <div className="border cursor-pointer border-[#257BD2] py-2 w-1/2 text-center font-semibold text-[#257BD2] rounded">
            Cancel
          </div>
          <Button
            type="submit"
            className="h-10 w-1/2 text-base font-semibold bg-[#257BD2] text-white hover:bg-[#2272c2] rounded"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
