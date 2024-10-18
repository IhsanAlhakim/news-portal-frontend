import DashboardCard from "@/components/DashboardCard";
import NewsTable from "@/components/NewsTable";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[150px_calc(100%-150px)]">
      <div className="flex gap-10">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <div className="bg-white min-h-[300px] rounded-xl p-5">
        <h3 className="text-xl font-bold">Recent News</h3>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[200px] overflow-auto ">
          <NewsTable />
        </div>
      </div>
    </div>
  );
}
