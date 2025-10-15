"use client";
import { Dialog } from "@mui/material";
import Spinner from "../Spinner";

interface LoadingSkeletonProps {
  name?: string;
}

export default function LoadingSkeleton({ name }: LoadingSkeletonProps) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => ""}
        fullScreen={true} //Here you need to add the function
        aria-labelledby="form-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "12px",
            backdropFilter: "blur(2px)",
          },
        }}
      >
        <div className="full h-screen flex justify-center items-center bg-opacity-30 flex-col">
          <Spinner />
          <div className="mt-2 text-white">{name ?? "Processing"}...</div>
        </div>
      </Dialog>
    </div>
  );
}
