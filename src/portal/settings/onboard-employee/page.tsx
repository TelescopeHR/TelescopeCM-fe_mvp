import { useState } from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import { Check } from "lucide-react";
import PageHeader from "@/components/ui/page-header/page-header";
import Identification from "./identification";
import Address from "./address";
import PhoneNumber from "./phoneNumber";
import Background from "./background";

// import Check from "@mui/icons-material/Check";

const steps = ["Identification", "Address", "Phone Numbers", "Background"];
type StepKey = (typeof steps)[number];

export default function OnboardEmployee() {
  const [activeStep, setActiveStep] = useState(0);

  const [
    validSteps,
    // setValidSteps
  ] = useState<Record<StepKey, boolean>>({
    Identification: false,
    Address: false,
    "Phone Numbers": false,
    Background: false,
  });

  const checkn = (step: StepKey) => {
    return validSteps[step] === true;
  };

  return (
    <>
      <div className="px-4">
        <div className="mb-6">
          <PageHeader title="Onboard Employee" hasBack />
        </div>
        <Stepper sx={{ width: "100%" }}>
          {steps.map((step, index) => (
            <div key={step}>
              <Step
                indicator={
                  <StepIndicator
                    variant={activeStep <= index ? "soft" : "solid"}
                    color={activeStep < index ? "neutral" : "primary"}
                  >
                    {/* {activeStep <= index ? index + 1 : <Check />} */}
                    {checkn(step) && <Check />}
                  </StepIndicator>
                }
                sx={[
                  activeStep > index &&
                    index !== 2 && {
                      "&::after": { bgcolor: "primary.solidBg" },
                    },
                ]}
              >
                <StepButton onClick={() => setActiveStep(index)}>
                  <div className="dark:text-white hidden lg:block px-10">
                    {step}
                  </div>
                </StepButton>
              </Step>
            </div>
          ))}
        </Stepper>

        {/* ------ */}
        <div className=" border mt-6 xl:mt-10 p-4 rounded mb-20">
          <h2 className="text-xl xl:text-2xl font-semibold underline mb-10">
            {" "}
            {steps[activeStep]}
          </h2>

          <div>
            {activeStep == 0 && <Identification />}
            {activeStep == 1 && <Address />}
            {activeStep == 2 && <PhoneNumber />}
            {activeStep == 3 && <Background />}
          </div>
        </div>
      </div>
    </>
  );
}
