import { OTPInput } from "@/components/otp-input/otp-input";
import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import LayoutContainer from "@/public_layout/layout-container";
import { verifyEmailService } from "@/services/portal-service/portal-service";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const [email, setemail] = useState<any>(undefined);
  const [otp, setOtp] = useState("");

  const [isloading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleComplete = (completedOtp: string) => {
    setOtp(completedOtp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    verifyEmailService({ otp, email }).subscribe({
      next: (response) => {
        console.log("response===>", response);
        if (response) {
          if (response.statusCode == 200) {
            toast.success("Otp verified successfully");
            setisLoading(false);
            navigate("/create-password");
          }
        }
      },
      error: () => {
        setisLoading(false);
        setOtp("");
      },
      complete: () => {
        setisLoading(false);
      },
    });
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
            <h1 className=" text-4xl text-[#2F2F2F] font-bold">Verify Email</h1>
            <p className=" text-sm mt-2 text-[#525252]">
              We’ve sent a 6-digit code to your email. Enter it below to verify.
            </p>
            <div className="flex flex-col gap-y-6 mb-10 mt-10">
              <div className="flex flex-col gap-y-3">
                <OTPInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={handleComplete}
                />
              </div>
            </div>
            <Button className="w-full h-10 bg-[#257BD2] hover:bg-[#1b61a8]">
              Continue
            </Button>
          </form>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
