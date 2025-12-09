import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutContainer from "@/public_layout/layout-container";
import { sendOTPService } from "@/services/portal-service/portal-service";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function ForgotPasswordPage() {
  const [email, setemail] = useState<any>(undefined);

  const [isloading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);

    sendOTPService({ email }).subscribe({
      next: (response) => {
        if (response) {
          if (response.statusCode == 200) {
            localStorage.setItem("tempEmail", email);
            navigate("/verify-email");
            setisLoading(false);
          }
        }
      },
      error: () => {
        setisLoading(false);
      },
      complete: () => {
        setisLoading(false);
      },
    });
  };
  return (
    <>
      <LayoutContainer>
        <div className="w-full  m-auto rounded-xl pt-10 pb-20 lg:mt-20 px-10 ">
          <form onSubmit={handleSubmit}>
            <h1 className=" text-4xl text-[#2F2F2F] font-bold">
              Reset Password
            </h1>
            <p className=" text-sm mt-2 text-[#525252]">
              Provide the email address registered to this account
            </p>
            <div className="flex flex-col gap-y-6 mb-10 mt-10">
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
            </div>
            <Button className="w-full h-10 bg-[#257BD2] hover:bg-[#1b61a8]">
              Next
            </Button>
          </form>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
