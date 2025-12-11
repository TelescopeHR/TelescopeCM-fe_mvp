import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordinput";
import LayoutContainerTwo from "@/public_layout/layout-container-two";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HRLogin() {
  const [email, setemail] = useState<any>(undefined);
  const [password, setpassword] = useState<any>(undefined);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/hr-details");
  };
  return (
    <>
      <LayoutContainerTwo>
        <div className="mt-14 flex flex-col gap-y-4">
          <h2 className="text-4xl font-bold w-8/12">
            Sign in with your TelescopeHR account
          </h2>
          <p className="text-xl w-10/12">
            You can use your existing Telescope login to access Telescope CM.
            Once signed in, you’ll be able to choose a subscription plan.
          </p>
          {/* form */}
          <div className="flex flex-col gap-y-6 mt-10 w-11/12">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="Your Email"
                className=" border bg-white h-12"
              />
            </div>

            <div className="flex flex-col gap-y-3">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                placeholder="Your Password"
                className=" border h-12 bg-white"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="bg-[#257BD2] hover:bg-[#1e6fc0] text-white font-bold w-11/12 h-12"
              onClick={handleContinue}
            >
              Login
            </Button>
          </div>
        </div>
      </LayoutContainerTwo>
    </>
  );
}
