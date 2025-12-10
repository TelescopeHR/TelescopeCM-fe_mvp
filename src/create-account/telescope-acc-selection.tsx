import { Button } from "@/components/ui/button";
import LayoutContainerTwo from "@/public_layout/layout-container-two";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function TelescopeAccSelection() {
  const [selectedOption, setselectedOption] = useState("OldUser");
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("telescopeAccount", selectedOption);
    if (selectedOption === "NewUser") {
      navigate("/upgrade-workflow");
    } else {
      navigate("/hr-login");
    }
  };
  return (
    <>
      <LayoutContainerTwo>
        <div className="mt-20 flex flex-col gap-y-4">
          <h2 className="text-4xl font-bold w-6/12">Welcome to Telescope</h2>
          <p className="text-xl w-8/12">
            Let’s get you started. Are you an existing user or creating a new
            account?”
          </p>

          <div className="w-11/12 mt-10 min-h-20  flex flex-col gap-y-6">
            <div
              className="w-full bg-white p-1 rounded-2xl cursor-pointer"
              onClick={() => setselectedOption("OldUser")}
            >
              <div
                className="flex gap-x-4 p-2 rounded-2xl"
                style={{
                  border:
                    selectedOption === "OldUser" ? "1px solid #6781B4" : "none",
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="oldUser"
                  checked={selectedOption === "OldUser" ? true : false}
                  style={{
                    accentColor:
                      selectedOption === "OldUser" ? "#257BD2" : "black",
                  }}
                />
                <div className="flex flex-col gap-y-1">
                  <h3
                    className="font-bold"
                    style={{
                      color: selectedOption === "OldUser" ? "#257BD2" : "black",
                    }}
                  >
                    I already have a Telescope account
                  </h3>
                  <p className="text-xs text-black">
                    I am an existing user of a Telescope Product
                  </p>
                </div>
              </div>
            </div>

            <div
              className="w-full bg-white p-1 rounded-2xl cursor-pointer"
              onClick={() => setselectedOption("NewUser")}
            >
              <div
                className="flex gap-x-4 p-2 rounded-2xl"
                style={{
                  border:
                    selectedOption === "NewUser" ? "1px solid #6781B4" : "none",
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="newUser"
                  checked={selectedOption === "NewUser" ? true : false}
                  style={{
                    accentColor:
                      selectedOption === "NewUser" ? "#257BD2" : "black",
                  }}
                />
                <div className="flex flex-col gap-y-1">
                  <h3
                    className="font-bold"
                    style={{
                      color: selectedOption === "NewUser" ? "#257BD2" : "black",
                    }}
                  >
                    I am new to Telescope
                  </h3>
                  <p className="text-xs text-black">
                    I am a new user, i don’t have an existing account
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button
              className="bg-[#257BD2] hover:bg-[#1e6fc0] text-white font-bold w-11/12 h-14"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </LayoutContainerTwo>
    </>
  );
}
