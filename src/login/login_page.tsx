import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordinput";
import LayoutContainer from "@/public_layout/layout-container";
import { loginService } from "@/services/portal-service/portal-service";
import { useUserStore } from "@/store/userStore";
import { removeStoredAuthToken, storeAuthToken } from "@/utils/ls";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setemail] = useState<any>(undefined);
  const [password, setpassword] = useState<any>(undefined);
  const [isloading, setisLoading] = useState(false);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

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
            <h1 className=" text-4xl text-[#2F2F2F] font-bold">Log In</h1>
            <p className=" text-sm mt-2 text-[#525252]">
              Welcome back to Telescope CM
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

              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  placeholder="Your Password"
                  className=" border h-10"
                />
              </div>
              <p
                className=" text-right cursor-pointer text-sm -mb-2"
                onClick={() => navigate("/forgot-password")}
              >
                forgot password?
              </p>
            </div>
            <Button className="w-full h-10 bg-[#257BD2] hover:bg-[#1b61a8]">
              Login
            </Button>
          </form>
          <p className="text-center mt-10 text-sm">
            New to Telescope CM?{" "}
            <span
              className=" font-bold cursor-pointer text-[#257BD2]"
              onClick={() => navigate("/create-account")}
            >
              Sign up
            </span>
          </p>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
