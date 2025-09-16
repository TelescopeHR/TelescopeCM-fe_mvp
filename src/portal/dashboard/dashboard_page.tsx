// import LoadingSkeleton from "@/components/skeleton/skeleton";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { ChartLineLabel } from "@/components/line-chart";
import PageHeader from "../../components/ui/page-header/page-header";
import { ChartBarLabel } from "@/components/bar-chart";
import { ChartPieDonutText } from "@/components/donut-chart";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="mt-10 mb-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="min-h-40 border rounded p-4">
          <h2 className=" font-semibold">Clients</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
            100
          </h1>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10 mt-4 text-sm">
            <div>
              <span>Active: 82</span>
            </div>
            <div>
              <span>Inactive: 18</span>
            </div>
          </div>
        </div>
        <div className="min-h-40 border rounded p-4 cursor-pointer">
          <h2 className=" font-semibold">Employees</h2>
          <h1 className=" mt-5 font-bold text-4xl text-center text-slate-800 dark:text-slate-400">
            60
          </h1>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10 mt-4 text-sm">
            <div>
              <span>Active: 40</span>
            </div>
            <div>
              <span>Inactive: 20</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col relative gap-y-96">
        <div className="w-full flex flex-col lg:flex-row gap-2 mt-10 gap-y-96">
          <div className="h-40 w-full lg:w-1/2">
            <ChartBarLabel />
          </div>

          <div className="h-40 w-full lg:w-1/2">
            <ChartPieDonutText />
          </div>
        </div>

        <div className="w-full mb-20">{/* <ChartLineLabel /> */}</div>
        {/* <ChartAreaInteractive />  */}
      </div>
      {/* <LoadingSkeleton /> */}
    </div>
  );
}
