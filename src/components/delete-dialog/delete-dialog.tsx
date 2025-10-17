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
  description: string;
  handleProceed: () => void;
};
export function DeleteDialog({
  open,
  setopen,
  description,
  handleProceed,
}: PropT) {
  return (
    <AlertDialog open={open} onOpenChange={setopen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProceed}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
