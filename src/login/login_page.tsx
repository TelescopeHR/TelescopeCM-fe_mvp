import LoadingSkeleton from "@/components/skeleton/skeleton";
import { Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginService } from "@/services/portal-service/portal-service";
import { useThemeStore } from "@/store/themestore";
import { useUserStore } from "@/store/userStore";
import { removeStoredAuthToken, storeAuthToken } from "@/utils/ls";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setemail] = useState<any>(undefined);
  const [password, setpassword] = useState<any>(undefined);
  const [isloading, setisLoading] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
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
      <div className="h-screen  bg-slate-100 dark:bg-slate-900">
        <div className="flex">
          <div className="hidden lg:block lg:w-4/12 bg-slate-900 dark:bg-slate-800">
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="flex flex-col justify-center items-center -mt-20">
                <div className="bg-white rounded-3xl p-2">
                  <Telescope size={80} color="#233C56" />
                </div>
                <h1 className="text-4xl text-white mt-2">Telescope CM</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-screen w-8/12">
            <div className="flex items-center justify-between p-4 bg-slate-100 w-full dark:bg-slate-900">
              <div className="w-2"></div>
              <div className="pr-4">
                <div>
                  {theme === "dark" ? (
                    <Moon
                      size={18}
                      className=" text-slate-900 dark:text-white cursor-pointer"
                      onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                        event.stopPropagation();
                        toggleTheme();
                      }}
                    />
                  ) : (
                    <Sun
                      size={18}
                      className=" text-slate-900 dark:text-white cursor-pointer"
                      onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                        event.stopPropagation();
                        toggleTheme();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* -----content */}
            <div className="w-full lg:w-7/12 m-auto rounded-xl px-10 pt-10 pb-20">
              <form onSubmit={handleSubmit}>
                <h1 className=" text-4xl">Welcome</h1>
                <p className=" text-sm">Please login to continue</p>
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
                <span className=" font-bold cursor-pointer">
                  Create Account
                </span>
              </p>
            </div>

            {/* ------- */}
          </div>
        </div>
      </div>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
