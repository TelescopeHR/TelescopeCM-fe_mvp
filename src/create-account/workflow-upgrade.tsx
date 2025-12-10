import { Button } from "@/components/ui/button";
import LayoutContainerTwo from "@/public_layout/layout-container-two";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function WorkflowUpgrade() {
  const [selectedOption, setselectedOption] = useState("Add");

  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("upgradeAccount", selectedOption);
    navigate("/create-account");
  };
  return (
    <>
      <LayoutContainerTwo>
        <div className="mt-10 flex flex-col gap-y-4">
          <h2 className="text-4xl font-bold w-10/12">
            Upgrade Your Workflow with Telescope HR
          </h2>
          <p className="text-xl w-11/12">
            Telescope HR streamlines hiring, documentation, and caregiver
            training, allowing your agency to onboard staff faster and manage
            documents easily.
          </p>
          <p className="text-xl w-11/12">
            Would you like to add Telescope HR to your toolkit?
          </p>

          <div className="w-11/12 mt-10 min-h-20  flex flex-col gap-y-6">
            <div
              className="w-full bg-white p-1 rounded-2xl cursor-pointer"
              onClick={() => setselectedOption("Add")}
            >
              <div
                className="flex gap-x-4 p-2 rounded-2xl py-4"
                style={{
                  border:
                    selectedOption === "Add" ? "1px solid #6781B4" : "none",
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="Add"
                  checked={selectedOption === "Add" ? true : false}
                  style={{
                    accentColor: selectedOption === "Add" ? "#257BD2" : "black",
                  }}
                />
                <div className="flex flex-col gap-y-1">
                  <h3
                    className="font-bold"
                    style={{
                      color: selectedOption === "Add" ? "#257BD2" : "black",
                    }}
                  >
                    Yes, Add Telescope HR to my setup
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="w-full bg-white p-1 rounded-2xl cursor-pointer"
              onClick={() => setselectedOption("skip")}
            >
              <div
                className="flex gap-x-4 p-2 rounded-2xl py-4"
                style={{
                  border:
                    selectedOption === "skip" ? "1px solid #6781B4" : "none",
                }}
              >
                <input
                  type="radio"
                  name="plan"
                  value="skip"
                  checked={selectedOption === "skip" ? true : false}
                  style={{
                    accentColor:
                      selectedOption === "skip" ? "#257BD2" : "black",
                  }}
                />
                <div className="flex flex-col gap-y-1">
                  <h3
                    className="font-bold"
                    style={{
                      color: selectedOption === "skip" ? "#257BD2" : "black",
                    }}
                  >
                    No, I’ll skip for now
                  </h3>
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
