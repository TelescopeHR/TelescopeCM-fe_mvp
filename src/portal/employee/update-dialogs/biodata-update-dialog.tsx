import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreateEmployee } from "@/models/employee-model";
import { Button } from "@/components/ui/button";
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
import { AllStatus } from "@/utils/data";
import { Label } from "@/components/ui/label";
import DateInput from "@/components/date-input";
import { formatToYMD } from "@/utils/utils";
import { ImagePlus } from "lucide-react";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { useCareGiverStore } from "@/store/caregiverStore";
import { updateEmployee } from "@/services/employee-service/employee-service";
import { toast } from "react-toastify";

type PropT = {
  open: boolean;
  setopen: (x: boolean) => void;
};

export function BioDataUpdateDialog({ open, setopen }: PropT) {
  const { careGiver } = useCareGiverStore();

  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const [preview, setPreview] = useState<string | null>(careGiver.photo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICreateEmployee>({
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      gender: "",
      birthday: "",
      status: "",
      social_security: "",
      profile_picture: "",
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

  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const handleOnSubmit = (formData: ICreateEmployee) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile_picture, ...rest } = formData;
    if (isValid) {
      setisloading(true);
      setskeletonMessage("Updating");
      const payload = {
        type: "biodata",
        ...rest,
        gender: parseInt(rest.gender),
        birth_date: rest.birthday,
        status: parseInt(rest.status),
        profile_picture: preview,
      };
      console.log("data", payload);

      return updateEmployee(payload, careGiver.id).subscribe({
        next: (response) => {
          if (response) {
            toast.success("Updated successfully!");
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

  // useEffect(() => {
  //   console.log("employee data", careGiver);
  // }, []);

  useEffect(() => {
    if (careGiver) {
      const matchedStatus =
        AllStatus.find((s) => s.name === careGiver.status)?.value || "";
      reset({
        first_name: careGiver.firstName || "",
        last_name: careGiver.lastName || "",
        middle_name: careGiver.middleName || "",
        email: careGiver.email || "",
        gender: careGiver.gender == "Male" ? "1" : "2",
        birthday: formatToYMD(careGiver.dob) || "",
        status: matchedStatus,
        social_security: careGiver.SocialSecurity || "",
        profile_picture: careGiver.photo || "",
      });
      setPreview(careGiver.photo || null);
    }
  }, [careGiver, open, reset]);

  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent className="!max-w-[75vw] !w-[75vw]">
        <AlertDialogHeader>
          <AlertDialogTitle>BIO DATA UPDATE</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full ">
          <form
            className="flex flex-col-reverse lg:flex-row w-full gap-x-8"
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
                    <p className="text-xs text-red-400">
                      {errors.email.message}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                        setDate={(val) =>
                          field.onChange(formatToYMD(val?.toISOString()))
                        }
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
            </div>

            {/* Profile Photo */}
            <div className="w-full lg:h-full flex flex-col items-center justify-center lg:mt-20 lg:w-3/12">
              <div className="flex justify-center mb-2 relative">
                <Controller
                  name="profile_picture"
                  control={control}
                  rules={{ required: "Photo is required" }} // 👈 validation rule
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
                            field.onChange(file); // 👈 update RHF state
                            const result = await uploadToCloudinary(file);
                            if (result.url) {
                              setPreview(result.url);
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
