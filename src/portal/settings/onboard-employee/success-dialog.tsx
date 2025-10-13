import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PropT = {
  open: boolean;
  setopen: () => void;
  handleYes: () => void;
};
export function SuccesssPrompt({ open, setopen, handleYes }: PropT) {
  return (
    <AlertDialog open={open} onOpenChange={() => ""}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Success!</AlertDialogTitle>
          <AlertDialogDescription>
            Account created successfully!, Do you want to add schedules to this
            employee's account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={setopen}>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleYes}>
            Yes, Add Schedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
