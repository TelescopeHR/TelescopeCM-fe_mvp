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
// import { loginService } from "@/services/portal-service/portal-service";
// import { useUserStore } from "@/store/userStore";
import { AllStates } from "@/utils/data";
// import { removeStoredAuthToken, storeAuthToken } from "@/utils/ls";
import { ImagePlus, MoveLeft } from "lucide-react";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

export default function CreateAccountPage() {
  const [data, setData] = useState<CreateAccountT | any>({});
  const [preview, setPreview] = useState<string | null>(data.previewPhoto);
  const [isloading, setisloading] = useState(false);
  const [skeletonMessage, setskeletonMessage] = useState("Loading");
  const [currentForm, setcurrentForm] = useState(1);
  // const { setUser } = useUserStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setisloading(true);
  //   removeStoredAuthToken();
  //   loginService({ email, password }).subscribe({
  //     next: (response) => {
  //       if (response) {
  //         if (response.statusCode == 422) {
  //           setisloading(false);
  //           toast.error(response.error);
  //         }
  //         if (response.statusCode == 403) {
  //           setisloading(false);
  //         }
  //         if (response.statusCode == 200) {
  //           setisloading(false);

  //           storeAuthToken(response.data.access_token);

  //           setUser({
  //             email: response.data.user.email,
  //             name: response.data.user.full_name,
  //             userId: response.data.user.id,
  //             avatar: response.data.user.profile_picture ?? "",
  //             ...response.data.user,
  //           });
  //           toast.success(response.message, {
  //             autoClose: 5000,
  //             position: "top-center",
  //           });
  //           navigate("/dashboard");
  //         }
  //       }
  //     },
  //     error: (err) => {
  //       console.log("error", err.response.data.message);
  //       toast.error(err.response.data.message);
  //       setisloading(false);
  //     },
  //     complete: () => {
  //       setisloading(false);
  //     },
  //   });
  // };

  const AgencyForm = () => {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<CreateAccountT>({
      defaultValues: {
        agency_name: data.agency_name,
        services: data.services,
        numberof_clients: data.numberof_clients,
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

    const colorOptions: MultiSelectOption[] = [
      { value: "service1", label: "Service 1" },
      { value: "service2", label: "Service2" },
      { value: "service3", label: "Service3" },
    ];

    const handleOnSubmit = (formData: CreateAccountT) => {
      setData((prev: any) => {
        return { ...prev, ...formData };
      });
      console.log(isValid);
      setcurrentForm(2);
    };

    return (
      <form
        className="border lg:px-8 lg:py-4 rounded mt-6 mb-2"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
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
                required: "Agency name is required",
                minLength: { value: 3, message: "Too short" },
              })}
              type="text"
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
              rules={{ required: "Select service" }}
              render={({ field }) => (
                <MultiSelect
                  options={colorOptions}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Select service"
                />
              )}
            />

            {errors.services && (
              <p className="text-xs text-red-400">{errors.services.message}</p>
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
          <Button type="submit" className="w-full h-10 font-bold">
            Proceed
          </Button>
        </div>
      </form>
    );
  };

  const DetailsForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateAccountT>({
      defaultValues: {
        admin_firstname: data.admin_firstname,
        admin_lastname: data.admin_lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        cpassword: data.cpassword,
      },
    });

    const handleOnSubmit = (formData: CreateAccountT) => {
      setData((prev: any) => {
        return { ...prev, ...formData };
      });
      setcurrentForm(3);
    };
    return (
      <form
        className="border lg:px-8 lg:py-4 rounded mt-10 mb-2"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <h2 className=" font-bold text-xl text-gray-400">Admin Details</h2>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-x-4 mb-8">
          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Admin First Name</Label>
              <Input
                {...register("admin_firstname", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="text"
                placeholder="First name"
                className=" border h-10"
              />

              {errors.admin_firstname && (
                <p className="text-xs text-red-400">
                  {errors.admin_firstname.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Email</Label>
              <Input
                {...register("email", {
                  required: "email is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="email"
                placeholder="Email"
                className=" border h-10"
              />

              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="">Admin Last Name</Label>
              <Input
                {...register("admin_lastname", {
                  required: "Last name is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="text"
                placeholder="Last name"
                className=" border h-10"
              />
              {errors.admin_lastname && (
                <p className="text-xs text-red-400">
                  {errors.admin_lastname.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-3 ">
              <Label htmlFor="password">Phone Number</Label>
              <Input
                {...register("phone", {
                  required: "Phone is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                type="text"
                placeholder="Phone number"
                className=" border h-10 w-full"
              />
              {errors.phone && (
                <p className="text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-x-4 lg:flex-row gap-y-6 lg:gap-y-1 mb-1">
          <div className="flex flex-col gap-y-3 w-full lg:w-1/2">
            <Label htmlFor="">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 3, message: "Too short" },
              })}
              type="password"
              placeholder="Your password"
              className=" border h-10"
            />

            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-3 w-full lg:w-1/2">
            <Label htmlFor="">Confirm Password</Label>
            <Input
              {...register("cpassword", {
                required: "Password is required",
                minLength: { value: 3, message: "Too short" },
              })}
              type="password"
              placeholder="Confirm password"
              className=" border h-10"
            />

            {errors.cpassword && (
              <p className="text-xs text-red-400">{errors.cpassword.message}</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-x-4">
          <div
            className="border rounded py-1 px-4 font-bold cursor-pointer"
            onClick={() => setcurrentForm(1)}
          >
            Previous
          </div>
          <Button className="h-10 font-bold">Proceed</Button>
        </div>
      </form>
    );
  };

  const AddressForm = () => {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<CreateAccountT>({
      defaultValues: {},
    });

    const handleOnSubmit = () => {
      console.log(isValid);
      setcurrentForm(2);
    };

    return (
      <form
        className="border lg:p-8 rounded mt-4 mb-20"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <h2 className=" font-bold text-xl text-gray-400">Address</h2>

        <div className="flex flex-col gap-y-3 mt-8">
          <Label htmlFor="">Street Address</Label>
          <Input
            {...register("street", {
              required: "Street address is required",
              minLength: { value: 3, message: "Too short" },
            })}
            type="text"
            placeholder="Street address"
            className=" border h-10"
          />
          {errors.street && (
            <p className="text-xs text-red-400">{errors.street.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-x-4">
          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mb-10 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Address Line 2</Label>
              <Input
                {...register("address_Line2", {
                  minLength: { value: 3, message: "Too short" },
                })}
                type="text"
                placeholder="Street address"
                className=" border h-10"
              />
              {errors.address_Line2 && (
                <p className="text-xs text-red-400">
                  {errors.address_Line2.message}
                </p>
              )}
            </div>

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
          </div>

          <div className="w-full  lg:w-1/2 flex flex-col gap-y-6 mb-10 mt-6">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="city">City</Label>
              <Input
                {...register("city", {
                  required: "City is required",
                  minLength: { value: 2, message: "Too short" },
                })}
                type="text"
                placeholder="City"
                className=" border h-10"
              />
              {errors.city && (
                <p className="text-xs text-red-400">{errors.city.message}</p>
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
        </div>

        <div className="mt-10 flex justify-end gap-x-4">
          <div
            className="border rounded py-1 px-4 font-bold cursor-pointer"
            onClick={() => setcurrentForm(2)}
          >
            Previous
          </div>
          <Button className="h-10 font-bold">Proceed</Button>
        </div>
      </form>
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
            <div className="w-full">
              <h1 className=" text-4xl">Agency Registration</h1>

              <p className=" text-sm mt-2">Let's get started</p>
              {currentForm == 1 && <AgencyForm />}
              {currentForm == 2 && <DetailsForm />}

              {/* --- address */}
              {currentForm == 3 && <AddressForm />}
            </div>
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
