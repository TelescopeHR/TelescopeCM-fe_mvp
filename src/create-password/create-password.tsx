import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordinput";
import LayoutContainer from "@/public_layout/layout-container";
import { createPasswordService } from "@/services/portal-service/portal-service";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function CreatePasswordPage() {
  const [email, setemail] = useState<any>(undefined);
  const [password, setpassword] = useState<string>("");
  const [password_confirmation, setpassword_confirmation] =
    useState<string>("");
  const [isloading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);

    createPasswordService({ email, password, password_confirmation }).subscribe(
      {
        next: (response) => {
          if (response) {
            if (response.statusCode == 200) {
              setisLoading(false);

              toast.success(response.message, {
                autoClose: 5000,
                position: "top-center",
              });
              navigate("/");
            }
          }
        },
        error: () => {
          setisLoading(false);
        },
        complete: () => {
          setisLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!localStorage.getItem("tempEmail")) {
      navigate(-1);
    } else {
      setemail(localStorage.getItem("tempEmail"));
    }
  }, []);
  return (
    <>
      <LayoutContainer>
        <div className="w-full  m-auto rounded-xl pt-10 pb-20 lg:mt-20 px-10 ">
          <form onSubmit={handleSubmit}>
            <h1 className=" text-4xl text-[#2F2F2F] font-bold">
              Create Password
            </h1>
            <p className=" text-sm mt-2 text-[#525252]">
              Set up a new password
            </p>
            <div className="flex flex-col gap-y-6 mb-10 mt-10">
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  placeholder="Your Password"
                  className=" border h-10"
                  showToggle={true}
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password">Confirm Password</Label>
                <PasswordInput
                  value={password_confirmation}
                  onChange={(e) => setpassword_confirmation(e.target.value)}
                  required
                  placeholder="Confirm your Password"
                  className=" border h-10"
                  showToggle={true}
                />
              </div>
            </div>
            <Button
              className="w-full h-10 bg-[#257BD2] hover:bg-[#1b61a8]"
              disabled={
                password.length > 6 &&
                password_confirmation.length > 6 &&
                password === password_confirmation
                  ? false
                  : true
              }
            >
              Create Password
            </Button>
          </form>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
