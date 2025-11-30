import LoadingSkeleton from "@/components/skeleton/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  return (
    <>
      <LayoutContainer>
        <div className="w-full lg:w-7/12 m-auto rounded-xl px-10 pt-10 pb-20 lg:mt-28">
          <form onSubmit={handleSubmit}>
            <h1 className=" text-4xl">Welcome</h1>
            <p className=" text-sm mt-2">Please login to continue</p>
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
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  placeholder="Your Password"
                  className=" border h-10"
                />
              </div>
              <p className=" text-right cursor-pointer text-sm -mb-2">
                forgot password?
              </p>
            </div>
            <Button className="w-full h-10">Login</Button>
          </form>
          <p className="text-center mt-10 text-sm">
            Don't have an account?{" "}
            <span
              className=" font-bold cursor-pointer"
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </span>
          </p>
        </div>
      </LayoutContainer>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
