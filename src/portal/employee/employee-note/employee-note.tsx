import PageHeader from "@/components/ui/page-header/page-header";
import { useCareGiverStore } from "@/store/caregiverStore";

export default function EmployeeNote() {
  const { careGiver } = useCareGiverStore();
  return (
    <div>
      <div className="flex items-center mb-2">
        <h2 className="text-sm text-cyan-600 font-bold mr-2">EMPLOYEE</h2> /
        <span className="font-bold text-sm ml-2">
          {" "}
          {careGiver.firstName + " " + careGiver.lastName}
        </span>
      </div>
      <PageHeader title="Employee Notes" hasBack />
    </div>
  );
}
