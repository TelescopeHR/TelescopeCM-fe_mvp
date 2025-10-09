import DateInput from "@/components/date-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICreateEmployee } from "@/models/employee-model";
import { formatToYMD } from "@/utils/utils";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type PropT = {
  data: ICreateEmployee;
  setData: (x: any) => void;
  setValidSteps: (x: any) => void;
  handleCreateEmployee: (x: any) => void;
};

export default function Background({
  data,
  setData,
  setValidSteps,
  handleCreateEmployee,
}: PropT) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateEmployee>({
    defaultValues: {
      hire_date: data?.hire_date || "",
      application_date: data?.application_date || "",
      signed_job_description_date: data?.signed_job_description_date || "",
      orientation_date: data?.orientation_date || "",
      signed_policy_procedure_date: data?.signed_policy_procedure_date || "",
      evaluated_assigned_date: data?.evaluated_assigned_date || "",
      last_evaluation_date: data?.last_evaluation_date || "",
      termination_date: data?.termination_date || "",
      number_of_references: data?.number_of_references || 1,
    },
  });

  const handleOnSubmit = (formData: ICreateEmployee) => {
    // console.log("data", { ...data, ...formData });
    setData((prev: any) => {
      return { ...prev, ...formData };
    });
    setValidSteps((prev: any) => {
      return { ...prev, Background: isValid };
    });
    handleCreateEmployee({ ...data, ...formData });
  };

  useEffect(() => {
    setValidSteps((prev: any) => {
      return { ...prev, Background: isValid };
    });
  }, [isValid]);

  return (
    <div className="mt-4">
      <form
        className="w-w-full lg:w-8/12 py-4 flex flex-col gap-y-8"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="hire_date"
              control={control}
              rules={{ required: "Hire date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Hire date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.hire_date && (
              <p className="text-xs text-red-400">
                {`${errors.hire_date.message}`}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="application_date"
              control={control}
              rules={{ required: "Application date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Application date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.application_date && (
              <p className="text-xs text-red-400">
                {`${errors.application_date.message}`}
              </p>
            )}
          </div>
        </div>
        {/*  */}
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="signed_job_description_date"
              control={control}
              rules={{ required: "Signed job description date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Signed job description date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.signed_job_description_date && (
              <p className="text-xs text-red-400">
                {`${errors.signed_job_description_date.message}`}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="orientation_date"
              control={control}
              rules={{ required: "Orientation date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Orientation date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.orientation_date && (
              <p className="text-xs text-red-400">
                {`${errors.orientation_date.message}`}
              </p>
            )}
          </div>
        </div>

        {/*  */}

        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="signed_policy_procedure_date"
              control={control}
              rules={{ required: "Signed policy procedure date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Signed policy procedure date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.signed_policy_procedure_date && (
              <p className="text-xs text-red-400">
                {`${errors.signed_policy_procedure_date.message}`}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="evaluated_assigned_date"
              control={control}
              rules={{ required: "Evaluated assigned tasks date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Evaluated assigned tasks date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.evaluated_assigned_date && (
              <p className="text-xs text-red-400">
                {`${errors.evaluated_assigned_date.message}`}
              </p>
            )}
          </div>
        </div>
        {/*  */}
        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="last_evaluation_date"
              control={control}
              rules={{ required: "Last evaluation date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Last evaluation date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.last_evaluation_date && (
              <p className="text-xs text-red-400">
                {`${errors.last_evaluation_date.message}`}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <Controller
              name="termination_date"
              control={control}
              rules={{ required: "Termination date is required" }}
              render={({ field }) => (
                <DateInput
                  title="Termination date"
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(val) =>
                    field.onChange(formatToYMD(val?.toISOString()))
                  }
                />
              )}
            />
            {errors.termination_date && (
              <p className="text-xs text-red-400">
                {`${errors.termination_date.message}`}
              </p>
            )}
          </div>
        </div>
        {/*  */}

        <div className="items center flex flex-col lg:flex-row gap-x-10 w-full">
          <div className="flex flex-col gap-y-3 w-full">
            <Label htmlFor="Number of references">Number of references</Label>
            <Input
              {...register("number_of_references", {
                required: "Number of reference is required",
              })}
              type="number"
              placeholder="Number of references"
              className=" border h-10"
            />
            {errors.number_of_references && (
              <p className="text-xs text-red-400">
                {errors.number_of_references.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="h-8 w-[100px]">
          Proceed
        </Button>
      </form>
    </div>
  );
}
