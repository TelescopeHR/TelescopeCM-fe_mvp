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
import { ICreateEmployee } from "@/models/employee-model";
import { initialData } from "./intialdata";
import { toast } from "react-toastify";
import { createEmployee } from "@/services/employee-service/employee-service";
import LoadingSkeleton from "@/components/skeleton/skeleton";
import { SuccesssPrompt } from "./success-dialog";
import { AddScheduleDialog } from "@/portal/schedules/add-scheudle-dialog/add-schedule";

// import Check from "@mui/icons-material/Check";

const steps = ["Identification", "Address", "Phone Numbers", "Background"];
type StepKey = (typeof steps)[number];

export default function OnboardEmployee() {
  const [activeStep, setActiveStep] = useState(0);
  const [payload, setpayload] = useState<ICreateEmployee>(initialData);
  const [isLoadn, setisLoadn] = useState(false);
  const [openDialog, setopenDialog] = useState({
    open: false,
    name: "",
  });

  const [validSteps, setValidSteps] = useState<Record<StepKey, boolean>>({
    Identification: false,
    Address: false,
    "Phone Numbers": false,
    Background: false,
  });

  const checkn = (step: StepKey) => {
    return validSteps[step] === true;
  };

  const handleCreateEmployee = (data: any) => {
    setisLoadn(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { previewPhoto, gender, ...apiPayload } = data;
    return createEmployee({
      ...apiPayload,
      gender: parseInt(gender),
    }).subscribe({
      next: (response) => {
        if (response) {
          // toast.success("Employee account created successfully!");
          setpayload(initialData);
          setValidSteps({
            Identification: false,
            Address: false,
            "Phone Numbers": false,
            Background: false,
          });
          setActiveStep(0);
          setopenDialog({ open: true, name: "prompt" });
        }
      },
      error: (err) => {
        toast.error(err.response.data.error);
        setisLoadn(false);
      },
      complete: () => {
        setisLoadn(false);
      },
    });
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
                    className={
                      activeStep === index
                        ? "bg-cyan-500 text-white" // active state styles
                        : "bg-gray-300 text-black" // inactive state styles
                    }
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
            {activeStep == 0 && (
              <Identification
                data={payload}
                setValidSteps={setValidSteps}
                setData={setpayload}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep == 1 && (
              <Address
                data={payload}
                setValidSteps={setValidSteps}
                setData={setpayload}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep == 2 && (
              <PhoneNumber
                data={payload}
                setValidSteps={setValidSteps}
                setData={setpayload}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep == 3 && (
              <Background
                data={payload}
                setValidSteps={setValidSteps}
                setData={setpayload}
                handleCreateEmployee={handleCreateEmployee}
              />
            )}
          </div>
        </div>
      </div>
      {isLoadn && <LoadingSkeleton />}
      {openDialog.open && openDialog.name === "prompt" && (
        <SuccesssPrompt
          open={openDialog.open}
          setopen={() => setopenDialog({ open: false, name: "" })}
          handleYes={() => {
            console.log("here");
            setopenDialog({ open: true, name: "schedule" });
          }}
        />
      )}

      {openDialog.open && openDialog.name === "schedule" && (
        <AddScheduleDialog
          open={openDialog.open}
          setOpen={() => setopenDialog({ name: "", open: false })}
        />
      )}
    </>
  );
}
