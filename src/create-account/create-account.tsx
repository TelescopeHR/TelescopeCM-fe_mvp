import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAccountT } from "@/models/agency-model";
import LayoutContainer from "@/public_layout/layout-container";
import { loginService } from "@/services/portal-service/portal-service";
import { useUserStore } from "@/store/userStore";
import { removeStoredAuthToken, storeAuthToken } from "@/utils/ls";
import { ImagePlus, MoveLeft } from "lucide-react";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function CreateAccountPage() {
  const [data, setData] = useState<CreateAccountT | any>({});
  const [preview, setPreview] = useState<string | null>("");
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const [currentForm, setcurrentForm] = useState(1);
  const [email, setemail] = useState<any>(undefined);
  const [password, setpassword] = useState<any>(undefined);
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    //clear token if there is one already
    removeStoredAuthToken();
    loginService({ email, password }).subscribe({
      next: (response) => {
        // console.log("response===>", response);
        if (response) {
          if (response.statusCode == 422) {
            setisLoading(false);
            toast.error(response.error);
          }
          if (response.statusCode == 403) {
            setisLoading(false);
          }
          if (response.statusCode == 200) {
            setisLoading(false);
            //store toke securely
            storeAuthToken(response.data.access_token);
            //dispatch user to state
            setUser({
              email: response.data.user.email,
              name: response.data.user.full_name,
              userId: response.data.user.id,
              avatar: response.data.user.profile_picture ?? "",
              ...response.data.user,
            });
            toast.success(response.message, {
              autoClose: 5000,
              position: "top-center",
            });
            navigate("/dashboard");
          }
        }
      },
      error: (err) => {
        console.log("error", err.response.data.message);
        toast.error(err.response.data.message);
        setisLoading(false);
      },
      complete: () => {
        setisLoading(false);
      },
    });
  };

  const AgencyForm = () => {
    const {
      control,
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm<CreateAccountT>({
      defaultValues: {},
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

    const colorOptions: MultiSelectOption[] = [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "purple", label: "Purple" },
    ];

    return (
      <div className="border lg:px-8 lg:py-4 rounded mt-6 mb-2">
        <h2 className=" font-bold text-xl text-gray-400">Agency Details</h2>

        <div className="w-full flex justify-center">
          <div className="flex justify-center mb-2 mt-4 relative rounded-full ring-1 w-32 h-32">
            <Controller
              name="photo"
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
                        console.log(URL.createObjectURL(file));
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
                    className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center ring-1 ring-slate-200 dark:ring-cyan-300 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <p className="text-slate-500 text-sm">Upload logo</p>
                    )}
                  </div>
                </>
              )}
            />

            <div
              className="absolute bottom-1 border-2 right-0 rounded-2xl p-2 bg-white dark:bg-slate-800 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus size={14} className="text-slate-500" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-6 mb-2 mt-4">
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="">Agency Name</Label>
            <Input
              {...register("agency_name", {
                minLength: { value: 3, message: "Too short" },
              })}
              type="text"
              value={""}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Your agency name"
              className=" border h-10"
            />
            {errors.agency_name && (
              <p className="text-xs text-red-400">
                {errors.agency_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3">
            <Label htmlFor="">Services</Label>
            <Controller
              name="services"
              control={control}
              rules={{ required: "Select total clients range" }}
              render={({ field }) => (
                <MultiSelect
                  options={colorOptions}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Select service"
                />
              )}
            />

            {errors.agency_name && (
              <p className="text-xs text-red-400">
                {errors.agency_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <Label>Total Clients Range</Label>
            <Controller
              name="numberof_clients"
              control={control}
              rules={{ required: "Select total clients range" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="h-10 w-full"
                    style={{ height: "40px" }}
                  >
                    <SelectValue placeholder="Select total clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      <SelectItem value="1-10">1-10 Clients</SelectItem>
                      <SelectItem value="10-20">10-20 Clients</SelectItem>
                      <SelectItem value="20-50">20-50 CLients</SelectItem>
                      <SelectItem value="50-100">50-100 Clients</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.numberof_clients && (
              <p className="text-xs text-red-400">
                {`${errors.numberof_clients.message}`}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10">
          <Button className="w-full h-10 font-bold">Proceed</Button>
        </div>
      </div>
    );
  };

  const DetailsForm = () => {
    return (
      <div className="border lg:px-8 lg:py-4 rounded mt-6 mb-2">
        <h2 className=" font-bold text-xl text-gray-400">Agency Details</h2>

        <div className="w-full flex flex-col gap-y-6 mb-2 mt-6">
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="">Agency Name</Label>
            <Input
              type="text"
              value={""}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Your agency name"
              className=" border h-10"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-x-4 mb-8">
          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Admin First Name</Label>
              <Input
                type="text"
                value={""}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="First name"
                className=" border h-10"
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Email</Label>
              <Input
                type="email"
                value={""}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Email"
                className=" border h-10"
              />
            </div>
          </div>

          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Admin Last Name</Label>
              <Input
                type="text"
                value={""}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="Last name"
                className=" border h-10"
              />
            </div>

            <div className="flex flex-col gap-y-3 ">
              <Label htmlFor="password">Phone Number</Label>
              <Input
                type="text"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Phone number"
                className=" border h-10 w-full"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-x-4 lg:flex-row gap-y-6 lg:gap-y-1 mb-1">
          <div className="flex flex-col gap-y-3 w-full lg:w-1/2">
            <Label htmlFor="">Password</Label>
            <Input
              type="password"
              value={""}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Your password"
              className=" border h-10"
            />
          </div>

          <div className="flex flex-col gap-y-3 w-full lg:w-1/2">
            <Label htmlFor="">Confirm Password</Label>
            <Input
              type="password"
              value={""}
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Confirm password"
              className=" border h-10"
            />
          </div>
        </div>

        <div className="mt-10">
          <Button className="w-full h-10 font-bold">Proceed</Button>
        </div>
      </div>
    );
  };

  const AddressForm = () => {
    return (
      <div className="border lg:p-8 rounded mt-4 mb-20">
        <h2 className=" font-bold">Address</h2>
        <div className="w-full flex flex-col lg:flex-row justify-between gap-x-4">
          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mb-10 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="Your Email"
                className=" border h-10"
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Your Password"
                className=" border h-10"
              />
            </div>
          </div>

          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mb-10 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="Your Email"
                className=" border h-10"
              />
            </div>

            <div className="flex flex-col gap-y-3 ">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Your Password"
                className=" border h-10 w-full"
              />
            </div>
          </div>
        </div>

        <Button className="w-full h-10 font-bold">Create account</Button>
      </div>
    );
  };
  return (
    <>
      <LayoutContainer>
        <div className="w-full lg:w-11/12  m-auto rounded-xl px-4 lg:px-10 pt-1 pb-20">
          <div className="flex w-full gap-x-2 lg:gap-x-4">
            <MoveLeft
              className="mt-2 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <form onSubmit={handleSubmit} className="w-full">
              <h1 className=" text-4xl">Agency Registration</h1>

              <p className=" text-sm mt-2">Let's get started</p>
              {currentForm == 1 && <AgencyForm />}
              {currentForm == 2 && <DetailsForm />}

              {/* --- address */}
              {currentForm == 3 && <AddressForm />}
            </form>
          </div>
          <p className="text-center mt-10 text-sm">
            Already have an account?{" "}
            <span
              className=" font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton name={skeletonMessage} />}
    </>
  );
}
