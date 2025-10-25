"use client";

import DateInput from "@/components/date-input";
import LoadingSkeleton from "@/components/skeleton/skeleton";
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
import { AllStatus } from "@/utils/data";
import { formatToYMD } from "@/utils/utils";
import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type PropT = {
  data: ICreateEmployee;
  setData: (x: any) => void;
  setValidSteps: (x: any) => void;
  setActiveStep: (x: any) => void;
};

export default function Identification({
  data,
  setData,
  setValidSteps,
  setActiveStep,
}: PropT) {
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const [preview, setPreview] = useState<string | null>(data.previewPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      password: data.password || "",
      password_confirmation: data?.password_confirmation || "",
      status: data?.status || "",
      middle_name: data?.middle_name || "",
      email: data?.email || "",
      gender: data?.gender || "",
      birthday: data?.birthday || "",
      social_security: data?.social_security || "",
      profile_picture: data?.profile_picture || "",
    },
  });

  const uploadToCloudinary = async (file: File) => {
    setisloading(true);
    setskeletonMessage("Uploading...");
    const url = `https://api.cloudinary.com/v1_1/dqvpqzjlp/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "anchor");

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setisloading(false);
    if (data.secure_url) {
      return { status: true, url: data.secure_url };
    }
    return { status: false, url: "" };
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setPreview(URL.createObjectURL(selectedFile));
  //     const result = await uploadToCloudinary(selectedFile);
  //     if (result.url) {
  //       setValue("photo", result.url); // ✅ save photo to RHF state
  //       setData((prev: any) => ({ ...prev, photo: result.url }));
  //     }
  //   }
  // };

  const handleOnSubmit = (formData: ICreateEmployee) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile_picture, ...rest } = formData;
    // console.log("data", rest);
    setData((prev: any) => {
      return { ...prev, ...rest };
    });
    setValidSteps((prev: any) => {
      return { ...prev, Identification: isValid };
    });
    setActiveStep(1);
  };

  // Calculate the latest selectable date (today - 18 years)
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  useEffect(() => {
    setValidSteps((prev: any) => {
      return { ...prev, Identification: isValid };
    });
  }, [isValid]);

  return (
    <>
      <div className="mt-4">
        <form
          className="flex flex-col-reverse lg:flex-row w-full gap-x-4"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="w-full lg:w-7/12 py-4 flex flex-col gap-y-8">
            {/* First + Last Name */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label>First Name</Label>
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
                <Label>Last Name</Label>
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

            {/* Middle Name + Email */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label>Middle Name</Label>
                <Input
                  {...register("middle_name", {
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
                <Label>Email</Label>
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
            </div>

            {/* password */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label>Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Too short" },
                    pattern: {
                      value: /^(?=.*[A-Z]).+$/,
                      message:
                        "Password must contain at least one uppercase letter",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="border h-10"
                />
                {errors.password && (
                  <p className="text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label>Confirm Password</Label>
                <Input
                  {...register("password_confirmation", {
                    required: "Last name is required",
                    minLength: { value: 6, message: "Too short" },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  className="border h-10"
                />
                {errors.password_confirmation && (
                  <p className="text-xs text-red-400">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </div>

            {/* Gender + DOB */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label>Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Select a gender" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="h-10 w-full"
                        style={{ height: "40px" }}
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
              <div className="flex flex-col gap-y-3 w-full">
                <Controller
                  name="birthday"
                  control={control}
                  rules={{ required: "Date of birth required" }}
                  render={({ field }) => (
                    <DateInput
                      title="Date of Birth"
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={(val) => field.onChange(formatToYMD(val))}
                      minDate={minAgeDate}
                    />
                  )}
                />
                {errors.birthday && (
                  <p className="text-xs text-red-400">
                    {`${errors.birthday.message}`}
                  </p>
                )}
              </div>
            </div>

            {/* SSN and status */}
            <div className="flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="status">Status</Label>

                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Select a status" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="h-10 w-full"
                        style={{ height: "40px" }}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {AllStatus.map((obj, idx: number) => (
                            <SelectItem value={obj.value} key={idx}>
                              {obj.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-xs text-red-400">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-y-3 w-full">
                <Label>Social Security Number</Label>
                <Input
                  {...register("social_security", {
                    required: "SSN required",
                    minLength: {
                      value: 9,
                      message: "SSN Must be 9 characters long",
                    },
                    maxLength: {
                      value: 9,
                      message: "SSN Must be 9 characters long",
                    },
                  })}
                  maxLength={9}
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

            <Button type="submit" className="h-8 w-[100px]">
              Proceed
            </Button>
          </div>

          {/* Profile Photo */}
          <div className="w-full lg:h-full flex flex-col items-center justify-center lg:mt-20 lg:w-4/12">
            <div className="flex justify-center mb-2 relative">
              <Controller
                name="profile_picture"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                          setData((prev: any) => ({
                            ...prev,
                            previewPhoto: URL.createObjectURL(file),
                          }));
                          field.onChange(file); // 👈 update RHF state
                          const result = await uploadToCloudinary(file);
                          if (result.url) {
                            setData((prev: any) => ({
                              ...prev,
                              profile_picture: result.url,
                            }));
                          }
                        }
                      }}
                      className="hidden"
                    />

                    {/* Clickable preview */}
                    <div
                      className="w-40 h-40 rounded-4xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center ring-1 ring-slate-200 dark:ring-cyan-300 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-4xl"
                        />
                      ) : (
                        <p className="text-slate-500 text-sm">
                          Click to upload
                        </p>
                      )}
                    </div>
                  </>
                )}
              />

              <div className="absolute bottom-0 -right-0 rounded-2xl p-2 bg-white dark:bg-slate-800">
                <ImagePlus className="text-slate-500" />
              </div>
            </div>

            {/* Show error message */}
            {errors.profile_picture && (
              <p className="text-xs text-red-400 mt-2">
                {errors.profile_picture.message}
              </p>
            )}
          </div>
        </form>
      </div>
      {isloading && <LoadingSkeleton name={skeletonMessage} />}
    </>
  );
}
