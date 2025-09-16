import LoadingSkeleton from "@/components/skeleton/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeStore } from "@/store/themestore";
import { useUserStore } from "@/store/userStore";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [isloading, setisloading] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisloading(true);

    setTimeout(() => {
      setUser({
        email: "Olabode@gmail.com",
        name: "Olabode Eto",
      });
      setisloading(false);
      navigate("/dashboard");
    }, 4000);
  };
  return (
    <>
      <div className="h-screen  bg-slate-100 dark:bg-slate-900">
        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900">
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
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <div className="w-full lg:w-4/12 m-auto border rounded-xl px-10 pt-10 pb-20">
            <form onSubmit={handleSubmit}>
              <h1 className=" text-4xl">Welcome</h1>
              <p className=" text-sm">Please login to continue</p>
              <div className="flex flex-col gap-y-6 mb-10 mt-10">
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    required
                    placeholder="Your Email"
                    className=" border h-10"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    required
                    placeholder="Your Password"
                    className=" border h-10"
                  />
                </div>
              </div>
              <Button className="w-full h-10">Login</Button>
            </form>
          </div>
        </div>
      </div>
      {isloading && <LoadingSkeleton />}
    </>
  );
}
