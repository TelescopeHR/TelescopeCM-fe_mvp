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
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";

export default function Identification() {
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const [preview, setPreview] = useState<string | null>(null);
  const [, setPhotoFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (data.secure_url) {
      setisloading(false);
      setskeletonMessage("");
      return { status: true, url: data.secure_url };
    } else {
      setisloading(false);
      return { status: false, url: "" };
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPhotoFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      const result = await uploadToCloudinary(selectedFile);
      console.log(result);
      //  if (result.status) handleChange("photo", result.url);
    }
  };
  return (
    <>
      <div className="mt-4">
        <form className="flex flex-col-reverse lg:flex-row w-full gap-x-4">
          <div className="w-full lg:w-7/12 py-4 flex flex-col gap-y-8">
            <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="First Name">First Name</Label>
                <Input
                  type="text"
                  required
                  placeholder="First Name"
                  className=" border h-10"
                />
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="Last Name">Last Name</Label>
                <Input
                  type="text"
                  required
                  placeholder="Last Name"
                  className=" border h-10"
                />
              </div>
            </div>

            <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="middle Name">Middle Name</Label>
                <Input
                  type="text"
                  required
                  placeholder="Middle Name"
                  className=" border h-10"
                />
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  required
                  placeholder="Email"
                  className=" border h-10"
                />
              </div>
            </div>

            <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
              <div className="flex flex-col gap-y-3 w-full">
                <Label htmlFor="gender">Gendar</Label>
                <Select>
                  <SelectTrigger className=" h-8 w-full">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <DateInput title=" Date of birth" date={dob} setDate={setDob} />
              </div>
            </div>

            <div className="flex flex-col gap-y-3 w-full">
              <Label htmlFor="ssn">Social Security Number</Label>
              <Input
                type="text"
                required
                placeholder="Social Security Number"
                className=" border h-10"
              />
            </div>

            <Button className="h-8 w-[100px]">Proceed</Button>
          </div>
          {/*  */}
          <div className="w-full lg:h-full flex items-center justify-center lg:mt-20 lg:w-4/12">
            <div
              className="flex justify-center  mb-2 relative"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview !== null ? (
                <div className="w-40 h-40 rounded-4xl  bg-slate-200 overflow-hidden flex items-center justify-center ring-1 ring-blue-300">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-4xl  bg-slate-100 dark:bg-slate-700 overflow-hidden flex items-center justify-center ring-1 ring-slate-200 dark:ring-cyan-300">
                  <input
                    required
                    type="file"
                    id="photo"
                    accept="image/*"
                    ref={fileInputRef}
                    placeholder=""
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}

              <div className="absolute bottom-0 -right-0 rounded-2xl p-2 bg-white dark:bg-slate-800">
                <ImagePlus className=" text-slate-500" />
              </div>
            </div>
          </div>
        </form>
      </div>
      {isloading && <LoadingSkeleton name={skeletonMessage} />}
    </>
  );
}
